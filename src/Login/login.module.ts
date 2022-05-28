import { NgModule } from '@angular/core';

import { LoginComponent } from './login.component';
import { SharedModule } from '../Shared/shared.module';
import { LoginRoutingModule } from './login-routing.module';
import { LoginService } from 'src/auth/login.service';
import { RouterModule } from '@angular/router';
import { AuthenticationService } from 'src/Services/authentication.service';
import { httpInterceptorProviders } from 'src/auth/auth-interceptor';
import { AngularFireAuthModule, AngularFireAuth } from '@angular/fire/auth';




@NgModule({
  imports: [
    SharedModule,
    LoginRoutingModule,
    AngularFireAuthModule,
    RouterModule
  ],
  declarations: [LoginComponent],
  exports: [LoginComponent],
  providers: [LoginService, AuthenticationService,httpInterceptorProviders,
    {provide: AngularFireAuthModule, useClass: AngularFireAuth}]

})
export class LoginModule {}
