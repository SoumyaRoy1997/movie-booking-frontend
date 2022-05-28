import { NgModule } from '@angular/core';
import { SharedModule } from '../Shared/shared.module';
import { RouterModule } from '@angular/router';
import { EditProfileRoutingModule } from './edit-profile-routing.module';
import { EditProfileComponent } from './edit-profile.component';
import { httpInterceptorProviders } from 'src/auth/auth-interceptor';


@NgModule({
  imports: [
    SharedModule,
    EditProfileRoutingModule,
    RouterModule
  ],
  declarations: [EditProfileComponent],
  providers: [httpInterceptorProviders],
  bootstrap: [EditProfileComponent]
})
export class EditProfileModule {}
