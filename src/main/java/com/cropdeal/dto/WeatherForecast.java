package com.cropdeal.dto;

import java.time.LocalDate;

public class WeatherForecast {
    private LocalDate date;
    private Integer temperatureC;
    private String summary;

    // Constructors
    public WeatherForecast() {
    }

    public WeatherForecast(LocalDate date, Integer temperatureC, String summary) {
        this.date = date;
        this.temperatureC = temperatureC;
        this.summary = summary;
    }

    // Getters and Setters
    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public Integer getTemperatureC() {
        return temperatureC;
    }

    public void setTemperatureC(Integer temperatureC) {
        this.temperatureC = temperatureC;
    }

    public String getSummary() {
        return summary;
    }

    public void setSummary(String summary) {
        this.summary = summary;
    }
}
