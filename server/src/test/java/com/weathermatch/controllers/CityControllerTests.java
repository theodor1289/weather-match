package com.weathermatch.controllers;

import com.weathermatch.models.City;
import com.weathermatch.DAOs.CityRepository;
import com.weathermatch.models.Weather;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.skyscreamer.jsonassert.JSONAssert;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.http.*;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.web.util.UriComponentsBuilder;

import static org.hamcrest.Matchers.*;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
public class CityControllerTests {

    @LocalServerPort
    private int port;

    private TestRestTemplate restTemplate = new TestRestTemplate();

    @MockBean
    private CityRepository cityRepository;

    private HttpEntity<?> entity;

    @Autowired
    private MockMvc mockMvc;

    private String invalidID = "123456789";
    private Weather cloudyWeather = new Weather("Clouds", "15.6", "46", "57");
    private Weather emptyWeather = new Weather("", "", "", "");
    private City Bucharest = new City(6513L, "Bucharest", "Romania", cloudyWeather);
    private String BucharestJson = "{\"id\":6513,\"name\":\"Bucharest\",\"country\":\"Romania\",\"weather\":{\"main\":\"Clouds\",\"temperature\":\"15.6\",\"humidity\":\"46\",\"windspeed\":\"57\"}}";
    private City Iasi = new City(8945L, "Iasi", "Romania", cloudyWeather);
    private String IasiJson = "{\"id\":8945,\"name\":\"Iasi\",\"country\":\"Romania\",\"weather\":{\"main\":\"Clouds\",\"temperature\":\"15.6\",\"humidity\":\"46\",\"windspeed\":\"57\"}}";
    private City Edinburgh = new City(7524L, "Edinburgh", "Romania", cloudyWeather);
    private String EdinburghJson = "{\"id\":7524,\"name\":\"Edinburgh\",\"country\":\"Romania\",\"weather\":{\"main\":\"Clouds\",\"temperature\":\"15.6\",\"humidity\":\"46\",\"windspeed\":\"57\"}}";
    private City Giesdorf = new City(2920572L, "Giesdorf", "DE", emptyWeather);

    @Before
    public void Setup(){
        when(cityRepository.findById(Bucharest.getId())).thenReturn(Bucharest);
        when(cityRepository.findById(Iasi.getId())).thenReturn(Iasi);
        when(cityRepository.findById(Edinburgh.getId())).thenReturn(Edinburgh);
        when(cityRepository.findById(Giesdorf.getId())).thenReturn(Giesdorf);

        HttpHeaders headers = new HttpHeaders();
        headers.set("Accept", MediaType.APPLICATION_JSON_VALUE);
        entity = new HttpEntity<>(headers);
    }

    @Test
    public void GetWeatherWithMockMVC_Bucharest_Success() throws Exception {
        this.mockMvc.perform(get("/api/weather?id=" + Bucharest.getId())).andExpect(status().isOk())
                .andExpect(content().string(equalTo(BucharestJson)));
    }

    @Test
    public void GetWeatherWithMockMVC_Iasi_Success() throws Exception {
        this.mockMvc.perform(get("/api/weather?id=" + Iasi.getId())).andExpect(status().isOk())
                .andExpect(content().string(equalTo(IasiJson)));
    }

    @Test
    public void GetWeatherWithMockMVC_Edinburgh_Success() throws Exception {
        this.mockMvc.perform(get("/api/weather?id=" + Edinburgh.getId())).andExpect(status().isOk())
                .andExpect(content().string(equalTo(EdinburghJson)));
    }

    @Test
    public void GetWeatherWithMockMVC_NotUpdated_SuccessNoContent() throws Exception {
        this.mockMvc.perform(get("/api/weather?id=" + Giesdorf.getId())).andExpect(status().isNoContent())
                .andExpect(content().string(equalTo("")));
    }

    @Test
    public void GetWeatherWithMockMVC_Invalid_Fail() throws Exception {
        this.mockMvc.perform(get("/api/weather?id=" + invalidID)).andExpect(status().isNotFound())
                .andExpect(content().string(equalTo("")));
    }

    @Test
    public void GetWeather_Bucharest_Success() throws Exception {
        UriComponentsBuilder builder = UriComponentsBuilder.fromHttpUrl(createURLWithPort())
                .queryParam("id", Bucharest.getId());
        ResponseEntity<String> response = restTemplate.exchange(
                builder.toUriString(),
                HttpMethod.GET,
                entity,
                String.class);
        JSONAssert.assertEquals(BucharestJson, response.getBody(), false);
    }

    @Test
    public void GetWeather_Invalid_Fail() {
        UriComponentsBuilder builder = UriComponentsBuilder.fromHttpUrl(createURLWithPort())
                .queryParam("id", invalidID);
        ResponseEntity<String> response = restTemplate.exchange(
                builder.toUriString(),
                HttpMethod.GET,
                entity,
                String.class);
        assert (response.getBody() == null);
        assert (response.getStatusCode().equals(HttpStatus.NOT_FOUND));
    }

    private String createURLWithPort() {
        return "http://localhost:" + port + "/api/weather";
    }
}