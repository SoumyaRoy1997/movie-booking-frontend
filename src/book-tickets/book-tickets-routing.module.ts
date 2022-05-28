import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookTicketsComponent } from './book-tickets.component';


const routes: Routes = [
  {
    path: '',
    component: BookTicketsComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookTicketsRoutingModule {}
