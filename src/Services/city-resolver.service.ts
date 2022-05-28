import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { CityService } from './city.service';


@Injectable({ providedIn: 'root' })
export class CityResolverService implements Resolve<string> {
  constructor(
    private service: CityService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const city = this.service.currentCityValue;
    return city;
}
}