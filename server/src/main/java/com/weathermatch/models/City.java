package com.weathermatch.models;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Table(name = "CITY")
public class City {
    @Id
    @Column(name = "ID", nullable = false, updatable = false)
    private Long id;

    @Column(name = "NAME")
    private String name;

    @Column(name = "COUNTRY")
    private String country;

    @Column(name = "LONGITUDE")
    private Double longitude;

    @Column(name = "LATITUDE")
    private Double latitude;

    @Column(name = "MAIN")
    private String main;

    @Column(name = "TEMPERATURE")
    private Long temperature;

    @Column(name = "HUMIDITY")
    private Double humidity;

    @Column(name = "WINDSPEED")
    private Double windspeed;

    @Column(name = "TIMESTAMP")
    private Timestamp timestamp;

    protected City(){

    }

    public City(Long id, String name, String country, Double longitude, Double latitude, String main, Long temperature, Double humidity, Double windspeed, Timestamp timestamp) {
        this.id = id;
        this.name = name;
        this.country = country;
        this.longitude = longitude;
        this.latitude = latitude;
        this.main = main;
        this.temperature = temperature;
        this.humidity = humidity;
        this.windspeed = windspeed;
        this.timestamp = timestamp;
    }

    public String getMain() {
        return main;
    }

    public void setMain(String main) {
        this.main = main;
    }

    public Long getTemperature() {
        return temperature;
    }

    public void setTemperature(Long temperature) {
        this.temperature = temperature;
    }

    public Double getHumidity() {
        return humidity;
    }

    public void setHumidity(Double humidity) {
        this.humidity = humidity;
    }

    public Double getWindspeed() {
        return windspeed;
    }

    public void setWindspeed(Double windspeed) {
        this.windspeed = windspeed;
    }

    public Timestamp getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Timestamp timestamp) {
        this.timestamp = timestamp;
    }

    public Double getLongitude() {
        return longitude;
    }

    public void setLongitude(Double longitude) {
        this.longitude = longitude;
    }

    public Double getLatitude() {
        return latitude;
    }

    public void setLatitude(Double latitude) {
        this.latitude = latitude;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }
}
