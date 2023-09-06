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
  date!: Date
  imageUrl!: string
  iconUrl!: string
  images!: string[]
  subscription1!: Subscription
  subscription2!: Subscription
  cities: string[] = ['Paris','California','Tokyo']

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
          this.images = this.backgroundImage(res.weather[0].id)
          this.imageUrl = this.images[0]
          this.iconUrl = this.images[1]
          const timezoneOffsetSeconds = res.timezone;
          const currentUTCTimestampMilliseconds = Date.now();
          const localTimestampMilliseconds = currentUTCTimestampMilliseconds + (timezoneOffsetSeconds);
          this.date = new Date(localTimestampMilliseconds);
          this.addCities(res.name)
        }
      }, (error) => {
        console.error('Error fetching weather data:', error);
      })
  }

  addCities(city: string) {
    if(!this.cities.includes(city)){
      if(this.cities.length == 4){
        this.cities.pop()
      }
      this.cities.unshift(city)
    }
  }

  selectedCity(city: string) {
    this.fetchWeather(city)
  }

  onSearch() {
    const city = this.inputValue
    this.fetchWeather(city)
    this.form.reset()
  }

  backgroundImage(code: number): string[] {
    switch (true) {
      case code < 300:
        return ['assets/thunder.jpg', 'assets/thunder.png'];
      case code < 500:
        return ['assets/drizzle.jpg', 'assets/drizzle.png'];
      case code < 600:
        return ['assets/rain.jpg', 'assets/rain.png'];
      case code < 700:
        return ['assets/snowfall.jpg', 'assets/snow.png'];
      case code < 800:
        return ['assets/mist.jpg', 'assets/fog.png'];
      default:
        return ['assets/cloud.jpg', 'assets/cloud.png'];
    }
  }

  ngOnDestroy(): void {
    if (this.subscription1) this.subscription1.unsubscribe()
    if (this.subscription2) this.subscription2.unsubscribe()
  }
}
