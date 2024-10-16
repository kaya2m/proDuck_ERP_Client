import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/guards/common/auth.guard';
import { AdminComponent } from './theme/layout/admin/admin.component';
import { AuthSigninComponent } from './components/authentication/auth-signin/auth-signin.component';
import AuthSignupComponent from './components/authentication/auth-signup/auth-signup.component';
import { CustomersComponent } from './components/pages/customers/customers.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: AuthSigninComponent,
  },
  {
    path: 'signup',
    component: AuthSignupComponent,
  },
  {
    path: 'dashboard',
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'customers',
        component: CustomersComponent
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
