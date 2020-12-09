import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../_models/user';
import { NewSeller } from '../_models/newSeller';
import { UserToEdit } from '../_models/UserToEdit';

@Injectable()
export class UserService {
  baseUrl = 'http://localhost:5000/api/';
  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl + 'users');
  }

  getUser(id): Observable<User> {
    return this.http.get<User>(this.baseUrl + 'users/user/' + id);
  }

  blockUser(id) {
    return this.http.get(this.baseUrl + 'users/blockUser/' + id);
  }

  editProfile(newUser: UserToEdit) {
    return this.http.post(this.baseUrl + 'users/editProfile', newUser);
  }

  napraviProdavca(newSeller: NewSeller) {
    return this.http.post(this.baseUrl + 'users/napraviProdavca', newSeller);
  }
}
