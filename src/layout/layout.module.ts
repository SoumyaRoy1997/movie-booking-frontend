import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SharedModule } from 'src/Shared/shared.module';
import { AuthenticationService } from 'src/Services/authentication.service';
import { CityService } from 'src/Services/city.service';
import { httpInterceptorProviders } from 'src/auth/auth-interceptor';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    IonicModule
  ],
  declarations: [HeaderComponent,FooterComponent],
  exports: [
    HeaderComponent,
    FooterComponent
    ],
    providers:[AuthenticationService,
    CityService,httpInterceptorProviders]
})
export class LayoutModule {}
