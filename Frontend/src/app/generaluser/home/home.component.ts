import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user.service';
import { AppointmentEntity } from '../../AppointmentEntity';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { User } from '../../User';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  username:string="";// change username to userID
  appEntryList:Array<AppointmentEntity>=[];
  userID:number=0;
  userObject:User;
  islogged:boolean = false;

  constructor(private userService:UserService, private auth:AuthService, private router:Router) {

    console.log("im here in constr");
    this.auth.getIsAdmin().subscribe(response=>{
       console.log("sssssss");
       console.log(response);
       
       this.islogged = response;
     })
     if (this.islogged == false)
     {
       this.router.navigate(['']);
     }
    this.userService.getUser().subscribe(user=>{ 
    
      console.log("im here in getuser");
      console.log(user);
      this.userObject = user;
      this.userID = user.getuserID();
      this.username = user.getUserName();
      this.appEntryList = user.getListMyBookedAppointmentEntries();    
     })
     

   }

  ngOnInit(): void {
    // if(this.userObject.getIsLoggedIn()==false)
    // {
    //   this.router.navigate(['gUser/login']);
    // }
  }

}
