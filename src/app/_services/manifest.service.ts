import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Manifestation } from '../_models/manifestation';
import { Observable } from 'rxjs';
import { EventPlace } from '../_models/EventPlace';
import { ManifestAdd } from '../_models/ManifestAdd';
import { Ticket } from '../_models/ticket';
import { ManifestationParams } from '../_models/manifestationParams';
import { TicketParams } from '../_models/ticketParams';
import { Komentar } from '../_models/comment';
import { User } from '../_models/user';
import { TicketReservation } from '../_models/TicketReservation';
import { ReservedTicket } from '../_models/ReservedTicket';
import { EditManifestation } from '../_models/EditManifestation';

@Injectable()

export class ManifestService {
  baseUrl = 'http://localhost:5000/api/';
  constructor(private http: HttpClient) {}

  getAllTickets(ticketParams?: TicketParams): Observable<Ticket[]> {
    let params = new HttpParams();
    if (ticketParams !== null && ticketParams !== undefined) {
      params = params.append('type', ticketParams.type);
      params = params.append('status', ticketParams.status);
      // params = params.append('eventDate', ticketParams.eventDate.toString());
      params = params.append(
        'manifestationName',
        ticketParams.manifestationName
      );
      params = params.append('minPrice', ticketParams.minPrice.toString());
      params = params.append('maxPrice', ticketParams.maxPrice.toString());
    }

    return this.http.get<Ticket[]>(this.baseUrl + 'manifest/allTickets', {
      params,
    });
  }
  makeReservation(customerId: number, ticketId: number) {
    return this.http.post(this.baseUrl + 'manifest/reservation', {
      customerId,
      ticketId,
    });
  }

  editManifestation(id: number, editManifestation: EditManifestation) {
    return this.http.post(
      this.baseUrl + 'manifest/editManifestation/' + id,
      editManifestation
    );
  }
  deleteTicket(id: number) {
    return this.http.delete(this.baseUrl + 'manifest/izbrisiKartu/' + id);
  }
  deleteManifestation(id: number) {
    return this.http.delete(
      this.baseUrl + 'manifest/izbrisiManifestaciju/' + id
    );
  }

  getComment(id: number): Observable<Komentar> {
    return this.http.get<Komentar>(this.baseUrl + 'manifest/getComment/' + id);
  }

  getAllManifestations(
    manifestationParams?: ManifestationParams
  ): Observable<Manifestation[]> {
    let params = new HttpParams();
    if (manifestationParams !== null && manifestationParams !== undefined) {
      params = params.append('name', manifestationParams.name);
      params = params.append('location', manifestationParams.location);
      params = params.append('eventPlace', manifestationParams.eventPlace);
      params = params.append('type', manifestationParams.type);
      // params = params.append('eventDate', manifestationParams.eventDate.toString());
      params = params.append(
        'minPrice',
        manifestationParams.minPrice.toString()
      );
      params = params.append(
        'maxPrice',
        manifestationParams.maxPrice.toString()
      );
    }

    return this.http.get<Manifestation[]>(
      this.baseUrl + 'manifest/allManifestations',
      { params }
    );
  }

  izmeniAktivnost(id: number) {
    return this.http.get(this.baseUrl + 'manifest/izmeniAktivnost/' + id);
  }

  getAllPlaces(): Observable<EventPlace[]> {
    return this.http.get<EventPlace[]>(this.baseUrl + 'manifest/getPlaces');
  }

  addManifestation(newManifestation: ManifestAdd) {
    return this.http.post(
      this.baseUrl + 'manifest/addManifestation',
      newManifestation
    );
  }
  getTicketReservation(id: number): Observable<ReservedTicket[]> {
    return this.http.get<ReservedTicket[]>(
      this.baseUrl + 'manifest/getticketReservation/' + id
    );
  }
}
