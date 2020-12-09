import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { AuthService } from './_services/auth.service';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { ManifestationComponent } from './manifestation/manifestation.component';
import { AlertifyService } from './_services/alertify.service';
import { ManifestationsListComponent } from './manifestations-list/manifestations-list.component';
import { appRoutes } from './routes';
import { AuthGuard } from './_guards/auth.guard';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { UserService } from './_services/user.service';
import { AdminsListComponent } from './admins-list/admins-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { EditProfileResolver } from './_resolvers/editprofile-resolver';
import { TicketComponent } from './ticket/ticket.component';
import { TicketListComponent } from './ticket-list/ticket-list.component';
import { ReservedTicketComponent } from './reserved-ticket/reserved-ticket.component';
import { AddManifestationComponent } from './add-manifestation/add-manifestation/add-manifestation.component';
import { EditManifestationDialogComponent } from './add-manifestation/edit-manifestation-dialog/edit-manifestation-dialog.component';
import { MakeSellerDialogComponent } from './add-manifestation/make-seller-dialog/make-seller-dialog.component';
import { ReservationDialogComponent } from './add-manifestation/reservation-dialog/reservation-dialog.component';
import { ManifestService } from './_services/manifest.service';


@NgModule({
  declarations: [			
    AppComponent,
    NavComponent,
    HomeComponent,
    RegisterComponent,
    ManifestationComponent,
    AddManifestationComponent,
    ManifestationsListComponent,
    EditProfileComponent,
    MakeSellerDialogComponent,
    AdminsListComponent,
    TicketComponent,
    TicketListComponent,
    ReservationDialogComponent,
    ReservedTicketComponent,
    EditManifestationDialogComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    MaterialModule,
  ],
  providers: [
    AuthService,
    AlertifyService,
    AuthGuard,
    UserService,
    ManifestService,
    EditProfileResolver,
  ],
  bootstrap: [AppComponent],
  entryComponents: [MakeSellerDialogComponent, AddManifestationComponent],
})
export class AppModule {}
