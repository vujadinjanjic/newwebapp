import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ManifestationComponent } from './manifestation/manifestation.component';
import { ManifestationsListComponent } from './manifestations-list/manifestations-list.component';
import { AuthGuard } from './_guards/auth.guard';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { AdminsListComponent } from './admins-list/admins-list.component';
import { EditProfileResolver } from './_resolvers/editprofile-resolver';
import { TicketListComponent } from './ticket-list/ticket-list.component';
import { ReservedTicketComponent } from './reserved-ticket/reserved-ticket.component';

export const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'manifestations', component: ManifestationsListComponent },
  {
    path: 'editprofile',
    component: EditProfileComponent,
    resolve: { user: EditProfileResolver },
  },
  {path: 'tickets', component: TicketListComponent},
  { path: 'adminslist', component: AdminsListComponent },
  { path: 'reservedTicketList', component: ReservedTicketComponent },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];
