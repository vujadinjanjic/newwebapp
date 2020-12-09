import { EventPlace } from './EventPlace';

export class ManifestationParams {
  name: string;
  location: string;
  minPrice: number;
  maxPrice: number;
  eventPlace: string;
  type: string;
  eventDate: Date;

  constructor() {
    (this.name = ''),
    (this.eventDate = new Date()),
      (this.eventPlace = ''),
      (this.maxPrice = 400),
      (this.minPrice = 0),
      (this.type = ''),
      (this.location = '');
  }
}
