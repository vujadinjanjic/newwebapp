import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Komentar } from 'src/app/_models/comment';
import { Manifestation } from 'src/app/_models/manifestation';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ManifestService } from 'src/app/_services/manifest.service';


@Component({
  selector: 'app-manifestation-view',
  templateUrl: './manifestation-view.component.html',
  styleUrls: ['./manifestation-view.component.css'],
})
export class ManifestationViewComponent implements OnInit {
  manifest: Manifestation;
  comment: Komentar;
  constructor(
    public dialogRef: MatDialogRef<ManifestationViewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private manifestService: ManifestService,
    private alertify: AlertifyService
  ) {}

  ngOnInit() {
    this.manifest = this.data.manifest;
    this.manifestService.getComment(this.data.id).subscribe(res => { 
      this.comment = res;
    });
  }

}
