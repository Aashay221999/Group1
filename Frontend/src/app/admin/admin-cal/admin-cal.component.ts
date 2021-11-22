import { Component, OnInit } from '@angular/core';
import { AppointmentCalendar } from 'src/app/AppointmentCalendar';
import { ServerService } from 'src/app/server.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ShareAdminUserService } from 'src/app/share-admin-user.service';
import { User } from 'src/app/User';
import { SharedUsersAdminService } from 'src/app/shared-users-admin.service';
import { AppointmentEntity } from 'src/app/AppointmentEntity';

@Component({
  selector: 'app-admin-cal',
  templateUrl: './admin-cal.component.html',
  styleUrls: ['./admin-cal.component.css']
})
export class AdminCalComponent implements OnInit {
  appointmentCalendars:Array<AppointmentCalendar> = [];
  userObject:User;
  userID:number;
  constructor(private sharedUser:SharedUsersAdminService, private router:Router, private activatedRoute:ActivatedRoute,private serverComm:ServerService) {
    this.activatedRoute.params.subscribe((newparams)=>{
        this.userID=parseInt(newparams["id"]);
      })
    this.sharedUser.getSharedUsers().subscribe(users=>
      {
        for(let user of users)
        {
          if (user.getuserID()==this.userID)
          {
            this.userObject = user;
          }
        }
      })
    this.appointmentCalendars = this.userObject.getListMyAppointmentCalendars();
    console.log(this.appointmentCalendars);
  }

  ngOnInit(): void {
  }
  
  public delete(acID:number)
  {
    this.serverComm.deleteAppointmentCalendarByAcID(acID).subscribe(reponse=>{
      console.log("Deleting");
      console.log(reponse);
      this.serverComm.getUsers().subscribe(users=>{
        let usersArray:Array<User>;
        if(users.length != 0)
        {
          let usersObtained : Array<User> = [];
          for(let k = 0; k < users.length; k ++)
          {
            let listAppointmentEntries : AppointmentEntity[] = [];
            if (users[k].appointmentEntries.length!=0)
            {
              for(let i = 0; i<users[k].appointmentEntries.length; i++)
              {
                let date:Date = new Date(users[k].appointmentEntries[i].date);
                listAppointmentEntries.push(new AppointmentEntity(users[k].appointmentEntries[i].aeID,
                  users[k].appointmentEntries[i].appointmentCalendarID,users[k].appointmentEntries[i].ownerid, date, 
                  users[k].appointmentEntries[i].isApproved, users[k].appointmentEntries[i].timeSlot, 
                  users[k].appointmentEntries[i].apointeeid, users[k].appointmentEntries[i].description));
              }
            }
            let listAppointmentCalendars : AppointmentCalendar[] = [];
            if(users[k].appointmentCalendars.length != 0)
            {
              for(let i = 0; i<users[k].appointmentCalendars.length; i++)
              {
                let listAppEntries : AppointmentEntity[] = [];
                if (users[k].appointmentCalendars[i].listAppointmentEntries.length != 0)
                {
                  for(let j = 0; j<users[k].appointmentCalendars[i].listAppointmentEntries.length; j++)
                  {
                    listAppEntries.push(new AppointmentEntity(users[k].appointmentCalendars[i].listAppointmentEntries[j].aeID,
                    users[k].appointmentCalendars[i].listAppointmentEntries[j].appointmentCalendarID,users[k].appointmentCalendars[i].listAppointmentEntries[j].ownerid, new Date(users[k].appointmentCalendars[i].listAppointmentEntries[j].date), 
                    users[k].appointmentCalendars[i].listAppointmentEntries[j].isApproved, users[k].appointmentCalendars[i].listAppointmentEntries[j].timeSlot, 
                    users[k].appointmentCalendars[i].listAppointmentEntries[j].apointeeid, users[k].appointmentCalendars[i].listAppointmentEntries[j].description));
                  }
                }
                listAppointmentCalendars.push(new AppointmentCalendar(users[k].appointmentCalendars[i].acID, users[k].appointmentCalendars[i].ownername, users[k].appointmentCalendars[i].type, users[k].appointmentCalendars[i].location, users[k].appointmentCalendars[i].description, listAppEntries));
              }
            }
            let userObject : User = new User(users[k].userID, users[k].username, users[k].mobileNumber, 
                new Date(users[k].doB), users[k].email, users[k].isAdmin, listAppointmentEntries, listAppointmentCalendars);
            usersObtained.push(userObject);
          }
          this.sharedUser.setSharedUser(usersObtained);
        }
      })

      this.router.navigate(['admin/adminuser']);
    })
    
  }
  

}
