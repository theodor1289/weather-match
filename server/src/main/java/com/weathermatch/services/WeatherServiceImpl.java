package com.weathermatch.services;

import com.weathermatch.dtos.OpenWeatherMapDto;
import com.weathermatch.models.City;
import com.weathermatch.dao.CityRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.DependsOn;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import javax.annotation.PostConstruct;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

@Service
public class WeatherServiceImpl implements WeatherService {
    @Value("${owm.api.key}")
    private String owmApiKey;

    @Autowired
    CityRepository cityRepository;

    private static final Logger logger = LoggerFactory.getLogger(WeatherServiceImpl.class);
    private final RestTemplate restTemplate = new RestTemplate();

    private Integer currentBatch = 0;

    @Scheduled(cron = "0 * * * * ?")
    public void fetchNextWeatherBatch() {
        logger.info("fetchNextWeatherBatch() - started");

        // API limit is 60 (enforced on a 'key' basis), so 50 just to be safe
        Integer batchSize = 50;
        for(int i = currentBatch; i<Math.min(idList.size(), currentBatch + batchSize); i++) {
            // TODO: make sure any http response other than 200 is dealt with
            // recommendation is to make calls to api.openweathermap.org no more than one time every 10 minutes for one location
            String resourceUrl = "http://api.openweathermap.org/data/2.5/weather?id=" + idList.get(i) + "&APPID=" + owmApiKey;
            OpenWeatherMapDto openWeatherMapDto = restTemplate.getForObject(resourceUrl, OpenWeatherMapDto.class);

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
                    new Timestamp(System.currentTimeMillis())
            );

            // update the data
            cityRepository.save(cityModel);
        }

        currentBatch += batchSize;

        if(currentBatch >= idList.size())
        {
            currentBatch = 0;
            logger.info("fetchNextWeatherBatch() - end of list reached, currentBatch reset");
        }

        logger.info("fetchNextWeatherBatch() - finished, currentBatch is now {}", currentBatch);
    }

    // we need a list of ids in advance for fetchNextWeatherBatch()
    private List<Long> idList;
    @PostConstruct
    @DependsOn("H2DatabaseManagerImpl") // TODO: remove this line after database implemented
    public void buildIdList() {
        idList = new ArrayList<>();
        cityRepository.findAll().forEach(city -> idList.add(city.getId()));
    }
}