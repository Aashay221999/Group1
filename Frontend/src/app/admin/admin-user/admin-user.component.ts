import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/User';
import { ServerService } from 'src/app/server.service';
import { AppointmentEntity } from 'src/app/AppointmentEntity';
import { AppointmentCalendar } from 'src/app/AppointmentCalendar';
import { ActivatedRoute } from '@angular/router'; 
import { Router } from '@angular/router';
import { ShareAdminUserService } from 'src/app/share-admin-user.service';
import { AuthService } from 'src/app/auth.service';
import { SharedUsersAdminService } from 'src/app/shared-users-admin.service';

@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.css']
})
export class AdminUserComponent implements OnInit {

  users:Array<User> = [];
  islogged:boolean = false;
  constructor(private adminUsers:SharedUsersAdminService, private auth:AuthService, private sharedUser:ShareAdminUserService,private serverComm:ServerService, private router:Router, private activatedRoute:ActivatedRoute) {
    this.auth.getIsAdmin().subscribe(response=>{
       this.islogged = response;
     })
     if (this.islogged == false)
     {
       this.router.navigate(['']);
     }
    this.adminUsers.getSharedUsers().subscribe(usersArray=>
      {
        this.users = usersArray;
      })
   }


  getAppointmentCalenders(userID:number)
  {
    this.router.navigate(['admincal', userID], {relativeTo: this.activatedRoute});
  }
  getAppointmentEntries(userID:number)
  {
    this.router.navigate(['adminentry', userID], {relativeTo: this.activatedRoute});
    for (let i = 0; i < this.users.length; i ++)
    {
      if (this.users[i].getuserID() == userID)
      {
        this.sharedUser.setSharedUser(this.users[i]);
      }
    }
  }
  ngOnInit(): void {
  }

  public delete(userID:number)
  {
    this.serverComm.deleteUserByUserID(userID).subscribe(reponse=>{
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
          this.adminUsers.setSharedUser(usersObtained);
        }
      })
    })
    
  }

}
