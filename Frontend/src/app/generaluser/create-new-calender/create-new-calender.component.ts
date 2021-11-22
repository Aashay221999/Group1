import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AppointmentCalendar } from '../../AppointmentCalendar';
import { ServerService } from '../../server.service';
import { UserService } from '../../user.service';
import { Router } from '@angular/router';
import { User } from '../../User';
import { AppointmentEntity } from '../../AppointmentEntity';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { AlertService } from 'src/app/alert.service';

@Component({
  selector: 'app-create-new-calender',
  templateUrl: './create-new-calender.component.html',
  styleUrls: ['./create-new-calender.component.css']
})
export class CreateNewCalenderComponent implements OnInit {
  
  
  profileForm = new FormGroup({
    type: new FormControl(''),
    location: new FormControl(''),
    desc: new FormControl('')
  });

  type = [
    "DOCTOR",
    "SHOP",
    "entrepreneur",
  ]
  selected = "----"
  uid=0;
  uname="";
  constructor(private alertService:AlertService, private router:Router,private ss:ServerService, private us:UserService) {
      this.us.getUser().subscribe(user=>{
        console.log("im hree getting username");
        console.log(user);
        
        
      this.uid=user.getuserID();
      this.uname=user.getUserName();
      });

    }

    onSubmit(data: any) {
      let acID:number = Math.floor(100000 + Math.random() * 900000);
      this.ss.getAPPCIDs().subscribe(response=>{
        if (response == null || response.length == 0)
        {

        }
        else
        {
          let flag = true;
          while(flag)
          {
            if (response.indexOf(acID) == -1 )
            {
              flag = false;
            }
            else
            {
              acID = Math.floor(100000 + Math.random() * 900000);
            }
          } 
        }
      })
      this.ss.addAppointmentCalendar(acID,this.uid,data.type,data.location,data.desc).subscribe(response => {
        console.log("AppointmentCalendar Created")
        this.alertService.success('Appointment Calendar Created', true);
        console.log(response);
        this.ss.getUser(this.uname)
        .pipe(catchError (error => {
          return of([]);
          }))
      .subscribe(user=>{
        if(user.length == 0)
        {

        }
        else
        {         
          let listAppointmentEntries : AppointmentEntity[] = [];
          if (user.appointmentEntries.length!=0)
          {
            for(let i = 0; i<user.appointmentEntries.length; i++)
            {
              let date:Date = new Date(user.appointmentEntries[i].date);
              listAppointmentEntries.push(new AppointmentEntity(user.appointmentEntries[i].aeID,
                user.appointmentEntries[i].appointmentCalendarID,user.appointmentEntries[i].ownerid, date, 
                user.appointmentEntries[i].isApproved, user.appointmentEntries[i].timeSlot, 
                user.appointmentEntries[i].apointeeid, user.appointmentEntries[i].description));
            }
          }
          let listAppointmentCalendars : AppointmentCalendar[] = [];
          if(user.appointmentCalendars.length != 0)
          {
            for(let i = 0; i<user.appointmentCalendars.length; i++)
            {
              let listAppEntries : AppointmentEntity[] = [];
              if (user.appointmentCalendars[i].listAppointmentEntries.length != 0)
              {
                for(let j = 0; j<user.appointmentCalendars[i].listAppointmentEntries.length; j++)
                {
                  listAppEntries.push(new AppointmentEntity(user.appointmentCalendars[i].listAppointmentEntries[j].aeID,
                  user.appointmentCalendars[i].listAppointmentEntries[j].appointmentCalendarID,user.appointmentCalendars[i].listAppointmentEntries[j].ownerid, new Date(user.appointmentCalendars[i].listAppointmentEntries[j].date), 
                  user.appointmentCalendars[i].listAppointmentEntries[j].isApproved, user.appointmentCalendars[i].listAppointmentEntries[j].timeSlot, 
                  user.appointmentCalendars[i].listAppointmentEntries[j].apointeeid, user.appointmentCalendars[i].listAppointmentEntries[j].description));
                }
              }
              listAppointmentCalendars.push(new AppointmentCalendar(user.appointmentCalendars[i].acID, user.appointmentCalendars[i].ownername, user.appointmentCalendars[i].type, user.appointmentCalendars[i].location, user.appointmentCalendars[i].description, listAppEntries));
            }
          }
          let userObject : User = new User(user.userID, user.userName, user.mobileNumber, 
              new Date(user.doB), user.email, user.isAdmin, listAppointmentEntries, listAppointmentCalendars);
          this.us.setUser(userObject);
          this.router.navigate(['guser/myCal']);
        }
    })
        
  });  
  }

  ngOnInit(): void {

  }
  

}
