import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PasswordModule } from 'primeng/password';
@Component({
  selector: 'app-auth-signin',
  standalone: true,
  imports: [RouterModule,PasswordModule],
  templateUrl: './auth-signin.component.html',
  styleUrls: ['./auth-signin.component.scss']
})
export default class AuthSigninComponent {}
