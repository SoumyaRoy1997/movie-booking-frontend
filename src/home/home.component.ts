import { Component, OnInit, ViewChild, Input, OnChanges, AfterViewInit, OnDestroy } from '@angular/core';
import { IonInfiniteScroll, ModalController } from '@ionic/angular';
import { movies } from 'src/entity/movies';
import { HomeService } from 'src/Services/home.service';
import { Router } from '@angular/router';
import { FormBuilder,FormGroup } from '@angular/forms';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Theatres } from 'src/entity/theatres';
import { TheatreService } from 'src/Services/theatre.service';
import { Subscription } from 'rxjs';
import { CityService } from 'src/Services/city.service';
import { SelectCityComponent } from 'src/select-city/select-city.component';
import { element } from 'protractor';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit{
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  @ViewChild('tabGroup') tabGroup;
  filternowShowing: movies[];
  filtercommingSoon: movies[];
  nowShowing:movies[];
  commingSoon:movies[];
  theatres:Theatres[];
  currenCity:Subscription;
  city:string;
  modal=null;
  distance:number;
  response;
  filterform = this.fb.group({
    language: [''],
    genre: [''],
    distance: ['']
  });
  constructor(private service: HomeService,
              private router: Router,
              private fb:FormBuilder,
              private Theatreservice:TheatreService,
              private cityservice:CityService,
              private modalController:ModalController) {}

  ngOnInit(){
    this.service.getNovies().subscribe((data) => {
      this.filternowShowing=data.filter(values=>values.nowShowing === true);
      this.filtercommingSoon=data.filter(values=>values.nowShowing === false);
      this.nowShowing=this.filternowShowing;
      this.commingSoon=this.filtercommingSoon;
    });
  }
  search(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    if(this.tabGroup.selectedIndex === 1){
    if (filterValue !== null || filterValue !== undefined || filterValue !== ' ' || filterValue.includes('')) {
    this.filtercommingSoon = this.commingSoon.filter(values => values.title.includes(filterValue));
    }
    else {
      this.filtercommingSoon = this.commingSoon;
      }
  }
  else{
    if (filterValue !== null || filterValue !== undefined || filterValue !== ' ' || filterValue.includes('')) {
      this.filternowShowing = this.nowShowing.filter(values => values.title.includes(filterValue));
      }
      else {
        this.filternowShowing = this.nowShowing;
        }
  }
  }
  tabChanged(event :MatTabChangeEvent){
    (document.getElementById('search') as HTMLInputElement).value = '';
    if(event.index === 1){
      this.filternowShowing=this.nowShowing;
    }
    else
    this.filtercommingSoon=this.commingSoon;
  }
  loadData(event) {
    setTimeout(() => {
      event.target.complete();
      if (this.nowShowing.length == 1000 || this.commingSoon.length == 1000) {
        event.target.disabled = true;
      }
    }, 500);
  }

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }

  isImageExist(poster: string)
  {
    if (poster != null && poster !== 'FALSE') {
      return true;
    }
    else {
    return false;
    }
  }

  viewMovie(movie: movies){
    localStorage.setItem('_mid', movie.id);
    this.router.navigateByUrl('movie-details');
  }
  clearFilter(){
    this.filterform.patchValue({
      language:'',
      genre:'',
      distance:''
    });
    this.filternowShowing = this.nowShowing;
    this.filtercommingSoon = this.commingSoon;
  }
  filter(form:FormGroup){
    this.distance=5000;
    if(form.value.distance === 'Within 10 Km')
      this.distance=10000;
    if(this.tabGroup.selectedIndex === 0){
    if(form.value.language !== ''){
      this.filternowShowing = this.nowShowing.
      filter(values => 
        values.languages.
        some(element=> 
          form.value.language == element));
    }
    if(form.value.genre !== ''){
      this.filternowShowing = this.filternowShowing.filter(values => 
        values.genres.
        includes(form.value.genre));
    }
    if(form.value.distance !=='' ){
      this.currenCity=this.cityservice.currentCitySubject.subscribe(value=>{
        this.city=value;
      });
      if(this.city === null || this.city === undefined || this.city === ''){
        this.selectCity();
      }
      this.service.getDistance(this.city,this.distance,true).subscribe(data=>{
        console.log(data);
        this.filternowShowing=data;
      })
      
    }
  }
  else{
    if(form.value.language !== ''){
      this.filtercommingSoon = this.filtercommingSoon.
      filter(values => 
        values.languages.
        some(element=> 
          form.value.language == element));
    }
    if(form.value.genre !== ''){
      this.filtercommingSoon = this.filtercommingSoon.filter(values => values.genres.includes(form.value.genre));
    }
    if(form.value.distance !=='' ){
      this.currenCity=this.cityservice.currentCitySubject.subscribe(value=>{
        this.city=value;
      });
      if(this.city === null || this.city === undefined || this.city === ''){
        this.selectCity();
      }
      
      this.service.getDistance(this.city,this.distance,false).subscribe(data=>{
        console.log(data);
        this.filtercommingSoon=data;
      })
      
    }
  }
  }

  async selectCity(){
    this.modal = await this.modalController.create({
      component: SelectCityComponent,
      componentProps:{
          
      },
      swipeToClose: true,
      cssClass: 'my-custom-class'
    });
    return await this.modal.present();
  }
  dismissModal() {
    if (this.modal) {
      this.modal.dismiss().then(() => { this.modal = null; });
    }
  }
}
