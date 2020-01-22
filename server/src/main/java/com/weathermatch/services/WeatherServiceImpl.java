package com.weathermatch.services;

import com.weathermatch.dao.CurrentBatchRepository;
import com.weathermatch.dtos.OpenWeatherMapDto;
import com.weathermatch.models.City;
import com.weathermatch.dao.CityRepository;
import com.weathermatch.models.CurrentBatch;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

import javax.annotation.PostConstruct;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.TimeZone;

@Service
public class WeatherServiceImpl implements WeatherService {
    @Value("${owm.api.key}")
    private String owmApiKey;

    @Autowired
    CityRepository cityRepository;

    @Autowired
    CurrentBatchRepository currentBatchRepository;

    private static final Logger logger = LoggerFactory.getLogger(WeatherServiceImpl.class);
    private final RestTemplate restTemplate = new RestTemplate();

    @Scheduled(cron = "0 * * * * ?")
    public void fetchNextWeatherBatch() {
        // API limit is 60 (enforced on a 'key' basis)
        int batchSize = 60;
        List<City> updateCityList = new ArrayList<>();
        CurrentBatch currentBatch = currentBatchRepository.findById(1);
        int currentBatchStartIndex = currentBatch.getResumeIndex();
        TimeZone.setDefault(TimeZone.getTimeZone("GMT"));

        logger.info(String.format("fetchNextWeatherBatch() - started with currentBatch %d", currentBatchStartIndex));
        for (int idIndex = currentBatchStartIndex; idIndex < Math.min(idList.size(), currentBatchStartIndex + batchSize); idIndex++) {
            // TODO: make sure any http response other than 200 is dealt with
            // recommendation is to make calls to api.openweathermap.org no more than one time every 10 minutes for one location
            String resourceUrl = "http://api.openweathermap.org/data/2.5/weather?id=" + idList.get(idIndex) + "&APPID=" + owmApiKey;
            OpenWeatherMapDto openWeatherMapDto = null;
            try {
                openWeatherMapDto = restTemplate.getForObject(resourceUrl, OpenWeatherMapDto.class);
            } catch (RestClientException e) {
                logger.error(e.getMessage());
            }

            // populate the models
            assert openWeatherMapDto != null;
            City cityModel = new City(
                    openWeatherMapDto.getId(),
                    openWeatherMapDto.getName(),
                    openWeatherMapDto.getSys().getCountry(),
                    openWeatherMapDto.getCoord().getLon(),
                    openWeatherMapDto.getCoord().getLat(),
                    openWeatherMapDto.getWeather().getMain(),
                    Math.round(openWeatherMapDto.getMain().getTemp()),
                    openWeatherMapDto.getMain().getHumidity(),
                    openWeatherMapDto.getWind().getSpeed(),
                    new Timestamp(System.currentTimeMillis()),
                    openWeatherMapDto.getWeather().getIcon().contains("d")
            );

            // update the data
            updateCityList.add(cityModel);
        }
        cityRepository.saveAll(updateCityList);

        currentBatchStartIndex += batchSize;

        if (currentBatchStartIndex >= idList.size()) {
            currentBatchStartIndex = 0;
            logger.info("fetchNextWeatherBatch() - end of list reached, currentBatch reset");
        }

        currentBatch.setResumeIndex(currentBatchStartIndex);
        currentBatchRepository.save(currentBatch);
        logger.info("fetchNextWeatherBatch() - finished, currentBatch is now {}", currentBatchStartIndex);
    }

    // we need a list of ids in advance for fetchNextWeatherBatch()
    private List<Long> idList = new ArrayList<>();

    @PostConstruct
    public void buildIdList() {
        cityRepository.findAll().forEach(city -> idList.add(city.getId()));
        logger.info(String.format("Loaded %d ids in variable 'idList'", idList.size()));
    }
}