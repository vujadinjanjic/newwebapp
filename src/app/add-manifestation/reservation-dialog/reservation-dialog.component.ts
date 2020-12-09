import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { AuthService } from 'src/app/_services/auth.service';
import { ManifestService } from 'src/app/_services/manifest.service';
import { TicketReservation } from '../../_models/TicketReservation';

@Component({
  selector: 'app-reservation-dialog',
  templateUrl: './reservation-dialog.component.html',
  styleUrls: ['./reservation-dialog.component.css'],
})
export class ReservationDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<ReservationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private manifestService: ManifestService,
    private alertify: AlertifyService,
    private authService: AuthService
  ) {}

  ngOnInit() {}

  Reserve() {
    this.manifestService
      .makeReservation(this.authService.getId(), this.data.ticket.ticketId)
      .subscribe(res => {
        this.alertify.success('Uspesno ste rezervisali manifestaciju.');
        this.dialogRef.close();
      }, error => {
        this.alertify.error('Niste uspeli da rezervisete ovu kartu.')
      });
  }
}
