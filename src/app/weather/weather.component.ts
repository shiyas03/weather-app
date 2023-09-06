import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ServiceService } from '../services/service.service';
import { Subscription } from 'rxjs';
import { WeatherData } from '../shared/weather.interface';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit, OnDestroy {

  @ViewChild('form') form!: NgForm

  data!: WeatherData
  location!: string
  inputValue: string = ''
  city!: string
  date!:Date
  subscription1!: Subscription
  subscription2!: Subscription
  cities: string[] = ['New York', 'Paris', 'London', 'California']

  constructor(private services: ServiceService) { }

  ngOnInit(): void {
    this.subscription2 = this.services.getLocation().subscribe(
      (res) => {
        this.city = res.city
        this.fetchWeather(res.city)
      }
    )
  }

  fetchWeather(city: string) {
    this.subscription2 = this.services.fetchWeatherData(city).subscribe(
      (res) => {
        if (res) {
          this.data = res
        }
        console.log(res);
      })
  }

  selectedCity(city: string) {
    this.fetchWeather(city)
  }

  onSearch() {
    const city = this.inputValue
    this.fetchWeather(city)
  }

  ngOnDestroy(): void {
    if (this.subscription1) this.subscription1.unsubscribe()
    if (this.subscription2) this.subscription2.unsubscribe()
  }
}
