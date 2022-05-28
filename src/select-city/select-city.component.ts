import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { CityService } from 'src/Services/city.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-select-city',
  templateUrl: './select-city.component.html',
  styleUrls: ['./select-city.component.scss'],
})
export class SelectCityComponent implements OnInit {
  city:string
  cities =["Delhi","Mumbai","Hyderabad","Chennai"];
  location: {
    lat: number,
    lang: number
  };
  constructor(private modalctrl:ModalController,
    private matIconRegistry: MatIconRegistry,
    private cityservice:CityService,
    private geolocation: Geolocation,
              private domSanitizer: DomSanitizer) { this.matIconRegistry.addSvgIcon(
                'Mumbai',
                this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/Mumbai.svg')
              );
              this.matIconRegistry.addSvgIcon(
                'Hyderabad',
                this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/Hyderabad.svg')
              );
              this.matIconRegistry.addSvgIcon(
                'Chennai',
                this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/Chennai.svg')
              );
              this.matIconRegistry.addSvgIcon(
                'Delhi',
                this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/Delhi.svg')
              );
              this.matIconRegistry.addSvgIcon(
                'location',
                this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/location.svg')
              ); }

  ngOnInit() {
      this.city=localStorage.getItem('city');
  }
  dismissModal() {
    this.modalctrl.dismiss({
      'dismissed': true
    });
  }
  selectCity(city:string){
    this.cityservice.setCurrentCityValue(city);
    localStorage.setItem('city',city);
    this.dismissModal();
  }
  detectLocation(){
    this.findUserLocation();
  }
  ionViewDidLoad() {
    this.findUserLocation();
  }

  findUserLocation(){
    let options = {
      enableHighAccuracy: true,
      timeout: 25000
    };
    this.geolocation.getCurrentPosition(options).then((position) => {
      this.location = {
        lat: position.coords.latitude,
        lang: position.coords.longitude
      };
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode(
       {
         location: {
           lat: position.coords.latitude,
           lng: position.coords.longitude
         }
       },
       (results, status) => {
         if (status === "OK") {
           if (results[0]) {
             this.selectCity(results[0].address_components[4].short_name);
           }
         }
       });
     });
    
    }
}
