package com.weathermatch.dtos;

import java.util.ArrayList;
import java.util.List;

public class OpenWeatherMapDto {
    private ArrayList< Weather > weather = new ArrayList <> ();
    private Coord coord;
    private Main mainObject;
    private Wind windObject;
    private Sys sysObject;
    private float id;
    private String name;
    public Coord getCoord() {
        return coord;
    }
    public void setCoord(Coord coord) {
        this.coord = coord;
    }
    public Weather getWeather() {
        return weather.get(0);
    }
    public Main getMain() {
        return mainObject;
    }
    public Wind getWind() {
        return windObject;
    }
    public Sys getSys() {
        return sysObject;
    }
    public Long getId() {
        return (long) id;
    }
    public String getName() {
        return name;
    }
    public void setWeather(List< Weather > weather) {
        this.weather = (ArrayList<Weather>) weather;
    }
    public void setMain(Main mainObject) {
        this.mainObject = mainObject;
    }
    public void setWind(Wind windObject) {
        this.windObject = windObject;
    }
    public void setSys(Sys sysObject) {
        this.sysObject = sysObject;
    }
    public void setId(float id) {
        this.id = id;
    }
    public void setName(String name) {
        this.name = name;
    }
}