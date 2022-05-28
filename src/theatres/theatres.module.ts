import { NgModule } from '@angular/core';


import { SharedModule } from '../Shared/shared.module';
import { RouterModule } from '@angular/router';
import { TheatresRoutingModule } from './theatres-routing.module';
import { TheatresComponent } from './theatres.component';
import { CityService } from 'src/Services/city.service';
import { httpInterceptorProviders } from 'src/auth/auth-interceptor';


@NgModule({
  imports: [
    SharedModule,
    TheatresRoutingModule,
    RouterModule
  ],
  declarations: [TheatresComponent],
  exports: [TheatresComponent],
  providers: [CityService,httpInterceptorProviders]
})
export class TheatresModule {}
