//package com.weathermatch.services;
//
//import com.weathermatch.DAOs.CityRepository;
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
//@RunWith(SpringJUnit4ClassRunner.class)
//@SpringBootTest
//public class WeatherServiceImplTests {
//
//
//    @Autowired
//    private WeatherServiceImpl weatherService;
//
//    @MockBean
//    private CityRepository cityRepository;
//
//    private List<Long> idList;
//
//    @Before
//    public void Setup(){
//        idList = new ArrayList<>();
//        for(int i=0; i<23; i++)
//            idList.add((long) i);
//    }
//
//    // TODO: finish tests
//    @Test
//    public void FetchNextWeatherBatch_First10_Success(){
//
//    }
//
//}
