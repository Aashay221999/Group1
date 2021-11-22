import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminUserComponent } from './admin-user/admin-user.component';
import { AdminCalComponent } from './admin-cal/admin-cal.component';
import { AdminEntryComponent } from './admin-entry/admin-entry.component';
import { AdminBookedEntryComponent } from './admin-booked-entry/admin-booked-entry.component';

const routes: Routes = [
  {
    path:'adminuser',
    component:AdminUserComponent,
    children:
    [
      {
        path:'admincal/:id',
        component:AdminCalComponent,
        children:
        [
          {
            path:'adminentry/:userid/:acid',
            component:AdminEntryComponent
          }
        ]
      },
      {
        path:'adminentry/:id',
        component:AdminBookedEntryComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
