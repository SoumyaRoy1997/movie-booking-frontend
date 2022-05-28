import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SelectCityComponent } from './select-city.component';


const routes: Routes = [
  {
    path: '',
    component: SelectCityComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SelectCityRoutingModule {}
