import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '../layout/layout.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TheatresModule } from 'src/theatres/theatres.module';
import { BookTicketsModule } from 'src/book-tickets/book-tickets.module';
import { DropdownDirective } from 'src/Shared/dropdown.directive';
import { SelectCityModule } from 'src/select-city/select-city.module';
import { PaymentsModule } from 'src/payment/payment.module';
import { httpInterceptorProviders } from 'src/auth/auth-interceptor';
import { environment } from 'src/environments/environment';
import {AngularFireModule} from '@angular/fire'


@NgModule({
  declarations: [AppComponent,
    DropdownDirective],
  entryComponents: [],
  imports: [
  BrowserModule,
  IonicModule.forRoot(),
  AppRoutingModule,
  AngularFireModule.initializeApp(environment.firebaseconfig, 'movie-booking-app'),
  BrowserAnimationsModule,
  LayoutModule,
  TheatresModule,
  BookTicketsModule,
  SelectCityModule,
  PaymentsModule,
  NgbModule
],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    httpInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
