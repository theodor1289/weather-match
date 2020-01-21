package com.weathermatch.services;

import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;

@Service
public interface WeatherDatabaseInitializer {
    @PostConstruct
    void initialize();
}
