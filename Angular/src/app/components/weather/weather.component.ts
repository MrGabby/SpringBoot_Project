import { Component, OnInit } from '@angular/core';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {
  weather: any;
  forecast: any[] = [];
  prediction: string = '';
  loading = true;
  error = '';
  locationName = 'Detecting location...';

  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {
    this.getLocation();
  }

  getLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          this.fetchWeatherData(lat, lon);
        },
        (err) => {
          this.error = 'Geolocation failed. Using default location (Mumbai).';
          this.fetchWeatherData(19.0760, 72.8777); // Default to Mumbai
        }
      );
    } else {
      this.error = 'Geolocation not supported. Using default location.';
      this.fetchWeatherData(19.0760, 72.8777);
    }
  }

  fetchWeatherData(lat: number, lon: number): void {
    this.loading = true;
    this.weatherService.getCurrentWeather(lat, lon).subscribe({
      next: (data) => {
        this.weather = data;
        this.locationName = data.name;
        this.prediction = this.weatherService.getPrediction(data.main.temp, data.weather[0].main);

        // Fetch 5-day forecast
        this.weatherService.getForecast(lat, lon).subscribe(fData => {
          // Filter to get one forecast per day (OpenWeather returns every 3 hours)
          this.forecast = fData.list.filter((f: any, index: number) => index % 8 === 0).slice(0, 5);
          this.loading = false;
        });
      },
      error: (err) => {
        this.error = 'Could not fetch weather data. API key might be invalid.';
        this.loading = false;
      }
    });
  }

  getWeatherIcon(iconCode: string): string {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  }
}
