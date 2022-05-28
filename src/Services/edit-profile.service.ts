import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { bookings, bookingResponse } from 'src/entity/bookings';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EditProfileService {
  base_url = environment.base_url;
  constructor(public http: HttpClient) { }

  uploadPhoto(id:string,picture:File){
    this.base_url=this.base_url+"api/auth/";
    return this.http.put(this.base_url+"upload-pic/"+id,picture);
  }

  getBookings(id:string):Observable<bookings[]>{
    return this.http.get<bookings[]>(this.base_url+"bookings/"+id);
  }

  getBookingDetails(theatreID:string,movieID:string,timmingID:string):Observable<bookingResponse>{
    return this.http.get<bookingResponse>(this.base_url+"bookings/details/"+theatreID+"?movieID="+movieID+"&timmingID="+timmingID);
  }
}
