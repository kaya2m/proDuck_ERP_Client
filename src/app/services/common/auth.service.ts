import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private jwtHelper: JwtHelperService) { }

  identityCheck(): boolean {
    const token = localStorage.getItem('accessToken');

    if (!token) {
      return false;
    }

    try {
      return !this.jwtHelper.isTokenExpired(token);
    } catch (error) {
      return false;
    }
  }

  get isAuthenticated(): boolean {
    return this.identityCheck();
  }
}
