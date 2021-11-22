import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminUserComponent } from './admin-user/admin-user.component';
import { AdminCalComponent } from './admin-cal/admin-cal.component';
import { AdminEntryComponent } from './admin-entry/admin-entry.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminBookedEntryComponent } from './admin-booked-entry/admin-booked-entry.component';




@NgModule({
  declarations: [
    AdminUserComponent,
    AdminCalComponent,
    AdminEntryComponent,
    AdminBookedEntryComponent
  ],
  imports: [
    CommonModule,
    // RouterModule,
    AdminRoutingModule, 
    // BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    //BrowserAnimationsModule,
  ],
  bootstrap: [AdminUserComponent]
})
export class AdminModule { }
