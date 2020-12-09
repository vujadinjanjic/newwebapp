import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ReservedTicket } from '../_models/ReservedTicket';
import { TicketReservation } from '../_models/TicketReservation';
import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/auth.service';
import { ManifestService } from '../_services/manifest.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-reserved-ticket',
  templateUrl: './reserved-ticket.component.html',
  styleUrls: ['./reserved-ticket.component.css'],
})
export class ReservedTicketComponent implements OnInit {
  reservedTicket: ReservedTicket;
  reservedTickets: ReservedTicket[];
  displayedColumns: string[] = [
    'ticketId',
    'status',
    'type',
    'date',
    'manifest',
    'customer',
  ];
  dataSource: MatTableDataSource<ReservedTicket>;
  constructor(
    private userService: UserService,
    private alertify: AlertifyService,
    private ms: ManifestService,
    private dialog: MatDialog,
    private auth: AuthService
  ) {}

  ngOnInit() {
    const id = this.auth.getId();
    this.loadReservations(id);
  }
  
  loadReservations(id: number){
    this.ms.getTicketReservation(id).subscribe(
      (reservedTickets: ReservedTicket[]) => {
        this.dataSource = new MatTableDataSource(reservedTickets);
      },
      (error) => {
        this.alertify.error(error);
      }
      
    );
  }

}
