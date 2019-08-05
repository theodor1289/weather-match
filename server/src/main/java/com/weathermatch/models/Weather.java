package com.weathermatch.models;

import javax.persistence.Column;
import javax.persistence.Embeddable;

@Embeddable
public class Weather {
    @Column(name = "MAIN")
    private String main;

    @Column(name = "TEMPERATURE")
    private String temperature;

    @Column(name = "HUMIDITY")
    private String humidity;

    @Column(name = "WINDSPEED")
    private String windspeed;

    protected Weather(){

    }

    public Weather(String main, String temperature, String humidity, String windspeed) {
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

    public String getTemperature() {
        return temperature;
    }

    public void setTemperature(String temperature) {
        this.temperature = temperature;
    }

    public String getHumidity() {
        return humidity;
    }

    public void setHumidity(String humidity) {
        this.humidity = humidity;
    }

    public String getWindspeed() {
        return windspeed;
    }

    public void setWindspeed(String windspeed) {
        this.windspeed = windspeed;
    }
}
