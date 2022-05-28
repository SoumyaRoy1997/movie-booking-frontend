import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { movies } from 'src/entity/movies';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MovieDetailsService {

  base_url = environment.base_url;
  constructor(public http: HttpClient) { }

  getMovieDetail(id: string): Observable<movies>{
    return this.http.get<movies>(this.base_url + 'movies/' + id);
  }
}
