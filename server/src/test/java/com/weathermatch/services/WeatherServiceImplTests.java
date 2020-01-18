//package com.weathermatch.services;
//
//import com.weathermatch.dao.CityRepository;
//import com.weathermatch.dao.CurrentBatchRepository;
//import com.weathermatch.models.City;
//import com.weathermatch.models.CurrentBatch;
//import org.junit.Before;
//import org.junit.Test;
//import org.junit.runner.RunWith;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.boot.test.mock.mockito.MockBean;
//import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
//
//import java.util.ArrayList;
//import java.util.List;
//
//import static org.junit.Assert.*;
//
//import static org.mockito.Mockito.when;
//
//@RunWith(SpringJUnit4ClassRunner.class)
//@SpringBootTest
//public class WeatherServiceImplTests {
//    @Autowired
//    private WeatherServiceImpl weatherService;
//
//    @MockBean
//    private CityRepository cityRepository;
//
//    @MockBean
//    private CurrentBatchRepository currentBatchRepository;
//
//    @Before
//    public void Setup() {
//        List<City> cityList = new ArrayList<>();
//        for(int i = 0; i<100; i++)
//            cityList.add(new City((long) i, "City " + i, "Test", null, null, null, null, null, null, null));
//        when(cityRepository.findAll()).thenReturn(cityList);
//        // TODO: find a way to change this behavior so class can be tested
//        when(currentBatchRepository.findById(1)).thenReturn(new CurrentBatch(0));
//        weatherService.buildIdList();
//    }
//
//    @Test
//    public void FetchNextWeatherBatch_StoreCurrentBatch_Success() {
//        weatherService.fetchNextWeatherBatch();
//        assertEquals((long) currentBatchRepository.findById(1).getResumeIndex(), 60);
//    }
//
//    @Test
//    public void FetchNextWeatherBatch_ExecuteFullCycle_Success() {
//        weatherService.fetchNextWeatherBatch();
//        assertEquals((long) currentBatchRepository.findById(1).getResumeIndex(), 60);
//        weatherService.fetchNextWeatherBatch();
//        assertEquals((long) currentBatchRepository.findById(1).getResumeIndex(), 0);
//    }
//}
