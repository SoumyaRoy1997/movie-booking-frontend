import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { bookings } from 'src/entity/bookings';
import { Observable } from 'rxjs';
import { users } from 'src/entity/user';
import { payment } from 'src/entity/payment';
import { appResponse } from './movieBookingResponse';

@Injectable({
  providedIn: 'root'
})
export class BookTicketService {
  base_url = environment.base_url;
  constructor(public http: HttpClient) { }
  public booking(booking:bookings,tickets:string[],timmeId:string):Observable<appResponse>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
  };
    return this.http.post<appResponse>(this.base_url+"bookings/"+timmeId+"?tickets="+tickets,booking,httpOptions);
  }
  public saveCard(user:users){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      }),
      observe: 'response' as 'response'
  };
    return this.http.put(this.base_url+"api/auth/edit-profile",user,httpOptions);
  }
  public getPin(payment:payment,pin:string):Observable<boolean>{
    return this.http.get<boolean>(this.base_url+"saved-payment/"+pin+"?payment="+payment);
  }
}
