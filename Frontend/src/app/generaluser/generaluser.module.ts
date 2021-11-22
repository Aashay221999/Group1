import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeneralUserRoutingModule } from './generaluser-routing.module';


import { HomeComponent } from './home/home.component';
import { MyCalenderComponent } from './my-calender/my-calender.component';
import { BookAppointmentComponent } from './book-appointment/book-appointment.component';
import { CreateNewCalenderComponent } from './create-new-calender/create-new-calender.component';
import { CalenderdetailComponent } from './calenderdetail/calenderdetail.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { AppentrybycalenderComponent } from './appentrybycalender/appentrybycalender.component';
import { BookentryComponent } from './bookentry/bookentry.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';




@NgModule({
  declarations: [
    HomeComponent,
    MyCalenderComponent,
    BookAppointmentComponent,
    CreateNewCalenderComponent,
    CalenderdetailComponent,
    PagenotfoundComponent,
    AppentrybycalenderComponent,
    BookentryComponent,
  ],
  imports: [
    CommonModule,
    GeneralUserRoutingModule,
    //BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    //BrowserAnimationsModule,
  ],
  bootstrap: [HomeComponent]
})
export class GeneraluserModule { }
