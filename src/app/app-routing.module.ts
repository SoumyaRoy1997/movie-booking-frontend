import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('../Login/login.module').then( m => m.LoginModule)
  },
  {
    path: 'home',
    loadChildren: () => import('../home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'movie-details',
    loadChildren: () => import('../movie-details/movie-details.module').then(m => m.MovieDetailsModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('../edit-profile/edit-profile.module').then(m => m.EditProfileModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
