package com.weathermatch.dtos;

import java.util.ArrayList;
import java.util.List;

public class CompleteOwmDto {
    private ArrayList< Weather > weather = new ArrayList <> ();
    private Main MainObject;
    private Wind WindObject;
    private Sys SysObject;
    private float id;
    private String name;
    public Weather getWeather() {
        return weather.get(0);
    }
    public Main getMain() {
        return MainObject;
    }
    public Wind getWind() {
        return WindObject;
    }
    public Sys getSys() {
        return SysObject;
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
        this.MainObject = mainObject;
    }
    public void setWind(Wind windObject) {
        this.WindObject = windObject;
    }
    public void setSys(Sys sysObject) {
        this.SysObject = sysObject;
    }
    public void setId(float id) {
        this.id = id;
    }
    public void setName(String name) {
        this.name = name;
    }
}