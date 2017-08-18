import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserService } from "./user.service";
import { LandingComponent } from './landing/landing.component';
import { NewApptComponent } from './new-appt/new-appt.component';
import { OrderbyPipe } from './orderby.pipe';
import { FiltersearchPipe } from './filtersearch.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    NewApptComponent,
    OrderbyPipe,
    FiltersearchPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
