package com.weathermatch.dtos;

public class Weather {
    private String main;

    public String getIcon() {
        return icon;
    }

    public void setIcon(String icon) {
        this.icon = icon;
    }

    private String icon;

    public String getMain() {
        return main;
    }

    public void setMain(String main) {
        this.main = main;
    }
}
