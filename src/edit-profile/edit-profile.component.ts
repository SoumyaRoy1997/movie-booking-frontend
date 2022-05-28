import { Component, OnInit, ViewChild } from '@angular/core';
import { EditProfileService } from 'src/Services/edit-profile.service';
import { AuthenticationService } from 'src/Services/authentication.service';
import { users } from 'src/entity/user';
import { SharedService } from 'src/Shared/shared.service';
import { bookings } from 'src/entity/bookings';
import { IonInfiniteScroll } from '@ionic/angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  user:users;
  loading=false;
  counter=0;
  booking:bookings[];
  constructor(private service:EditProfileService,
              private sharedService:SharedService,
              private authenticationservice:AuthenticationService) { }

  ngOnInit() {
    this.authenticationservice.currentUserSubject.subscribe(data =>{
      this.user=data;
        this.service.getBookings(this.user.id).subscribe(value=>{
          this.booking=value;
          this.booking.forEach(element => {
            this.service.getBookingDetails(element.theatreID,element.movieID,element.timmingID).subscribe(details=>{
              element.response=details;
              this.loading=true;
              this.counter+=1;
            });           
          });
        });
    });
    
  }

  uploadPhoto(){
    const element=document.getElementById("upload") as HTMLElement;
    element.click();
  }
  onFileChange(event){
    this.service.uploadPhoto(this.user.id,event.target.files[0]).subscribe();
  }
  loadData(event) {
    setTimeout(() => {
      event.target.complete();
      if (this.booking.length == 1000) {
        event.target.disabled = true;
      }
    }, 500);
  }

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }

}
