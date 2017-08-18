import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { NewApptComponent } from './new-appt/new-appt.component';

const routes: Routes = [
  { path: '#new-appt', component: NewApptComponent },
  { path: '', component: LandingComponent , pathMatch: 'full' },
  // { path: '', pathMatch: "full", redirectTo: "/login"}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
