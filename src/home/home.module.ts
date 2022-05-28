import { NgModule } from '@angular/core';


import { SharedModule } from '../Shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { HomeService } from 'src/Services/home.service';
import { RouterModule } from '@angular/router';
import { MovieDetailsService } from 'src/Services/movie-details.service';
import { CityService } from 'src/Services/city.service';
import { httpInterceptorProviders } from 'src/auth/auth-interceptor';


@NgModule({
  imports: [
    SharedModule,
    HomeRoutingModule,
    RouterModule
  ],
  declarations: [HomeComponent],
  exports: [HomeComponent],
  providers: [HomeService, MovieDetailsService,
    CityService,httpInterceptorProviders]
})
export class HomeModule {}
