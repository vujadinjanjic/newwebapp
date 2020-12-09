import { Manifestation } from './manifestation';
import { User } from './user';

export interface ReservedTicket {
    customer: string;
    ticketIdentificator: string;
    eventDate: Date;
    type: string;
    status: string;
    price: number;
    manifestationName: string;
    user: User;
    manifestation: Manifestation;
}
