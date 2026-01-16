import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class WeatherService {
    // Using a demo API key (NOTE: User should replace with their own for production)
    private apiKey = 'bd5e378503939ddaee76f12ad7a97608';
    private baseUrl = 'https://api.openweathermap.org/data/2.5';

    constructor(private http: HttpClient) { }

    getCurrentWeather(lat: number, lon: number): Observable<any> {
        return this.http.get(`${this.baseUrl}/weather?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric`);
    }

    getForecast(lat: number, lon: number): Observable<any> {
        return this.http.get(`${this.baseUrl}/forecast?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric`);
    }

    getPrediction(temp: number, condition: string): string {
        if (temp > 35) return 'Extreme heat: Ensure proper irrigation for crops.';
        if (temp < 10) return 'Frost warning: Protect sensitive young plants.';
        if (condition.includes('Rain')) return 'Rain expected: Good for hydration, but avoid fertilizer application today.';
        if (condition.includes('Clear')) return 'Clear skies: Ideal for harvesting and solar drying.';
        return 'Moderate weather: Standard agricultural maintenance recommended.';
    }
}
