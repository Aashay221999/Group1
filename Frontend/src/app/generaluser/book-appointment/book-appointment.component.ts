
import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { AppointmentCalendar } from 'src/app/AppointmentCalendar';
import { DatetimeslotService } from 'src/app/datetimeslot.service';
import { UserService } from 'src/app/user.service';
import { PortService } from 'src/app/port.service';
import { ServerService } from 'src/app/server.service';
import { AppointmentEntity } from 'src/app/AppointmentEntity';
import { AuthService } from 'src/app/auth.service';



@Component({
  selector: 'app-book-appointment',
  templateUrl: './book-appointment.component.html',
  styleUrls: ['./book-appointment.component.css']
})
export class BookAppointmentComponent implements OnInit {
  search : string ="";
  searchby:string="Username";
  dateinput:string="";
  searchedCalenders:Array<AppointmentCalendar>=[];
  freeTimeSlots:Array<string>=[];
  timeSlotSelected:string="";
  acidSelected:number;
  islogged:boolean = false;
  constructor(private auth:AuthService, private datetimeslot:DatetimeslotService, private userService:UserService, private router: Router, private portNumber:PortService, private serverComm:ServerService) 
  {
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
  get freeTimeSlotsArray()
  {
    return this.freeTimeSlots;
  }
  public onSubmitTimeSlot(acid:number)
  {

    let numberedTimeslot = 0;
    if (this.timeSlotSelected == "9 am - 10 am")
    {
      numberedTimeslot = 0;
    }
    else if (this.timeSlotSelected == "10 am - 11 am")
    {
      numberedTimeslot = 1;
    }
    else if (this.timeSlotSelected == "11 am - 12 pm")
    {
      numberedTimeslot = 2;
    }
    else if (this.timeSlotSelected == "12 pm - 1 pm")
    {
      numberedTimeslot = 3;
    }
    else if (this.timeSlotSelected == "2 pm - 3 pm")
    {
      numberedTimeslot = 4;
    }
    else if (this.timeSlotSelected == "3 pm - 4 pm")
    {
      numberedTimeslot = 5;
    }
    else if (this.timeSlotSelected == "4 pm - 5 pm")
    {
      numberedTimeslot = 6;
    }
    else if (this.timeSlotSelected == "5 pm - 6 pm")
    {
      numberedTimeslot = 7;
    }
    this.datetimeslot.setDate(this.dateinput);
    this.datetimeslot.setTimeslot(numberedTimeslot);
    this.datetimeslot.setAcid(this.acidSelected);
    this.router.navigate(['guser/bookApp/bookentry'])
  }
  public onSubmitDate(acid: number) {

    this.acidSelected = acid;
    this.serverComm.getUnbookedAppointmentEntitiesByAcIDAndDate(acid, this.dateinput).subscribe((response)=>{
      this.freeTimeSlots = [];
        for(let i = 0;i<response.length;i++)
        {
          if(response[i] == 0)
          {
              this.freeTimeSlots.push("9 am - 10 am");
          }
          else if(response[i] == 1)
          {
              this.freeTimeSlots.push("10 am - 11 am");
          }
          else if(response[i] == 2)
          {
              this.freeTimeSlots.push("11 am - 12 pm");
          }
          else if(response[i] == 3)
          {
              this.freeTimeSlots.push("12 pm - 1 pm");
          }
          else if(response[i] == 4)
          {
            this.freeTimeSlots.push("2 pm - 3 pm");
          }
          else if(response[i] == 5)
          {
             this.freeTimeSlots.push("3 pm - 4 pm");
          }
          else if(response[i] == 6)
          {
            this.freeTimeSlots.push("4 pm - 5 pm");
          }
          else if(response[i] == 7)
          {
            this.freeTimeSlots.push("5 pm - 6 pm");
          }
        }      
      }
    )
    
  }
  searchfn(){
    this.serverComm.getAppointmentCalendarBySearch(this.search,this.searchby).subscribe(calenders=>{
      console.log(calenders);
      let listAppointmentCalendars : AppointmentCalendar[] = [];
          if(calenders.length != 0)
          {
            for(let i = 0; i<calenders.length; i++)
            {
              let listAppEntries : AppointmentEntity[] = [];
              if (calenders[i].listAppointmentEntries.length != 0)
              {
                for(let j = 0; j<calenders[i].listAppointmentEntries.length; j++)
                {
                  listAppEntries.push(new AppointmentEntity(calenders[i].listAppointmentEntries[j].aeID,
                  calenders[i].listAppointmentEntries[j].appointmentCalendarID,calenders[i].listAppointmentEntries[j].ownerid, new Date(calenders[i].listAppointmentEntries[j].date), 
                  calenders[i].listAppointmentEntries[j].isApproved, calenders[i].listAppointmentEntries[j].timeSlot, 
                  calenders[i].listAppointmentEntries[j].apointeeid, calenders[i].listAppointmentEntries[j].description));
                }
              }
              listAppointmentCalendars.push(new AppointmentCalendar(calenders[i].acID, calenders[i].ownername, calenders[i].type, calenders[i].location, calenders[i].description, listAppEntries));
            }
          }
      
      this.searchedCalenders = listAppointmentCalendars;
    })
  }

}
