import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TheatresComponent } from './theatres.component';
import { CityResolverService } from 'src/Services/city-resolver.service';


const routes: Routes = [
  {
    path: '',
    component: TheatresComponent,
    resolve:[CityResolverService]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TheatresRoutingModule {
}
