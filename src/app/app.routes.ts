import { Routes } from '@angular/router';
import { FormDemoComponent } from './sample-pages/form-demo/form-demo.component';
import { UserRegistrationComponent } from './sample-pages/user-registration/user-registration.component';
import { ProfileEditComponent } from './sample-pages/profile-edit/profile-edit.component';

export const routes: Routes = [
  { path: '', component: FormDemoComponent },
  { path: 'user-registration', component: UserRegistrationComponent },
  { path: 'profile-edit', component: ProfileEditComponent },
  { path: 'control-field', loadComponent: () => import('./sample-pages/control-field-sample/control-field-sample').then(c => c.ControlFieldSample) },
  { path: '**', redirectTo: '' }
];
