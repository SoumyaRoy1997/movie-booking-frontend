import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { TheatreService } from 'src/Services/theatre.service';
import { Screens } from 'src/entity/screens';
import { Theatres } from 'src/entity/theatres';
import { ModalController } from '@ionic/angular';
import {} from 'googlemaps';
import { BookTicketsComponent } from 'src/book-tickets/book-tickets.component';
import { Shows } from 'src/entity/shows';
import { showTimmings } from 'src/entity/showTimmings';
import { SelectCityComponent } from 'src/select-city/select-city.component';
import { Subscription } from 'rxjs';
import { CityService } from 'src/Services/city.service';

@Component({
  selector: 'app-theatres',
  templateUrl: './theatres.component.html',
  styleUrls: ['./theatres.component.scss'],
})
export class TheatresComponent implements OnInit,OnDestroy {

  @Input() movieId:string;
  screens: Screens[];
  theatres: Theatres[];
  map: google.maps.Map;
  latitude:number;
  longitude:number;
  flag=false;
  modal=null;
  city:string;
  mapText:string = "View Map";
  Citymodal=null;
  filterTheatres:Theatres[];
  currenCity:Subscription;
  filterflag=false;
  constructor(private service:TheatreService,
              private modalctrl: ModalController,
              private cityservice:CityService) { }

  ngOnInit() {
    this.service.getTheatres(this.movieId).subscribe((values)=>
    {this.theatres=values;
      this.filterTheatres=values;
      this.currenCity=this.cityservice.currentCitySubject.subscribe(value=>{
        this.city=value;
        if(value!==null){
        this.filterTheatres=this.theatres.filter(theatre=> theatre.location.address.city==value);
        if(this.filterTheatres.length>0)
        this.filterflag=true;
      }
      console.log(this.theatres);
      });
      });
    

  }
  dismissModal() {
    this.modalctrl.dismiss({
      'dismissed': true
    });
    
  }
  initMap(): void {
    const center: google.maps.LatLngLiteral = {lat: this.latitude, lng: this.longitude};
    this.map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
      center,
      zoom: 8,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });
    var marker = new google.maps.Marker({position: center, map: this.map});
  }
getMap(lat:number,lang:number){
  this.flag=true;
  var element= document.getElementById("map")as HTMLElement;
  if(element.style.display === "none"){
    this.mapText="Close Map";
    element.style.display ="block";
  }
  else{
    this.mapText="View Map";
    element.style.display ="none";
  }
  this.latitude=lat;
  this.longitude=lang;
  this.initMap();
}

async bookTickets(theatre:Theatres,screen:Screens,show:Shows,timmings:showTimmings){
  this.dismissModal();
  this.modal = await this.modalctrl.create({
    component: BookTicketsComponent,
    componentProps:{
        theatre,
        screen,
        show,
        timmings
    },
    swipeToClose: true,
    cssClass: 'book-class'
  });
  return await this.modal.present();
}
async selectCity(){
  this.Citymodal = await this.modalctrl.create({
    component: SelectCityComponent,
    componentProps:{
        
    },
    swipeToClose: true,
    cssClass: 'my-custom-class'
  });
  return await this.Citymodal.present();
}
showAll(){
  this.city="Any City";
  this.filterTheatres=this.theatres;
}
ngOnDestroy(){
  this.currenCity.unsubscribe();
}
}
