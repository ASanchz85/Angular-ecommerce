import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Login/components/login/login.component';
import { SignupComponent } from './Login/components/signup/signup.component';
import { isLoggedGuard } from './guards/is-logged.guard';
import { hasRoleGuard } from './guards/has-role.guard';

const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./Management/management.module').then((m) => m.ManagementModule),
    /* canMatch: [isLoggedGuard, hasRoleGuard(['Admin', 'Employee'])], */
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
