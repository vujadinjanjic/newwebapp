import { EventPlace } from "./EventPlace";

export interface Manifestation {
  id: number;
  name: string;
  type: string;
  seatsNumber: number;
  eventDate: Date;
  price: number;
  status: string;
  place: EventPlace;
  image: string;
  isDeleted: boolean;
}
