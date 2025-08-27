import { Routes } from '@angular/router';
import { FormDemoComponent } from './sample-pages/form-demo/form-demo.component';
import { UserRegistrationComponent } from './sample-pages/user-registration/user-registration.component';
import { ProfileEditComponent } from './sample-pages/profile-edit/profile-edit.component';

export const routes: Routes = [
  { path: '', component: FormDemoComponent },
  { path: 'user-registration', component: UserRegistrationComponent },
  { path: 'profile-edit', component: ProfileEditComponent },
  { path: '**', redirectTo: '' }
];
