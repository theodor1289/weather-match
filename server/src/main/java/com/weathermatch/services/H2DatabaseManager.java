package com.weathermatch.services;

import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;

@Service
public interface H2DatabaseManager {
    @PostConstruct
    void initialize();
}
