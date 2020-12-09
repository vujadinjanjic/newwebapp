import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CustomValidators } from 'src/app/customValidators';
import { EventPlace } from 'src/app/_models/EventPlace';
import { ManifestAdd } from 'src/app/_models/ManifestAdd';
import { Manifestation } from 'src/app/_models/manifestation';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ManifestService } from 'src/app/_services/manifest.service';


@Component({
  selector: 'app-add-manifestation',
  templateUrl: './add-manifestation.component.html',
  styleUrls: ['./add-manifestation.component.css'],
})
export class AddManifestationComponent implements OnInit {
  newManifest: Manifestation = {
    id: 0,
    name: '',
    type: '',
    seatsNumber: 0,
    eventDate: new Date(),
    price: 0,
    status: '',
    place: null,
    image: '',
    isDeleted: false,
  };

  places: EventPlace[];
  manifestation: Manifestation;
  formGroup: FormGroup;
  isEdit = false;
  startingMinDate = new Date();
  selectedFile = null;

  constructor(
    public dialogRef: MatDialogRef<AddManifestationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private manifestService: ManifestService,
    private fb: FormBuilder,
    private alertify: AlertifyService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.manifestService.getAllPlaces().subscribe((res) => {
      this.places = res;
    });
    this.formGroup = this.fb.group({
      name: [
        '',
        [
          Validators.minLength(5),
          Validators.maxLength(10),
          Validators.required,
        ],
      ],
      price: ['', [CustomValidators.numberValidator]],
      type: ['', [Validators.required]],
      place: ['', Validators.required],
      date: ['', Validators.required],

      seats: [
        '',
        [
          CustomValidators.numberValidator,
          Validators.max(100),
          Validators.min(10),
        ],
      ],
    });
  }

  onFileSelected(event) {
    this.selectedFile = event.target.files[0] as File;
  }

  AddManifestation() {
    const newManifest: ManifestAdd = {
      name: this.formGroup.get('name').value,
      type: this.formGroup.get('type').value,
      seatsNumber: this.formGroup.get('seats').value,
      place: this.formGroup.get('place').value,
      price: this.formGroup.get('price').value,
      date: this.formGroup.get('date').value,
    };

    console.log(newManifest);

    this.manifestService.addManifestation(newManifest).subscribe(
      (dataf: any) => {
        const fd = new FormData();
        fd.append('file', this.selectedFile, this.selectedFile.name);

        return this.http
          .post('http://localhost:5000/api/photos/' + dataf.id, fd)
          .subscribe((res) => {
            this.alertify.success('Uspesno dodata nova manifestacija.');
          });
      },
      (error) => {
        this.alertify.error('Vec postoji manifestacija s ovakvim imenom!!!');
      }
    );
    this.dialogRef.close();
  }
}
