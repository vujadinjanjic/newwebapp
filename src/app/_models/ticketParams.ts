export class TicketParams {
  status: string;
  minPrice: number;
  maxPrice: number;
  type: string;
  manifestationName: string;
  eventDate: Date;

  constructor() {
    (this.status = ''),
      (this.type = ''),
      (this.eventDate = new Date()),
      (this.manifestationName = ''),
      (this.maxPrice = 400),
      (this.minPrice = 0);
  }
}
