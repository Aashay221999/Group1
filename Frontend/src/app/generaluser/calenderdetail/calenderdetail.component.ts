import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { AppointmentCalendar } from '../../AppointmentCalendar';
import { UserService } from '../../user.service';
import { ServerService } from '../../server.service';
import { User } from '../../User';
import { AppointmentEntity } from '../../AppointmentEntity';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-calenderdetail',
  templateUrl: './calenderdetail.component.html',
  styleUrls: ['./calenderdetail.component.css']
})
export class CalenderdetailComponent implements OnInit {
  acID:number = 0;  
  appointmentCalender:AppointmentCalendar;
  loggedUser:User;

  constructor(private router:Router, private activatedRoute:ActivatedRoute,private us:UserService, private serverComm:ServerService) {
    this.activatedRoute.params.subscribe((newparams)=>{
        this.acID=parseInt(newparams["AcID"]);
      })
    this.us.getUser().subscribe(user=>{ 
    
      this.loggedUser = user;
      let listAppointmentCalendar:Array<AppointmentCalendar> = [];
      listAppointmentCalendar = user.getListMyAppointmentCalendars(); 
      for(let i = 0; i<listAppointmentCalendar.length; i++)
      {
        if(listAppointmentCalendar[i].getAcID() == this.acID)
        {
          this.appointmentCalender = listAppointmentCalendar[i];
          break;
        }
      }
     })
    

  }
  
  public approve(AeID:number)
  {
    this.serverComm.approveAppointmentEntryByAeID(AeID).subscribe((response)=>{
      console.log(response);
      this.serverComm.getUser(this.loggedUser.getUserName())
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
  public delete(AeID:number)
  {
    this.serverComm.rejectAppointmentEntryByAeID(AeID, this.acID).subscribe(reponse=>{
      console.log("Deleting");
      console.log(reponse);
      this.serverComm.getUser(this.loggedUser.getUserName())
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

  ngOnInit(): void {
  }

}
