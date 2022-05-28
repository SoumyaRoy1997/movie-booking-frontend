import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { Observable } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class UserResolverService implements Resolve<string> {
  constructor(
    private service: AuthenticationService
  ) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any>|Promise<any>|any {
    return this.service.currentUserValue;
  }
 
}