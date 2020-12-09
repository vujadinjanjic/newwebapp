import { Manifestation } from './manifestation';

export interface Ticket {
  ticketId: number;
  ticketIdentificator: string;
  manifestation: Manifestation;
  price: number;
  eventDate: Date;
  customer: string;
  status: string;
  type: string;
  isDeleted: boolean;
}
