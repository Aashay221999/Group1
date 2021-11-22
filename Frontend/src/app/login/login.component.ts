import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterComponent } from '../register/register.component';
import { UserService } from '../user.service';
import { AppointmentEntity } from '../AppointmentEntity';
import { AppointmentCalendar } from '../AppointmentCalendar';
import { User } from '../User';
import { PortService } from '../port.service';
import { ServerService } from '../server.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { IsAdminService } from '../is-admin.service';
import { AuthService } from '../auth.service';
import { ThrowStmt } from '@angular/compiler';
import { AlertService } from '../alert.service';
import { TokenService } from '../token.service';
import { SharedUsersAdminService } from '../shared-users-admin.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string ="";
  password: string ="" ;
  errorMessage : string = "";

  constructor(private adminUsers:SharedUsersAdminService ,private token:TokenService, private alertService:AlertService, private userService:UserService, private router: Router, private portNumber:PortService, private serverComm:ServerService, private isAdminService:IsAdminService, private auth:AuthService) { }

  ngOnInit(): void {

  }

  getusers()
  {
    console.log("lalaslas");
    
    this.serverComm.getUser(this.username)
    .pipe(catchError (error => {
      this.alertService.error("User Not Found. Please Try Again");
      return of([]);
    }))
    .subscribe(user=>{
        console.log("HERE")
        console.log(user);
        if (user == null)
        {
           this.alertService.error("User Not Found. Please Try Again");
           return;
        }
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
          console.log("printing user");
          console.log(userObject);
          
          
          userObject.setIsLoggedIn(true);
          console.log("setting islogged in");
          
          this.auth.setIsAdmin(true);
          this.userService.setUser(userObject);
          this.alertService.success('Login successful', true);
          if (userObject.getIsAdmin() == true)
            {
              
              this.isAdminService.setIsAdmin(true);
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
              this.router.navigate(['admin/adminuser']);
            }
            else
            {
              this.isAdminService.setIsAdmin(false);
              this.goTohome();
            }
        }
    })
    
  }

  login(){


    //logic to check for authentication
    this.serverComm.authenticate(this.username, this.password).subscribe(response=>{
      console.log(response);
      this.token.setToken(response.token);
      this.getusers();
    })

  }
  
 goTohome(){
    this.router.navigate(['guser/home']);
  }

  register(){
    //register component open
    this.router.navigate(['register']);
  }

}
