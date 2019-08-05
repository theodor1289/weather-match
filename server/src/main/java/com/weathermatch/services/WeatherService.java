package com.weathermatch.services;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

@Service
public interface WeatherService {
    @Scheduled(cron = "0 * * * * ?")
    void FetchNextWeatherBatch();
}
