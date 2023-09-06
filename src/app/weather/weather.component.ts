import { Component, OnInit, OnDestroy } from '@angular/core';
import { ServiceService } from '../services/service.service';
import { Subscription } from 'rxjs';
import { WeatherData } from '../shared/weather.interface';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit, OnDestroy {

  city!: string
  data!: WeatherData
  subscription!: Subscription

  constructor(private services: ServiceService) { }

  ngOnInit(): void {
    this.city = 'london'
    this.fetchWeather(this.city)
  }

  fetchWeather(city: string) {
    this.subscription = this.services.fetchWeatherData(city).subscribe(
      (data) => {
        this.data = data
      }
    )
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe()
  }
}
