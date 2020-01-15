package com.weathermatch.dao;

import com.weathermatch.models.City;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;

@Repository
public interface CityRepository extends PagingAndSortingRepository<City, String> {
    City findById(Long id);

    @Query(value ="SELECT TOP 1 * FROM (SELECT * FROM CITY WHERE TIMESTAMP IS NOT NULL ORDER BY SQRT(POWER(ABS(LATITUDE - :inputLatitude), 2) + Power(ABS(LONGITUDE - :inputLongitude), 2)))", nativeQuery = true)
    City findClosestCity(
            @Param("inputLatitude") Double latitude,
            @Param("inputLongitude") Double longitude);

    Page<City> findAllByTimestampIsNotNullAndNameStartsWithIgnoreCaseAndHumidityBetweenAndWindspeedBetweenAndTemperatureBetweenAndMainIsIn(
            String prefix,
            Double humidity,
            Double humidity2,
            Double windspeed,
            Double windspeed2,
            Long temperature,
            Long temperature2,
            Collection<String> main,
            Pageable pageable
    );
}