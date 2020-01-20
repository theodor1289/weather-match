package com.weathermatch.dao;

import com.weathermatch.models.City;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.sql.Timestamp;

import static org.junit.Assert.*;

@RunWith(SpringJUnit4ClassRunner.class)
@DataJpaTest
@AutoConfigureTestDatabase(replace= AutoConfigureTestDatabase.Replace.NONE)
public class CityRepositoryTests {
    @Autowired
    private CityRepository cityRepository;

//        Only makes sense to use them when third parties utilize the database:
//        cityRepository.flush();
//        cityRepository.saveAndFlush(...);

    private City Bucharest = new City(6513L, "Bucharest", "Romania", 63.4, 35d, "Clouds", 15L, 46d, 57d, new Timestamp(System.currentTimeMillis()), true);
    private City Iasi = new City(8945L, "Iasi", "Romania", 26.4, 55d, "Clouds", 15L, 46d, 57d, new Timestamp(System.currentTimeMillis()), true);
    private City Edinburgh = new City(7524L, "Edinburgh", "Romania", 13.4, 45d, "Clouds", 15L, 46d, 57d, new Timestamp(System.currentTimeMillis()), true);
    private City Glasgow = new City(8542L, "Glasgow", "Romania", 51.4, 24d, "Rainy", 11L, 67d, 80d, new Timestamp(System.currentTimeMillis()), true);
    private City London = new City(3452L, "London", "Romania", 13.1, 71d, "Rainy", 11L, 67d, 80d, new Timestamp(System.currentTimeMillis()), true);
    private City SF = new City(1542L, "San Francisco", "Romania", 21.4, 15d, "Sunny", 25L, 24d, 12d, new Timestamp(System.currentTimeMillis()), true);

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
    public void CityRepository_IdQueries_Success() {
        assertEquals("Bucharest", cityRepository.findById(6513L).getName());
        assertEquals("Edinburgh", cityRepository.findById(7524L).getName());
        assertNull(cityRepository.findById(1234L));
    }
}
