import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()

export class AuthService {
  baseUrl = 'http://localhost:5000/api/authentication/';
  jwtHelper = new JwtHelperService();
  decodedToken: any;

  constructor(private http: HttpClient) {}

  login(model: any) {
    return this.http.post(this.baseUrl + 'login', model).pipe(
      map((response: any) => {
        const user = response;
        if (user) {
          localStorage.setItem('token', user.token);
          this.decodedToken = this.jwtHelper.decodeToken(user.token);
        }
      })
    );
  }
  register(model: any) {
    return this.http.post(this.baseUrl + 'register', model);
  }

  loggedIn() {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }

  getId() {
    const token = localStorage.getItem('token');
    const decodedToken = this.jwtHelper.decodeToken(token);
    return decodedToken.nameid;
  }

  isSeller() {
    const token = localStorage.getItem('token');
    const decodedToken = this.jwtHelper.decodeToken(token);
    return decodedToken?.role === 'Prodavac';
  }

  isCustomer() {
    const token = localStorage.getItem('token');
    const decodedToken = this.jwtHelper.decodeToken(token);
    return decodedToken?.role === 'Kupac';
  }
  isAdmin() {
    const token = localStorage.getItem('token');
    const decodedToken = this.jwtHelper.decodeToken(token);
    return decodedToken?.role === 'Admin';
  }
}
