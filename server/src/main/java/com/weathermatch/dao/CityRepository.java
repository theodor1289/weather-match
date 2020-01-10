package com.weathermatch.dao;

import com.weathermatch.models.City;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;

@Repository
public interface CityRepository extends JpaRepository<City, String> {
    City findById(Long id);
//    List<City> findAllByTimestampIsNotNullAndLatitudeNear(Double latitude);
    List<City> findAllByTimestampIsNotNullAndNameStartsWithAndHumidityBetweenAndWindspeedBetweenAndTemperatureBetweenAndMainIsIn(
            String prefix,
            Double humidity,
            Double humidity2,
            Double windspeed,
            Double windspeed2,
            Long temperature,
            Long temperature2,
            Collection<String> main);
}

// // TODO: NameStartsWith + check it works regardless of upper/lower case