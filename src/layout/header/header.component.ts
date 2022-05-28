import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { AuthenticationService } from 'src/Services/authentication.service';
import { Subscription } from 'rxjs';
import { ModalController } from '@ionic/angular';
import { SelectCityComponent } from 'src/select-city/select-city.component';
import { users } from 'src/entity/user';
import { CityService } from 'src/Services/city.service';
import { Router } from '@angular/router';
import { SharedService } from 'src/Shared/shared.service';
import { UserResolverService } from 'src/Services/user-resolver.service';
import { CityResolverService } from 'src/Services/city-resolver.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers:[CityResolverService, UserResolverService]
})
export class HeaderComponent implements OnInit,OnDestroy {
  user: users;
  gapi:any;
  currentuser:Subscription;
  modal=null;
  city:string;
  currenCity:Subscription;
  isAuthenticated=false;
  role:string;
  constructor(private authenticationService: AuthenticationService,
    private cityservice:CityService,
    private modalController:ModalController,
    private router: Router,
    private sharedService:SharedService) { }
  
  
  ngOnInit() {
     this.currentuser = this.authenticationService.currentUserSubject.subscribe(data => {
      this.isAuthenticated = !!data;
      this.user = data;
     });
    this.currenCity=this.cityservice.currentCitySubject.subscribe(value=>{
      this.city=value;
    });
    
  }
  openEditDialog(){
    this.router.navigateByUrl('/profile');
  }
  logoutUser(){
    this.authenticationService.logout();
    window.sessionStorage.clear();
    var auth2 = this.gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
  }
  ngOnDestroy(){
    this.currentuser.unsubscribe();
    this.currenCity.unsubscribe();
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
