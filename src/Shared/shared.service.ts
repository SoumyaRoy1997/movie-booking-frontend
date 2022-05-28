import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { users } from 'src/entity/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  base_url = environment.base_url+"api/auth/";
  constructor(public http: HttpClient) { }

  getuser(username:string):Observable<users>{
    return this.http.get<users>(this.base_url+username);
  }
}
