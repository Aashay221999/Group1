import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ServerService } from '../../server.service';
import { DatetimeslotService } from '../../datetimeslot.service';
import { UserService } from '../../user.service';
import { User } from '../../User';

import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { AppointmentEntity } from 'src/app/AppointmentEntity';
import { AppointmentCalendar } from 'src/app/AppointmentCalendar';
import { AlertService } from 'src/app/alert.service';

@Component({
  selector: 'app-bookentry',
  templateUrl: './bookentry.component.html',
  styleUrls: ['./bookentry.component.css']
})
export class BookentryComponent implements OnInit {
  bookEntryForm: FormGroup;
  error: string = "";
  timeslot:number;
  userID:number;
  userName:string;


  constructor(private alertService:AlertService, private router: Router,private userService:UserService,  private serverComm:ServerService,private timeslotdate:DatetimeslotService) {
    
    this.bookEntryForm = new FormGroup({
            description: new FormControl('', Validators.required)
        });
    this.userService.getUser().subscribe((user)=>{
      this.userID = user.getuserID();
      this.userName = user.getUserName();
    })

   }


  ngOnInit(): void {
  }


  public onSubmit():void {
   let aeID:number = Math.floor(100000 + Math.random() * 900000);
      this.serverComm.getAPPEIDs().subscribe(response=>{
        if (response == null || response.length == 0)
        {

        }
        else
        {
          let flag = true;
          while(flag)
          {
            if (response.indexOf(aeID) == -1 )
            {
              flag = false;
            }
            else
            {
              aeID = Math.floor(100000 + Math.random() * 900000);
            }
          } 
        }
      })
    
    this.serverComm.addAppointmentEntry(this.userID, this.timeslotdate.getAcid(), aeID,this.timeslotdate.getDate(), false, this.timeslotdate.getTimeslot(), this.bookEntryForm.value.description)
    .subscribe((response)=>{
      if(response == true)
      {
        console.log("Appointment Entry Inserted");
        this.alertService.success('Appointment Entry Created', true);
        this.serverComm.getUser(this.userName)
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
            let userObject : User = new User(user.userID, user.username, user.mobileNumber, 
                new Date(user.doB), user.email, user.isAdmin, listAppointmentEntries, listAppointmentCalendars);
            this.userService.setUser(userObject);
            this.router.navigate(['guser/home']);
        }
      })
    }
  })
  }
}