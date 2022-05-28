import { NgModule } from '@angular/core';
import { SharedModule } from '../Shared/shared.module';
import { RouterModule } from '@angular/router';
import { BookTicketsRoutingModule } from './book-tickets-routing.module';
import { BookTicketsComponent } from './book-tickets.component';
import { httpInterceptorProviders } from 'src/auth/auth-interceptor';


@NgModule({
  imports: [
    SharedModule,
    BookTicketsRoutingModule,
    RouterModule
  ],
  declarations: [BookTicketsComponent],
  exports:[BookTicketsComponent],
  providers: [httpInterceptorProviders],
  bootstrap: [BookTicketsComponent]
})
export class BookTicketsModule {}
