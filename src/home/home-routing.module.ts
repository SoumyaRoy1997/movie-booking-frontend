import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import {CityResolverService} from '../Services/city-resolver.service';
import { UserResolverService } from 'src/Services/user-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    resolve:{city:CityResolverService,isAuthenticated: UserResolverService}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {
}
