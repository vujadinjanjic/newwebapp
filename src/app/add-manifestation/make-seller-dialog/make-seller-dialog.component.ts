import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CustomValidators } from 'src/app/customValidators';
import { NewSeller } from 'src/app/_models/newSeller';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ManifestService } from 'src/app/_services/manifest.service';
import { UserService } from 'src/app/_services/user.service';


@Component({
  selector: 'app-make-seller-dialog',
  templateUrl: './make-seller-dialog.component.html',
  styleUrls: ['./make-seller-dialog.component.css'],
})
export class MakeSellerDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<MakeSellerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private manifestService: ManifestService,
    private alertify: AlertifyService,
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {}

  formGroup: FormGroup;

  ngOnInit() {
    this.formGroup = this.formBuilder.group(
      {
        name: ['', Validators.required],
        surname: ['', Validators.required],
        username: ['', Validators.required],
        gender: ['', Validators.required],
        dateOfBirth: ['', Validators.required],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            CustomValidators.patternValidator(/\d/, { hasNumber: true }),
            CustomValidators.patternValidator(/[A-Z]/, {
              hasCapitalCase: true,
            }),
            CustomValidators.patternValidator(/[a-z]/, { hasSmallCase: true }),
          ],
        ],
        confirmPassword: ['', Validators.required],
      },
      { validator: CustomValidators.passwordMatchValidator }
    );
  }

  makeSeller() {
    const newSeller: NewSeller = {
      name: this.formGroup.get('name').value,
      surname: this.formGroup.get('surname').value,
      username: this.formGroup.get('username').value,
      dateOfBirth: this.formGroup.get('dateOfBirth').value,
      password: this.formGroup.get('password').value,
      gender: this.formGroup.get('gender').value,
    };

    this.userService.napraviProdavca(newSeller).subscribe(
      (res) => {
        this.alertify.success('Uspesno napravljen prodavac');
        this.dialogRef.close();
      },
      (error) => {
        this.alertify.error('Nije napravljen prodavac!');
      }
    );
  }
}
