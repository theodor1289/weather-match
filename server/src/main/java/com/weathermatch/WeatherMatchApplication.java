package com.weathermatch;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class WeatherMatchApplication {
    public static void main(String[] args) {
        SpringApplication.run(WeatherMatchApplication.class);
    }
}
