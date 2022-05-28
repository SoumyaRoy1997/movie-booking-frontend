import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Theatres } from 'src/entity/theatres';
import { Screens } from 'src/entity/screens';

@Injectable({
  providedIn: 'root'
})
export class TheatreService {

  base_url = environment.base_url;

  constructor(public http: HttpClient) { }

  public getScreens(movieId: string):Observable<Screens[]>{
      return this.http.get<Screens[]>(this.base_url+"screens/"+movieId);
  }

  public getTheatres(movieId: string):Observable<Theatres[]>{
    return this.http.get<Theatres[]>(this.base_url+"theatres/"+movieId);
  }
}
