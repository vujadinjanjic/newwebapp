import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { CustomValidators } from '../customValidators';
import { AlertifyService } from '../_services/alertify.service';
import { UserService } from '../_services/user.service';
import { User } from '../_models/user';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { UserToEdit } from '../_models/UserToEdit';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
})
export class EditProfileComponent implements OnInit {
  constructor(
    private alertify: AlertifyService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
    public authService: AuthService
  ) {}

  formGroup: FormGroup;
  user: User;
  jwtHelper = new JwtHelperService();

  ngOnInit() {
    this.route.data.subscribe((data) => {
      this.user = data.user;
      console.log(data.user);
    });

    this.formGroup = this.formBuilder.group({
      name: [this.user.name, Validators.required],
      surname: [this.user.surname, Validators.required],
      username: [this.user.username, Validators.required],
      gender: [this.user.gender, Validators.required],
      dateOfBirth: [this.user.dateOfBirth, Validators.required],
      type: [this.user.type]
    });
  }

  updateProfile() {
    const editedUser: UserToEdit = {
      id: this.user.id,
      name: this.formGroup.get('name').value,
      surname: this.formGroup.get('surname').value,
      username: this.formGroup.get('username').value,
      dateOfBirth: this.formGroup.get('dateOfBirth').value,
      gender: this.formGroup.get('gender').value,
    };

    this.userService.editProfile(editedUser).subscribe(
      (res) => {
        this.alertify.success('Uspesno editovam profil');
      },
      (error) => {
        this.alertify.error('Nije editovan profil!');
      }
    );
  }
}
