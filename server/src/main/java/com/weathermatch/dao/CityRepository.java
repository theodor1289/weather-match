package com.weathermatch.dao;

import com.weathermatch.models.City;
import com.weathermatch.models.Weather;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CityRepository extends JpaRepository<City, String> {
    City findById(Long id);
    List<City> findAllByWeather(Weather weather);
}
