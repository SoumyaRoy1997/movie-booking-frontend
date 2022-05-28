import { Injectable } from '@angular/core';
import { HttpClient , HttpParams, HttpHeaders} from '@angular/common/http';
import {environment} from '../environments/environment';
import { users } from 'src/entity/user';
import { JwtResponse } from './jwt-response';
import { Observable } from 'rxjs';
import {AngularFireAuth} from '@angular/fire/auth';
import {auth} from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
};
  base_url = environment.base_url+"api/auth/";
  constructor(public http: HttpClient,
              private afAuth: AngularFireAuth) { }

  getLogin(user:users):Observable<JwtResponse>{
    return this.http.post<JwtResponse>(this.base_url + 'login' ,user, this.httpOptions);
  }

  getRegistration(user: users, role: string){
    return this.http.post<boolean>(this.base_url + 'register/' + role, user);
  }

  async googleSignin() {
    return this.afAuth.signInWithPopup(new auth.GoogleAuthProvider());

  }
  async SignOut() {
    await this.afAuth.signOut();
  }
}
