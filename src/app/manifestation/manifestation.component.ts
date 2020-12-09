import { Component, OnInit, Input } from '@angular/core';
import { Manifestation } from '../_models/manifestation';
import { ManifestService } from '../_services/manifest.service';
import { AlertifyService } from '../_services/alertify.service';
import { MatDialog } from '@angular/material/dialog';
import { EditManifestationDialogComponent } from '../add-manifestation/edit-manifestation-dialog/edit-manifestation-dialog.component';
import { ManifestationViewComponent } from '../add-manifestation/manifestation-view/manifestation-view.component';
import { AuthService } from '../_services/auth.service';



@Component({
  selector: 'app-manifestation',
  templateUrl: './manifestation.component.html',
  styleUrls: ['./manifestation.component.css'],
})
export class ManifestationComponent implements OnInit {
  @Input() manifest: Manifestation;

  constructor(
    private manifestService: ManifestService,
    private alertify: AlertifyService,
    private dialog: MatDialog,
    public authService: AuthService
  ) {}

  ngOnInit() {}
  DeleteManifestation(id: number) {
    this.manifestService.deleteManifestation(id).subscribe((res) => {
      console.log('ticket deleted');
      this.alertify.success('Izbrisana uspesno manifestacija');
    });
    this.manifestService.getAllManifestations().subscribe();
  }
  viewManifestation() {
    const dialogRef = this.dialog.open(ManifestationViewComponent, {
      width: '800px',
      height: '700px',
      data: { id: this.manifest.id, manifest: this.manifest },
    });
  }
  editManifestation() {
    const dialogRef = this.dialog.open(EditManifestationDialogComponent, {
      width: '1000px',
      height: '1200px',
      data: { id: this.manifest.id, manifest: this.manifest },
    });
  }
  MakeItActive(id: number) {
    this.manifestService.izmeniAktivnost(id).subscribe((res) => {
      this.alertify.success('Uspesno je aktivirana manifestacija!');
    });
  }
}
