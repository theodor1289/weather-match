package com.weathermatch.controllers;

import com.weathermatch.models.City;
import com.weathermatch.dao.CityRepository;
import io.swagger.annotations.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.validation.Valid;

@RestController
@RequestMapping(value = "/api/v1")
public class CityController {

    private static final Logger logger = LoggerFactory.getLogger(CityController.class);

    private final CityRepository cityRepository;

    public CityController(CityRepository cityRepository) {
        this.cityRepository = cityRepository;
    }

//    @PreAuthorize("hasRole('ROLE_ADMIN')") // - use this to restrict some APIs to certain roles

    @ApiOperation(value = "Get city weather details")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "City weather is available", response = City.class),
            @ApiResponse(code = 204, message = "City weather has not yet been updated"),
            @ApiResponse(code = 400, message = "Bad request"),
            @ApiResponse(code = 404, message = "City with given id could not be found"),
            @ApiResponse(code = 500, message = "Internal server error")})
    @GetMapping(value = "/city")
    public ResponseEntity<City> getCity(@ApiParam(
            value = "Long value representing the city id",
            example = "6553395") @RequestParam @Valid Long id) {
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

            if (response.getWeather().getTemperature().equals("")) {
                logger.info("getCity({}) - responded with No Content", id);
                throw new ResponseStatusException(HttpStatus.NO_CONTENT, String.format("City with id '%d' has not yet been updated", id));
            }

            logger.info("getCity({}) - responded with OK", id);
            return ResponseEntity.ok(response);
        } catch (ResponseStatusException ex){
            throw ex;
        } catch (Exception ex) {
            logger.error("getCity({}) - responded with Internal Server Error. Exception message: " + ex.getMessage(), id);
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
