import { Injectable } from '@angular/core';
import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/alertify.service';
import { Resolve, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../_models/user';
import { JwtHelperService } from '@auth0/angular-jwt';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs/internal/observable/of';


@Injectable()
export class EditProfileResolver implements Resolve<User> {
  constructor(
    private userService: UserService,
    private router: Router,
    private alertify: AlertifyService
  ) {}

  resolve(): Observable<User> {
    const jwtHelper = new JwtHelperService();
    const id = jwtHelper.decodeToken(localStorage.getItem('token')).nameid;

    return this.userService.getUser(id).pipe(
      catchError(() => {
        this.alertify.error('Problem retrieving data!');
        this.router.navigate(['/home']);
        return of(null);
      })
    );
  }
}
