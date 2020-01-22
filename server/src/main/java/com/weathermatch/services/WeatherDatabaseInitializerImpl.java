package com.weathermatch.services;

import com.weathermatch.dao.CurrentBatchRepository;
import com.weathermatch.models.City;
import com.weathermatch.dao.CityRepository;
import com.weathermatch.models.CurrentBatch;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.io.*;
import java.util.ArrayList;
import java.util.List;

@Service
public class WeatherDatabaseInitializerImpl {

    // (NAME, COUNTRY) pair is not always unique in database, check Clark County in city-list.json

    private static final Logger logger = LoggerFactory.getLogger(WeatherDatabaseInitializerImpl.class);
    @Autowired
    CityRepository cityRepository;
    @Autowired
    CurrentBatchRepository currentBatchRepository;
    @Value("${json.cities.path}")
    private String jsonCitiesPath;
    @Value("${rows.hard.limit}")
    private int rowsHardLimit;

    @PostConstruct
    public void initialize() {
        // NOTE: This class should only be used once, when initially populating the database.
        if (cityRepository.count() == rowsHardLimit) {
            logger.info("Initialize() - skipping as database already initialized");
            return;
        }

        logger.info("Initialize() - started");
        int rowsAdded = 0;
        JSONParser parser = new JSONParser();
        try {
            List<City> initialCityList = new ArrayList<>();
            JSONArray cityArray = (JSONArray) parser.parse(new FileReader(jsonCitiesPath));
            for (Object currentCity : cityArray) {
                JSONObject city = (JSONObject) currentCity;
                String country = (String) city.get("country");
                String name = (String) city.get("name");

                if (!country.isEmpty() && !name.isEmpty() && rowsAdded < rowsHardLimit) // filter records like Earth (id 6295630) from the JSON list
                {
                    Long id = (Long) city.get("id");
                    JSONObject coord = (JSONObject) city.get("coord");
                    Double lon;
                    Double lat;
                    if (coord.get("lon") instanceof Double) {
                        lon = (Double) coord.get("lon");
                    } else {
                        Long aux = (Long) coord.get("lon");
                        lon = Double.valueOf(aux);
                    }

                    if (coord.get("lat") instanceof Double) {
                        lat = (Double) coord.get("lat");
                    } else {
                        Long aux = (Long) coord.get("lat");
                        lat = Double.valueOf(aux);
                    }

                    rowsAdded++;
                    initialCityList.add(new City(id, name, country, lon, lat, null, null, null, null, null, true));
                }
            }
            currentBatchRepository.save(new CurrentBatch(0));
            cityRepository.saveAll(initialCityList);
        } catch (ParseException err) {
            logger.error(String.format("Parse exception encountered for file: %s", jsonCitiesPath));
        } catch (FileNotFoundException err) {
            logger.error(String.format("File could not be found: ", jsonCitiesPath));
        } catch (IOException err) {
            logger.error(String.format("I/O exception for file: ", jsonCitiesPath));
        }
        logger.info("Initialize() - finished");
    }
}