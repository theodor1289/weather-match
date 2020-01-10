package com.weathermatch.dao;

import com.weathermatch.models.City;
import com.weathermatch.models.Weather;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CityRepository extends JpaRepository<City, String> {
    City findById(Long id);
    List<City> findAllByWeatherIsNotNull();
    List<City> findAllByWeather(Weather weather);
}


// let filteredCities = this.state.cities;

// // TODO: This is to be done in the backend, much faster
// filteredCities = filteredCities
//   .sort((a, b) => {
//     if (
//       a[this.state.orderBy].toLowerCase() <
//       b[this.state.orderBy].toLowerCase()
//     ) {
//       return this.state.orderDir === 'asc' ? -1 : 1;
//     } else {
//       return this.state.orderDir === 'asc' ? 1 : -1;
//     }
//   })
//   .filter(eachItem => {
//     return (
//       eachItem['name']
//         .toLowerCase()
//         .startsWith(this.state.queryText.toLowerCase()) &&
//       (this.state.weatherFilter.length === 0 || this.state.weatherFilter.includes(eachItem['main'])) &&
//       eachItem['humidity'] >= this.state.humidityFilter[0] &&
//       eachItem['humidity'] <= this.state.humidityFilter[1] &&
//       eachItem['speed'] >= this.state.windFilter[0] &&
//       eachItem['speed'] <= this.state.windFilter[1] &&
//       eachItem['temp'] >= this.state.tempFilter[0] + 273.15 &&
//       eachItem['temp'] <= this.state.tempFilter[1] + 273.15
//     );
//   });
