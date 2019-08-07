package com.weathermatch.services;

import com.weathermatch.models.City;
import com.weathermatch.dao.CityRepository;
import com.weathermatch.models.Weather;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.io.*;
import java.util.ArrayList;

@Service
public class H2DatabaseManagerImpl {

    // (NAME, COUNTRY) pair is not always unique in database, check Clark County in city-list.json

    private static final Logger logger = LoggerFactory.getLogger(H2DatabaseManagerImpl.class);
    private final Weather emptyWeather = new Weather(null, null, null, null);
    private static final String CITY_JSON_FILE = "src/main/resources/city-list.json";

    @Autowired
    CityRepository cityRepository;

    // TODO: remove this class and 'city-list.json' after database implemented (as they're only to be used once, when initially populating the database)
    @PostConstruct
    public void initialize(){
        JSONParser parser = new JSONParser();
        try{
            JSONArray cityArray = (JSONArray) parser.parse(new FileReader(CITY_JSON_FILE));
            for (Object currentCity : cityArray)
            {
                JSONObject city = (JSONObject) currentCity;
                String country = (String) city.get("country");

                if(!country.equals("")) // filter records like Earth (id 6295630) from the JSON list
                {
                    Long id = (Long) city.get("id");
                    String name = (String) city.get("name");
                    JSONObject coord = (JSONObject) city.get("coord");
                    Double lon;
                    Double lat;
                    if(coord.get("lon") instanceof Double)
                    {
                        lon = (Double) coord.get("lon");
                    }
                    else
                    {
                        Long aux = (Long) coord.get("lon");
                        lon = Double.valueOf(aux);
                    }

                    if(coord.get("lat") instanceof Double)
                    {
                        lat = (Double) coord.get("lat");
                    }
                    else
                    {
                        Long aux = (Long) coord.get("lat");
                        lat = Double.valueOf(aux);
                    }

                    cityRepository.save(new City(id, name, country, lon, lat, emptyWeather));
                }
            }
        } catch (ParseException err){
            logger.error("Parse exception encountered for file: " + CITY_JSON_FILE);
        } catch (FileNotFoundException err){
            logger.error("File could not be found: " + CITY_JSON_FILE);
        } catch (IOException err){
            logger.error("I/O exception for file: " + CITY_JSON_FILE);
        }
        logger.info("Initialize() - finished");
    }
}