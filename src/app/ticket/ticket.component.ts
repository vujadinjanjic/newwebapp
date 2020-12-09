import { Component, OnInit, Input } from '@angular/core';
import { Ticket } from '../_models/ticket';
import { ManifestService } from '../_services/manifest.service';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../_services/auth.service';
import { ReservationDialogComponent } from '../add-manifestation/reservation-dialog/reservation-dialog.component';


@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css'],
})
export class TicketComponent implements OnInit {
  @Input() ticket: Ticket;
  constructor(private dialog: MatDialog, private manifeestService: ManifestService,public authService: AuthService) {}

  ngOnInit() {}
  DeleteTicket(id: number) {
    this.manifeestService.deleteTicket(id).subscribe((res) => {
      console.log('ticket deleted');
    });
  }
  ReserveTicket(){
    this.dialog.open(ReservationDialogComponent, {
      width: '700px',
      height: '600px',
      data: {ticket: this.ticket}
    });

  }
}
