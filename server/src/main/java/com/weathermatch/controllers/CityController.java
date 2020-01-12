package com.weathermatch.controllers;

import com.weathermatch.models.City;
import com.weathermatch.dao.CityRepository;
import io.swagger.annotations.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.servlet.ServletException;
import javax.validation.Valid;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.List;

@RestController
@RequestMapping(value = "/api/v1")
public class CityController {

    private static final Logger logger = LoggerFactory.getLogger(CityController.class);

    private final CityRepository cityRepository;

    public CityController(CityRepository cityRepository) {
        this.cityRepository = cityRepository;
    }

//    @PreAuthorize("hasRole('ROLE_ADMIN')") // - use this to restrict some APIs to certain roles

    @ApiOperation(value = "Get weather details for city with given id")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "City weather is available", response = City.class),
            @ApiResponse(code = 204, message = "City weather has not yet been updated"),
            @ApiResponse(code = 400, message = "Bad request"),
            @ApiResponse(code = 404, message = "City with given id could not be found"),
            @ApiResponse(code = 500, message = "Internal server error")})
    @GetMapping(value = "/city")
    public ResponseEntity<City> getCity(
            @ApiParam(value = "Long value representing the city id", example = "6553395")
            @RequestParam @Valid Long id) {
        try {
            logger.info("getCity({}) - started", id);

            if (id == null) {
                logger.info("getCity({}) - responded with Bad Request", id);
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
            }

            City response = cityRepository.findById(id);

            if (response == null) {
                logger.info("getCity({}) - responded with Not Found", id);
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, String.format("City with id '%d' could not be found", id));
            }

            if (response.getMain() == null) {
                logger.info("getCity({}) - responded with No Content", id);
                throw new ResponseStatusException(HttpStatus.NO_CONTENT, String.format("City with id '%d' has not yet been updated", id));
            }

            logger.info("getCity({}) - responded with OK", id);
            return ResponseEntity.ok(response);
        } catch (ResponseStatusException ex){
            throw ex;
        } catch (Exception ex) {
            logger.error(String.format("getCity({}) - responded with Internal Server Error. Exception message: %s", ex.getCause()), id);
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @ApiOperation(value = "Get weather details for all cities in the database")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "City weather is available", response = City.class),
            @ApiResponse(code = 204, message = "City weather has not yet been updated"),
            @ApiResponse(code = 500, message = "Internal server error")})
    @GetMapping(value = "/cities")
    public ResponseEntity<Page<City>> getAllCities(
            @ApiParam(value = "String value representing the city name prefix", example = "Lon")
            @RequestParam @Valid String prefix,
            @ApiParam(value = "Double value representing the lower humidity range", example = "50")
            @RequestParam @Valid Double humidity,
            @ApiParam(value = "Double value representing the lower humidity range", example = "60")
            @RequestParam @Valid Double humidity2,
            @ApiParam(value = "Double value representing the lower windspeed range", example = "0")
            @RequestParam @Valid Double windspeed,
            @ApiParam(value = "Double value representing the upper windspeed range", example = "3")
            @RequestParam @Valid Double windspeed2,
            @ApiParam(value = "Long value representing the lower temperature range", example = "20")
            @RequestParam @Valid Long temperature,
            @ApiParam(value = "Long value representing the upper temperature range", example = "30")
            @RequestParam @Valid Long temperature2,
            @ApiParam(value = "String representing the desired weather conditions", example = "Clouds,Rain")
            @RequestParam @Valid String main,
            @PageableDefault(value=16) Pageable pageable
            ) {
        try {
            logger.info("getAllCities() - started");

            Page<City> response;
            Collection<String> weatherTypes = new ArrayList<>();

            if(main.isEmpty()) {
                weatherTypes.addAll(Arrays.asList("Thunderstorm", "Drizzle", "Rain", "Snow", "Clouds", "Clear"));
            }
            else
                weatherTypes.addAll(Arrays.asList(main.split(",")));

            if(main.isEmpty() || weatherTypes.contains("Other")) {
                weatherTypes.addAll(Arrays.asList("Mist", "Smoke", "Haze", "Dust", "Fog", "Sand", "Dust", "Ash", "Squall", "Tornado"));
            }

            response = cityRepository.findAllByTimestampIsNotNullAndNameStartsWithIgnoreCaseAndHumidityBetweenAndWindspeedBetweenAndTemperatureBetweenAndMainIsIn(
                    prefix,
                    humidity,
                    humidity2,
                    windspeed,
                    windspeed2,
                    temperature,
                    temperature2,
                    weatherTypes,
                    pageable
            );

            if (response.isEmpty()) {
                logger.info("getAllCities() - responded with No Content");
                throw new ResponseStatusException(HttpStatus.NO_CONTENT, "Cities with provided specifications could not be retrieved, response was empty");
            }

            logger.info("getAllCities() - responded with OK");
            return ResponseEntity.ok(response);
        } catch (ResponseStatusException ex){
            throw ex;
        } catch (Exception ex) {
            logger.error(String.format("getAllCities() - responded with Internal Server Error. Exception message: %s", ex.getCause()));
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @ApiOperation(value = "Get weather details for city closest to given latitude and longitude")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Closest city has been retrieved", response = City.class),
            @ApiResponse(code = 204, message = "Could not find closest city. Database might be empty"),
            @ApiResponse(code = 400, message = "Bad request"),
            @ApiResponse(code = 500, message = "Internal server error")})
    @GetMapping(value = "/closestcity")
    public ResponseEntity<List<City>> getClosestCity(
            @ApiParam(value = "Double value representing the latitude", example = "65.53395")
            @RequestParam @Valid Double latitude,
            @ApiParam(value = "Double value representing the longitude", example = "32.53395")
            @RequestParam @Valid Double longitude
            ) {
        try {
            logger.info("getClosestCity() - started");

            if (latitude == null || longitude == null) {
                logger.info("getClosestCity() - responded with Bad Request");
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
            }

            List<City> response = cityRepository.findClosestCity(latitude, longitude);

            if (response == null) {
                logger.info("getClosestCity() - responded with Not Found");
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Could not find closest city. Database might be empty");
            }

            logger.info("getClosestCity() - responded with OK");
            return ResponseEntity.ok(response);
        } catch (ResponseStatusException ex){
            throw ex;
        } catch (Exception ex) {
            logger.error(String.format("getClosestCity() - responded with Internal Server Error. Exception message: %s", ex.getCause()));
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
