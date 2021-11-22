import { ServerService } from '../../server.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppointmentCalendar } from '../../AppointmentCalendar';
import { UserService } from '../../user.service';
import { User } from '../../User';
import { AuthService } from 'src/app/auth.service';
import { AlertService } from 'src/app/alert.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { AppointmentEntity } from 'src/app/AppointmentEntity';


@Component({
  selector: 'app-my-calender',
  templateUrl: './my-calender.component.html',
  styleUrls: ['./my-calender.component.css']
})
export class MyCalenderComponent implements OnInit {

  appCalenderList:Array<AppointmentCalendar>=[];
  userID:number=0;
  userName:string;
  islogged:boolean = false;
  

  constructor(private alertService:AlertService, private router:Router,private ss:ServerService,private us:UserService, private auth:AuthService) {   
    this.us.getUser().subscribe(user=>{ 
             
      this.userID = user.getuserID();
      this.userName = user.getUserName();
      this.appCalenderList = user.getListMyAppointmentCalendars();    
     })
    this.auth.getIsAdmin().subscribe(response=>{
       this.islogged = response;
     })
     if (this.islogged == false)
     {
       this.router.navigate(['']);
     }
} 

  ngOnInit(): void {
    
  }
  createCal(){
  
    this.router.navigate(['guser/createCal']);
    
  }
  delete(acid:number)
  {
    this.ss.deleteAppointmentCalendarByAcID(acid).subscribe(response=>{
      this.alertService.success('Appointment Calendar Deleted', true);

      this.ss.getUser(this.userName)
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
            this.us.setUser(userObject);
        }
      })




    })
  }


}


