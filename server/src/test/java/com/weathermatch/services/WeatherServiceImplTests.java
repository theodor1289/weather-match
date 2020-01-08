//package com.weathermatch.services;
//
//import com.weathermatch.dao.CityRepository;
//import com.weathermatch.models.City;
//import com.weathermatch.models.Weather;
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
//import static org.mockito.Mockito.when;
// // TODO: find a way to test this
//@RunWith(SpringJUnit4ClassRunner.class)
//@SpringBootTest
//public class WeatherServiceImplTests {
//    @Autowired
//    private WeatherServiceImpl weatherService;
//
//    @MockBean
//    private CityRepository cityRepository;
//
//    private Weather emptyWeather = new Weather("", "", "", "");
//
//    @Before
//    public void Setup(){
//        List<City> cityList = new ArrayList<>();
//        // the following are the first 17 valid ids
//        cityList.add(new City(833L, "City " + 833, "Test", emptyWeather));
//        cityList.add(new City(2960L, "City " + 2960, "Test", emptyWeather));
//        cityList.add(new City(3245L, "City " + 3245, "Test", emptyWeather));
//        cityList.add(new City(3530L, "City " + 3530, "Test", emptyWeather));
//        cityList.add(new City(5174L, "City " + 5174, "Test", emptyWeather));
//        cityList.add(new City(7264L, "City " + 7264, "Test", emptyWeather));
//        cityList.add(new City(8084L, "City " + 8084, "Test", emptyWeather));
//        cityList.add(new City(9874L, "City " + 9874, "Test", emptyWeather));
//        cityList.add(new City(11263L, "City " + 11263, "Test", emptyWeather));
//        cityList.add(new City(11754L, "City " + 11754, "Test", emptyWeather));
//        cityList.add(new City(12795L, "City " + 12795, "Test", emptyWeather));
//        cityList.add(new City(14177L, "City " + 14177, "Test", emptyWeather));
//        cityList.add(new City(14256L, "City " + 14256, "Test", emptyWeather));
//        cityList.add(new City(18007L, "City " + 18007, "Test", emptyWeather));
//        cityList.add(new City(18093L, "City " + 18093, "Test", emptyWeather));
//        cityList.add(new City(18557L, "City " + 18557, "Test", emptyWeather));
//        cityList.add(new City(18918L, "City " + 18918, "Test", emptyWeather));
//        when(cityRepository.findAll()).thenReturn(cityList);
//        weatherService.buildIdList();
//    }
//
//    @Test
//    public void FetchNextWeatherBatch_2Cycles16Cities_Success(){
//        weatherService.fetchNextWeatherBatch();
//    }
//}
