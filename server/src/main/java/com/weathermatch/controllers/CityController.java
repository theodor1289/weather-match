package com.weathermatch.controllers;

import com.weathermatch.models.City;
import com.weathermatch.DAOs.CityRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value="/api")
public class CityController {

    private final CityRepository cityRepository;
    public CityController(CityRepository cityRepository) {
        this.cityRepository = cityRepository;
    }

//    @PreAuthorize("hasRole('ROLE_ADMIN')") // - use this to restrict some APIs to certain roles

    // TODO: change API & method name, implement real error handling
    @GetMapping(value = "/weather")
    public ResponseEntity<City> GetWeather(@RequestParam Long id) {
        City response = cityRepository.findById(id);
        if(response == null){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND); // return 404 if city is not in database
        }
        if(response.getWeather().getTemperature().equals("")){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT); // return 204 if city not yet updated
        }
        return ResponseEntity.ok(response);
    }
}
