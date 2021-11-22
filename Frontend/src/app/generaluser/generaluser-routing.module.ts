import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { MyCalenderComponent } from './my-calender/my-calender.component';
import { CalenderdetailComponent } from './calenderdetail/calenderdetail.component';
import { BookAppointmentComponent } from './book-appointment/book-appointment.component';
import { AppentrybycalenderComponent } from './appentrybycalender/appentrybycalender.component';
import { BookentryComponent } from './bookentry/bookentry.component';
import { CreateNewCalenderComponent } from './create-new-calender/create-new-calender.component';

import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';



const routes: Routes = [
  
  { 
    path:'',
    component:HomeComponent
  },
  {
    path:'home',
    component:HomeComponent
  },
  {
    path:'myCal',
    component:MyCalenderComponent,
    children:[
      {
        path:'calendardetails/:AcID',
        component:CalenderdetailComponent
      }
    ]
  },
  {
    path:'bookApp',
    component:BookAppointmentComponent,
    children:[
      {
        path: 'appentrybycal/:id',
        component:AppentrybycalenderComponent
      },
      {
        path:'bookentry',
        component:BookentryComponent
      }
    ]
  },
  {
    path: 'createCal',
    component:CreateNewCalenderComponent
  },  
  {
    path: '**',
    component:PagenotfoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GeneralUserRoutingModule { }
