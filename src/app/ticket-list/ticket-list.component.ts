import { Component, OnInit } from '@angular/core';
import { Ticket } from '../_models/ticket';
import { TicketParams } from '../_models/ticketParams';
import { ManifestService } from '../_services/manifest.service';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.css'],
})
export class TicketListComponent implements OnInit {
  tickets: Ticket[];
  ticketParams: TicketParams = new TicketParams();
  constructor(private ms: ManifestService) {}

  ngOnInit() {
    this.ms.getAllTickets().subscribe((res) => {
      this.tickets = res;
      console.log(res);
    });
  }

  onNameSort() {
    this.tickets.sort((a, b) => a.manifestation.name.localeCompare(b.manifestation.name));
  }

  onPriceSort() {
    this.tickets.sort((a, b) => (a.price > b.price ? 1 : -1));
  }

  onDateSort() {}

  removeFilters() {
    this.ticketParams = new TicketParams();
    this.ms.getAllTickets(this.ticketParams).subscribe((res) => {
      this.tickets = res;
    });
  }

  loadTickets() {
    this.ms.getAllTickets(this.ticketParams).subscribe((res) => {
      this.tickets = res;
    });
  }
}
