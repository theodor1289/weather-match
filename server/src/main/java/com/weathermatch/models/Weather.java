package com.weathermatch.models;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.util.Date;

@Embeddable
public class Weather {
    @Column(name = "MAIN")
    private String main;

    @Column(name = "TEMPERATURE")
    private Long temperature;

    @Column(name = "HUMIDITY")
    private Double humidity;

    @Column(name = "WINDSPEED")
    private Double windspeed;

    @Column(name = "TIMESTAMP")
    private Date timestamp;

    protected Weather(){

    }

    public Weather(String main, Long temperature, Double humidity, Double windspeed, Date timestamp) {
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

    public Date getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Date timestamp) {
        this.timestamp = timestamp;
    }
}
