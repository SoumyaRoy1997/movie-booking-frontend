import { NgModule } from '@angular/core';
import { SharedModule } from '../Shared/shared.module';
import { RouterModule } from '@angular/router';
import { MovieDetailsService } from 'src/Services/movie-details.service';
import { SelectCityComponent } from './select-city.component';
import { SelectCityRoutingModule } from './select-city-routing-module';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { httpInterceptorProviders } from 'src/auth/auth-interceptor';

@NgModule({
  imports: [
    SharedModule,
    SelectCityRoutingModule,
    RouterModule
  ],
  declarations: [SelectCityComponent],
  exports: [SelectCityComponent],
  providers: [
      MovieDetailsService,
      Geolocation,
      httpInterceptorProviders
    ],
  bootstrap: [SelectCityComponent]
})
export class SelectCityModule {}
