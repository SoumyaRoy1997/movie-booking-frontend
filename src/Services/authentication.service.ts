import { Injectable } from '@angular/core';
import { HttpClient , HttpParams} from '@angular/common/http';
import { BehaviorSubject, Observable, from } from 'rxjs';
import {users} from '../entity/user';
import { Router } from '@angular/router';
import {Location} from '@angular/common';
@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    public currentUserSubject: BehaviorSubject<users>;
    public currentUser: Observable<users>;
    constructor(private http: HttpClient, private router: Router, private location: Location) {
        this.currentUserSubject = new BehaviorSubject<users>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): users {
        return this.currentUserSubject.value;
    }

    login(user: users) {
                if (user) {
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.currentUserSubject.next(user);
                    return user;
                }
    }

    logout() {
        localStorage.clear();
        this.currentUserSubject.next(null);
        this.router.navigateByUrl('login');
    }
}
