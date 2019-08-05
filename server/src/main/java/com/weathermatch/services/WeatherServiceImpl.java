package com.weathermatch.services;

import com.weathermatch.DTOs.CompleteOwmDto;
import com.weathermatch.models.City;
import com.weathermatch.DAOs.CityRepository;
import com.weathermatch.models.Weather;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.DependsOn;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import javax.annotation.PostConstruct;
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
    private Integer batchSize = 50; // API limit is 60 (enforced on a 'key' basis), so just to be safe

    @Scheduled(cron = "0 * * * * ?")
    public void FetchNextWeatherBatch() {
        for(int i = currentBatch; i<Math.min(idList.size(), currentBatch + batchSize); i++) {
            // recommendation is to make calls to api.openweathermap.org no more than one time every 10 minutes for one location
            String resourceUrl = "http://api.openweathermap.org/data/2.5/weather?id=" + idList.get(i) + "&APPID=" + owmApiKey;
            CompleteOwmDto completeOwmDto = restTemplate.getForObject(resourceUrl, CompleteOwmDto.class);

            // populate the models
            Weather weatherModel = new Weather(completeOwmDto.getWeather().getMain(), completeOwmDto.getMain().getTemp(), completeOwmDto.getMain().getHumidity(), completeOwmDto.getWind().getSpeed());
            City cityModel = new City(completeOwmDto.getId(), completeOwmDto.getName(), completeOwmDto.getSys().getCountry(), weatherModel);

            // update the data
            cityRepository.save(cityModel);
        }

        currentBatch += batchSize;

        if(currentBatch >= idList.size())
        {
            currentBatch = 0;
            logger.info("fetchNextWeatherBatch() - end of list reached, currentBatch reset");
        }

        logger.info("fetchNextWeatherBatch() - finished, currentBatch is now " + currentBatch);
    }

    private List<Long> idList;

    // we need a list of ids in advance for fetchNextWeatherBatch()
    @PostConstruct
    @DependsOn("H2DatabaseManagerImpl") // TODO: remove this line after database implemented
    public void BuildIdList() {
        idList = new ArrayList<>();
        cityRepository.findAll().forEach(city -> idList.add(city.getId()));
    }
}