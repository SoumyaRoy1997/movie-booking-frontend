import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { movies } from 'src/entity/movies';
import { Observable } from 'rxjs';
import { distanceApi } from 'src/entity/distance';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  base_url = environment.base_url;
  constructor(public http: HttpClient) { }

  public getNovies(){
    return this.http.get<movies[]>(this.base_url + 'movies');
  }

  public getDistance(origin:string,destination:number,nowShowing:boolean):Observable<movies[]>{
    return this.http.get<movies[]>(this.base_url+"movies/distance/"+nowShowing+"?origin="+origin+"&destination="+destination);
  }
}
