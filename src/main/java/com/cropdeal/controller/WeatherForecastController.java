package com.cropdeal.controller;

import com.cropdeal.dto.WeatherForecast;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;
import java.util.Random;
import java.util.stream.IntStream;

@RestController
@RequestMapping("/WeatherForecast")
@Tag(name = "Weather Forecast Controller", description = "APIs for weather forecast")
public class WeatherForecastController {

    private static final String[] SUMMARIES = {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
    };

    @GetMapping
    @Operation(summary = "Get weather forecast", description = "Retrieves a weather forecast")
    public List<WeatherForecast> get() {
        Random random = new Random();
        return IntStream.range(1, 6)
                .mapToObj(index -> {
                    WeatherForecast forecast = new WeatherForecast();
                    forecast.setDate(LocalDate.now().plusDays(index));
                    forecast.setTemperatureC(random.nextInt(-20, 55));
                    forecast.setSummary(SUMMARIES[random.nextInt(SUMMARIES.length)]);
                    return forecast;
                })
                .toList();
    }
}
