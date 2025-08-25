import { Routes } from '@angular/router';
import { FormDemoComponent } from './form-demo.component';
import { UserRegistrationComponent } from './user-registration.component';
import { ProfileEditComponent } from './profile-edit.component';

export const routes: Routes = [
  { path: '', component: FormDemoComponent },
  { path: 'user-registration', component: UserRegistrationComponent },
  { path: 'profile-edit', component: ProfileEditComponent },
  { path: '**', redirectTo: '' }
];
