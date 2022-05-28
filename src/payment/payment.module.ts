import { NgModule } from '@angular/core';
import { SharedModule } from '../Shared/shared.module';
import { RouterModule } from '@angular/router';
import { PaymentRoutingModule } from './payment-routing.module';
import { PaymentComponent } from './payment.component';
import { httpInterceptorProviders } from 'src/auth/auth-interceptor';


@NgModule({
  imports: [
    SharedModule,
    PaymentRoutingModule,
    RouterModule
  ],
  declarations: [PaymentComponent],
  exports: [PaymentComponent],
  providers: [httpInterceptorProviders],
  bootstrap: [PaymentComponent]
})
export class PaymentsModule {}
