package com.weathermatch.DAOs;

import com.weathermatch.models.City;
import com.weathermatch.models.Weather;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

@RunWith(SpringJUnit4ClassRunner.class)
@DataJpaTest
public class CityRepositoryTests {
    @Autowired
    private CityRepository cityRepository;

//        Only makes sense to use them when third parties utilize the database:
//        cityRepository.flush();
//        cityRepository.saveAndFlush(...);

    private Weather cloudyWeather = new Weather("Clouds", "15.6", "46", "57");
    private Weather rainyWeather = new Weather("Rainy", "11.9", "67", "80");
    private Weather sunnyWeather = new Weather("Sunny", "25.2", "24", "12");
    private Weather hazyWeather = new Weather("Haze", "23.4", "75", "34");
    private City Bucharest = new City(6513L, "Bucharest", "Romania", cloudyWeather);
    private City Iasi = new City(8945L, "Iasi", "Romania", cloudyWeather);
    private City Edinburgh = new City(7524L, "Edinburgh", "Romania", cloudyWeather);
    private City Glasgow = new City(8542L, "Glasgow", "Romania", rainyWeather);
    private City London = new City(3452L, "London", "Romania", rainyWeather);
    private City SF = new City(1542L, "San Francisco", "Romania", sunnyWeather);

    @Before
    public void Setup(){
        cityRepository.save(Bucharest);
        cityRepository.save(Iasi);
        cityRepository.save(Edinburgh);
        cityRepository.save(Glasgow);
        cityRepository.save(London);
        cityRepository.save(SF);
    }

    @Test
    public void CityRepository_DuplicateIds_NotAdded() {
        assert(cityRepository.findAll().size() == 6);
        cityRepository.save(new City(1542L, "Duplicate", "Duplicate", cloudyWeather));
        cityRepository.save(new City(1542L, "Duplicate 2", "Duplicate 2", rainyWeather));
        cityRepository.save(new City(7524L, "Duplicate 3", "Duplicate 3", sunnyWeather));
        assert(cityRepository.findAll().size() == 6);
    }

    @Test
    public void CityRepository_WeatherQueries_Success() {
        assert(cityRepository.findAllByWeather(cloudyWeather).size() == 3);
        assert(cityRepository.findAllByWeather(rainyWeather).size() == 2);
        assert(cityRepository.findAllByWeather(sunnyWeather).size() == 1);
        assert(cityRepository.findAllByWeather(hazyWeather).size() == 0);
    }

    @Test
    public void CityRepository_IdQueries_Success() {
        assert(cityRepository.findById(6513L).getName().equals("Bucharest"));
        assert(cityRepository.findById(7524L).getName().equals("Edinburgh"));
        assert(cityRepository.findById(1234L) == null);
    }
}
