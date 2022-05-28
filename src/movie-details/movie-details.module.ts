import { NgModule } from '@angular/core';
import { SharedModule } from '../Shared/shared.module';
import { RouterModule } from '@angular/router';
import { MovieDetailsRoutingModule } from './movie-details-routing.module';
import { MovieDetailsComponent } from './movie-details.component';
import { MovieDetailsService } from 'src/Services/movie-details.service';
import { httpInterceptorProviders } from 'src/auth/auth-interceptor';

@NgModule({
  imports: [
    SharedModule,
    MovieDetailsRoutingModule,
    RouterModule
  ],
  declarations: [MovieDetailsComponent],
  exports: [MovieDetailsComponent],
  providers: [MovieDetailsService,httpInterceptorProviders],
  bootstrap: [MovieDetailsComponent]
})
export class MovieDetailsModule {}
