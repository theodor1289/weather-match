package com.weathermatch.services;

import com.weathermatch.models.City;
import com.weathermatch.DAOs.CityRepository;
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

@Service
public class H2DatabaseManagerImpl {

    // (NAME, COUNTRY) pair is not always unique in database, check Clark County in city-list.json

    private static final Logger logger = LoggerFactory.getLogger(H2DatabaseManagerImpl.class);
    private final Weather emptyWeather = new Weather("", "", "", "");
    private final String cityJsonFile = "src/main/resources/city-list.json";

    @Autowired
    CityRepository cityRepository;

    // TODO: remove this class and 'city-list.json' after database implemented (as they're only to be used once, when initially populating the database)
    @PostConstruct
    public void Initialize(){
        JSONParser parser = new JSONParser();
        try{
            JSONArray cityArray = (JSONArray) parser.parse(new FileReader(cityJsonFile));
            for (Object currentCity : cityArray)
            {
                JSONObject city = (JSONObject) currentCity;
                Long id = (Long) city.get("id");
                String name = (String) city.get("name");
                String country = (String) city.get("country");
                JSONObject coord = (JSONObject) city.get("coord");
                try {
                    Double lon = (Double) coord.get("lon");
                } catch(ClassCastException exc) {
                    Long lon = (Long) coord.get("lon");
                }
                try {
                    Double lat = (Double) coord.get("lat");
                } catch(ClassCastException exc) {
                    Long lat = (Long) coord.get("lat");
                }
                // filter records like Earth (id 6295630) from the JSON list
                if(!country.equals(""))
                {
                    cityRepository.save(new City(id, name, country, emptyWeather));
                }
            }
        } catch (ParseException err){
            logger.error("Parse exception encountered for file: " + cityJsonFile);
        } catch (FileNotFoundException err){
            logger.error("File could not be found: " + cityJsonFile);
        } catch (IOException err){
            logger.error("I/O exception for file: " + cityJsonFile);
        }
        logger.info("Initialize() - finished");
    }
}