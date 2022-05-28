import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CityService {
  public currentCitySubject: BehaviorSubject<string>;
  public currentCity: Observable<string>;
  constructor(private http: HttpClient, private router: Router) {
      this.currentCitySubject = new BehaviorSubject<string>(localStorage.getItem('city'));
      this.currentCity = this.currentCitySubject.asObservable();
  }
  public setCurrentCityValue(city:string){
    this.currentCitySubject.next(city);
  }
  public get currentCityValue(): string {
      return this.currentCitySubject.value;
  }
}
