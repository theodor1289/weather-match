package com.weathermatch.models;

import javax.persistence.Column;
import javax.persistence.Embeddable;

@Embeddable
public class Weather {
    @Column(name = "MAIN")
    private String main;

    @Column(name = "TEMPERATURE")
    private Double temperature;

    @Column(name = "HUMIDITY")
    private Double humidity;

    @Column(name = "WINDSPEED")
    private Double windspeed;

    protected Weather(){

    }

    public Weather(String main, Double temperature, Double humidity, Double windspeed) {
        this.main = main;
        this.temperature = temperature;
        this.humidity = humidity;
        this.windspeed = windspeed;
    }

    public String getMain() {
        return main;
    }

    public void setMain(String main) {
        this.main = main;
    }

    public Double getTemperature() {
        return temperature;
    }

    public void setTemperature(Double temperature) {
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
}
