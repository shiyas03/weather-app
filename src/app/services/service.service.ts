import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LocationInfo, WeatherData } from '../shared/weather.interface';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http: HttpClient) { }

  fetchWeatherData(city: string): Observable<WeatherData> {
    return this.http.get<WeatherData>(`${environment.weatherApiUrl}/weather?q=${city}&appid=${environment.apiId}`)
  }

  getLocation(): Observable<LocationInfo> {
    return this.http.get<LocationInfo>('http://ip-api.com/json/')
  }

}
