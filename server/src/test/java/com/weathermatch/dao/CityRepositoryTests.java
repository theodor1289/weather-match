package com.weathermatch.dao;

import com.weathermatch.models.City;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.sql.Timestamp;

import static org.junit.Assert.*;

@RunWith(SpringJUnit4ClassRunner.class)
@DataJpaTest
public class CityRepositoryTests {
    @Autowired
    private CityRepository cityRepository;

//        Only makes sense to use them when third parties utilize the database:
//        cityRepository.flush();
//        cityRepository.saveAndFlush(...);
// TODO: remove those tests after implementing database OR create test database
    private City Bucharest = new City(6513L, "Bucharest", "Romania", 63.4, 35d, "Clouds", 15L, 46d, 57d, new Timestamp(System.currentTimeMillis()));
    private City Iasi = new City(8945L, "Iasi", "Romania", 26.4, 55d, "Clouds", 15L, 46d, 57d, new Timestamp(System.currentTimeMillis()));
    private City Edinburgh = new City(7524L, "Edinburgh", "Romania", 13.4, 45d, "Clouds", 15L, 46d, 57d, new Timestamp(System.currentTimeMillis()));
    private City Glasgow = new City(8542L, "Glasgow", "Romania", 51.4, 24d, "Rainy", 11L, 67d, 80d, new Timestamp(System.currentTimeMillis()));
    private City London = new City(3452L, "London", "Romania", 13.1, 71d, "Rainy", 11L, 67d, 80d, new Timestamp(System.currentTimeMillis()));
    private City SF = new City(1542L, "San Francisco", "Romania", 21.4, 15d, "Sunny", 25L, 24d, 12d, new Timestamp(System.currentTimeMillis()));

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
        assertEquals(6, cityRepository.findAll().size());
        cityRepository.save(new City(1542L, "Duplicate", "Duplicate",11.4, 85d,  "Rain", 23L, 75d, 34d, new Timestamp(System.currentTimeMillis())));
        cityRepository.save(new City(1542L, "Duplicate 2", "Duplicate 2",32.4, 78d,  "Clouds", 23L, 75d, 34d, new Timestamp(System.currentTimeMillis())));
        cityRepository.save(new City(7524L, "Duplicate 3", "Duplicate 3",2.34, 15d,  "Haze", 23L, 75d, 34d, new Timestamp(System.currentTimeMillis())));
        assertEquals(6, cityRepository.findAll().size());
    }

    @Test
    public void CityRepository_IdQueries_Success() {
        assertEquals("Bucharest", cityRepository.findById(6513L).getName());
        assertEquals("Edinburgh", cityRepository.findById(7524L).getName());
        assertNull(cityRepository.findById(1234L));
    }
}
