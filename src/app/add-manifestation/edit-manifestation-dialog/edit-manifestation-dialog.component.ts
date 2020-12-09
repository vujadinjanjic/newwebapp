import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CustomValidators } from 'src/app/customValidators';
import { EditManifestation } from 'src/app/_models/EditManifestation';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ManifestService } from 'src/app/_services/manifest.service';

@Component({
  selector: 'app-edit-manifestation-dialog',
  templateUrl: './edit-manifestation-dialog.component.html',
  styleUrls: ['./edit-manifestation-dialog.component.css'],
})
export class EditManifestationDialogComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  startingMinDate = new Date();
  constructor(
    public dialogRef: MatDialogRef<EditManifestationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private manifestService: ManifestService,
    private fb: FormBuilder,
    private alertify: AlertifyService
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      // tslint:disable-next-line: max-line-length
      name: [this.data.manifest.name, [Validators.required]],
      seatsNumber: [
        this.data.manifest.seatsNumber,
        [CustomValidators.numberValidator],
      ],
      price: [this.data.manifest.price, [CustomValidators.numberValidator]],
      eventDate: [this.data.manifest.eventDate, [Validators.required]],
    });
  }

  editManifestation() {
    // tslint:disable-next-line: one-variable-per-declaration
    const editovana: EditManifestation = {
      name: this.form.get('name').value,
      seatsNumber: this.form.get('seatsNumber').value,
      price: this.form.get('price').value,
      eventDate: this.form.get('eventDate').value,
    };

    this.manifestService
      .editManifestation(this.data.manifest.id, editovana)
      .subscribe(
        (res) => {
          this.alertify.success('Uspesno ste editovali mannifestaciju.');
          this.dialogRef.close();
          
        },
        (error) => {
          this.alertify.error('Neuspesno editovanje manifestacije');
        }
      );
  }

 
}
