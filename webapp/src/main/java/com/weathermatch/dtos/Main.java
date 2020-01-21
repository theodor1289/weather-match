package com.weathermatch.dtos;

public class Main {
    private Double temp;
    private Double humidity;
    public Double getTemp() { return (temp - 273.15d); } // Kelvin to Celsius
    public Double getHumidity() {
        return humidity;
    }
    public void setTemp(Double temp) {
        this.temp = temp;
    }
    public void setHumidity(Double humidity) {
        this.humidity = humidity;
    }
}
