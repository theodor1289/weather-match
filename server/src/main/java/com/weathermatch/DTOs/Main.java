package com.weathermatch.dtos;

public class Main {
    private float temp;
    private float humidity;
    public String getTemp() { return String.valueOf(temp - 273.15F); } // Kelvin to Celsius
    public String getHumidity() {
        return String.valueOf(humidity);
    }
    public void setTemp(float temp) {
        this.temp = temp;
    }
    public void setHumidity(float humidity) {
        this.humidity = humidity;
    }
}
