package com.weathermatch.controllers;

import com.weathermatch.models.City;
import com.weathermatch.dao.CityRepository;
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

import java.sql.Timestamp;
import java.util.Objects;

import static org.hamcrest.Matchers.*;
import static org.junit.Assert.*;
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

    private String endpoint_cityId = "/api/v1/city";
    private String endpoint_cities = "/api/v1/cities";
    private String nonexistentID = "123456789";
    private String errorID = "123456";
    private City Bucharest = new City(6513L, "Bucharest", "Romania", 13.4, 15.4, "Clouds", 15L, 46d, 57d, new Timestamp(new Timestamp(new java.util.Date(0).getTime()).getTime()), true);
    private String BucharestJson = "{\"id\":6513,\"name\":\"Bucharest\",\"country\":\"Romania\",\"longitude\":13.4,\"latitude\":15.4,\"main\":\"Clouds\",\"temperature\":15,\"humidity\":46.0,\"windspeed\":57.0,\"timestamp\":\"1970-01-01T00:00:00.000+0000\",\"daytime\":true}";
    private City Iasi = new City(8945L, "Iasi", "Romania",13.463, 18.4, "Clouds", 15L, 46d, 57d, new Timestamp(new java.util.Date(0).getTime()), true);
    private String IasiJson = "{\"id\":8945,\"name\":\"Iasi\",\"country\":\"Romania\",\"longitude\":13.463,\"latitude\":18.4,\"main\":\"Clouds\",\"temperature\":15,\"humidity\":46.0,\"windspeed\":57.0,\"timestamp\":\"1970-01-01T00:00:00.000+0000\",\"daytime\":true}";
    private City Edinburgh = new City(7524L, "Edinburgh", "Romania",24.4, 63.4, "Clouds", 15L, 46d, 57d, new Timestamp(new java.util.Date(0).getTime()), true);
    private String EdinburghJson = "{\"id\":7524,\"name\":\"Edinburgh\",\"country\":\"Romania\",\"longitude\":24.4,\"latitude\":63.4,\"main\":\"Clouds\",\"temperature\":15,\"humidity\":46.0,\"windspeed\":57.0,\"timestamp\":\"1970-01-01T00:00:00.000+0000\",\"daytime\":true}";
    private City Giesdorf = new City(2920572L, "Giesdorf", "DE",11.4, 41d, null, null, null, null, new Timestamp(new java.util.Date(0).getTime()), true);

    @Before
    public void Setup() {
        when(cityRepository.findById(Bucharest.getId())).thenReturn(Bucharest);
        when(cityRepository.findById(Iasi.getId())).thenReturn(Iasi);
        when(cityRepository.findById(Edinburgh.getId())).thenReturn(Edinburgh);
        when(cityRepository.findById(Giesdorf.getId())).thenReturn(Giesdorf);
        when(cityRepository.findById(errorID)).thenThrow(new RuntimeException());

        HttpHeaders headers = new HttpHeaders();
        headers.set("Accept", MediaType.APPLICATION_JSON_VALUE);
        entity = new HttpEntity<>(headers);
    }

    @Test
    public void GetWeatherWithMockMVC_Bucharest_Success() throws Exception {
        this.mockMvc.perform(get(endpoint_cityId + "?id=" + Bucharest.getId())).andExpect(status().isOk())
                .andExpect(content().string(equalTo(BucharestJson)));
    }

    @Test
    public void GetWeatherWithMockMVC_Iasi_Success() throws Exception {
        this.mockMvc.perform(get(endpoint_cityId + "?id=" + Iasi.getId())).andExpect(status().isOk())
                .andExpect(content().string(equalTo(IasiJson)));
    }

    @Test
    public void GetWeatherWithMockMVC_Edinburgh_Success() throws Exception {
        this.mockMvc.perform(get(endpoint_cityId + "?id=" + Edinburgh.getId())).andExpect(status().isOk())
                .andExpect(content().string(equalTo(EdinburghJson)));
    }

    @Test
    public void GetWeatherWithMockMVC_NotUpdated_Success() throws Exception {
        this.mockMvc.perform(get(endpoint_cityId + "?id=" + Giesdorf.getId())).andExpect(status().isNoContent())
                .andExpect(content().string(equalTo("")));
    }

    @Test
    public void GetWeatherWithMockMVC_Nonexistent_Fail() throws Exception {
        this.mockMvc.perform(get(endpoint_cityId + "?id=" + nonexistentID)).andExpect(status().isNotFound())
                .andExpect(content().string(equalTo("")));
    }

    @Test
    public void GetWeather_Bucharest_Success() throws Exception {
        UriComponentsBuilder builder = UriComponentsBuilder.fromHttpUrl(createURLWithPort(endpoint_cityId))
                .queryParam("id", Bucharest.getId());
        ResponseEntity<String> response = restTemplate.exchange(
                builder.toUriString(),
                HttpMethod.GET,
                entity,
                String.class);
        JSONAssert.assertEquals(BucharestJson, response.getBody(), false);
    }

    @Test
    public void GetWeather_NonexistentId_Fail() {
        UriComponentsBuilder builder = UriComponentsBuilder.fromHttpUrl(createURLWithPort(endpoint_cityId))
                .queryParam("id", nonexistentID);
        ResponseEntity<String> response = restTemplate.exchange(
                builder.toUriString(),
                HttpMethod.GET,
                entity,
                String.class);
        assertTrue(Objects.requireNonNull(response.getBody()).contains("could not be found"));
        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
    }

    @Test
    public void GetWeather_NotUpdated_Success() {
        UriComponentsBuilder builder = UriComponentsBuilder.fromHttpUrl(createURLWithPort(endpoint_cityId))
                .queryParam("id", Giesdorf.getId());
        ResponseEntity<String> response = restTemplate.exchange(
                builder.toUriString(),
                HttpMethod.GET,
                entity,
                String.class);
        assertNull(response.getBody());
        assertEquals(HttpStatus.NO_CONTENT, response.getStatusCode());
    }

    // TODO: figure out why this is 404 and not 500
    @Test
    public void GetWeather_Exception_Fail() {
        UriComponentsBuilder builder = UriComponentsBuilder.fromHttpUrl(createURLWithPort(endpoint_cityId))
                .queryParam("id", errorID);
        ResponseEntity<String> response = restTemplate.exchange(
                builder.toUriString(),
                HttpMethod.GET,
                entity,
                String.class);
        assertTrue(Objects.requireNonNull(response.getBody()).contains("404"));
        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
    }

    @Test
    public void GetWeather_EmptyId_Fail() {
        UriComponentsBuilder builder = UriComponentsBuilder.fromHttpUrl(createURLWithPort(endpoint_cityId))
                .queryParam("id", "");
        ResponseEntity<String> response = restTemplate.exchange(
                builder.toUriString(),
                HttpMethod.GET,
                entity,
                String.class);
        assertTrue (Objects.requireNonNull(response.getBody()).contains("400"));
        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
    }

    private String createURLWithPort(String endpoint) {
        return "http://localhost:" + port + endpoint;
    }
}