import { Injectable } from '@angular/core';
import { PortService } from './port.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './User';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserService } from './user.service';
import { AppointmentEntity } from './AppointmentEntity';
import { AppointmentCalendar } from './AppointmentCalendar';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  portNo:string;
  jwtToken:string;
  header:any;
  constructor(private tokenService:TokenService, private portNumber:PortService, private http:HttpClient, private userService:UserService) {
    this.portNo = portNumber.getPortNumber();
    this.tokenService.getToken().subscribe(value=>{
      console.log("im here");
      console.log(value);
      
      
      this.jwtToken = value;
      console.log("im here2");
      console.log(this.jwtToken);
      
      this.header = new HttpHeaders().set('content-type', 'application/json')
      .set('Authorization', 'Bearer ' + this.jwtToken);
      console.log("im here3");
      console.log(this.header);
      
    })
   }

  public authenticate(username:string, password:string):Observable<any>
  {
    let jsonObject = {
      'username':username,
      'password':password
    }
    return this.http.post('http://localhost:'+ this.portNo+ "/authenticate", jsonObject)
  } 

  public getUser(userName:string):Observable<any>
  {
    return this.http.get<User>('http://localhost:'+ this.portNo+ "/users/"+userName)
    .pipe(
      catchError(error => {
        console.log(error);
        return throwError(error);
        
      })
    );
  }

  public getUserIDs():Observable<any>
  {
    return this.http.get<number[]>('http://localhost:'+ this.portNo+ "/userids")
  }
  public getAPPCIDs():Observable<any>
  {
    return this.http.get<number[]>('http://localhost:'+ this.portNo+ "/appointmentcalendars", {
      headers: this.header
    })
  }

  public getAPPEIDs():Observable<any>
  {
    return this.http.get<number[]>('http://localhost:'+ this.portNo+ "/appointmententries", {
      headers: this.header
    })
  }
  
  public getUserNames():Observable<any>
  {
    return this.http.get<string[]>('http://localhost:'+ this.portNo+ "/usernames");
  }



  public getUsers():Observable<any>
  {
    return this.http.get<User>('http://localhost:'+ this.portNo+ "/admin/users", {
      headers: this.header
    })
  }

  public addUser(userID:number,userName:string, mobileNumber:string, DoB:string, email:string, password:string) : Observable<any>
  {
    let jsonObject = {
      'userID':userID,
      'username':userName,
      'mobileNumber':mobileNumber,
      'DoB':DoB,
      'email':email,
      'isAdmin':false,
      'password':password
    }
    return this.http.post('http://localhost:'+ this.portNo+'/reg/'+DoB, jsonObject)
  }

  public getAppointmentEntriesByOwner(userID:number):Observable<any>
  {
    return this.http.get<AppointmentEntity[]>('http://localhost:'+ this.portNo+"/home/"+ userID.toString(), {
      headers: this.header
    });
  }

  public addAppointmentCalendar(acID:number,userID:number, type:string, location:string,description:string):Observable<any>
  {
    let jsonObject = {
      'acID':acID,
      'userID':userID,
      'type':type,
      'location':location,
      'description':description
    }
    console.log(jsonObject);
    
    return this.http.post('http://localhost:'+ this.portNo+'/ac/'+userID.toString()+'/createacform', jsonObject, {
      headers: this.header
    });
  }

  public getAppointmentCalendar(userID:number):Observable<any>
  {
    return this.http.get<AppointmentCalendar[]>('http://localhost:'+ this.portNo+"/ac/"+ userID.toString(), {
      headers: this.header
    });
  }

  public deleteAppointmentCalendarByAcID(acID:number):Observable<any>
  {
    return this.http.post('http://localhost:'+ this.portNo+"/ac/"+ acID.toString(),null, {
      headers: this.header
    });
  }

  public deleteUserByUserID(userID:number):Observable<any>
  {
    return this.http.post('http://localhost:'+this.portNo + '/admin/delete/' + userID.toString(), null,{
      headers: this.header
    });
  }

  public getApprovedAppointmentEntriesByAcID(acID:number):Observable<any>
  {
    return this.http.get<AppointmentEntity[]>('http://localhost:'+ this.portNo+"/ac/"+ acID.toString()+'/approved', {
      headers: this.header
    });
  }

  public getAppointmentEntriesByAcID(acID:number):Observable<any>
  { 
    return this.http.get<AppointmentEntity[]>('http://localhost:'+ this.portNo+"/ac/appEL/"+ acID.toString(), {
      headers: this.header
    });
  }


  public getNotApprovedAppointmentEntriesByAcID(acID:number):Observable<any>
  {
    return this.http.get<AppointmentEntity[]>('http://localhost:'+ this.portNo+"/ac/"+ acID.toString()+'/notapproved', {
      headers: this.header
    });
  }
  
  public approveAppointmentEntryByAeID(aeID:number):Observable<any>
  {
    return this.http.post('http://localhost:'+ this.portNo+'/ac/ae/approve/'+aeID.toString(),null, {
      headers: this.header
    });
  }
  public rejectAppointmentEntryByAeID(aeID:number, acID:number):Observable<any>
  {
    return this.http.post('http://localhost:'+ this.portNo+'/ac/reject/' +aeID.toString(), null,{
      headers: this.header
    });
  }

  public getAppointmentCalendarBySearch(searchText:string, searchCriteria:string):Observable<any>
  {
    return this.http.get<AppointmentCalendar[]>('http://localhost:'+ this.portNo + '/book/search/'+ searchText + '/' + searchCriteria, {
      headers: this.header
    });
  }
  public getUnbookedAppointmentEntitiesByAcIDAndDate(acID:number, date:string):Observable<any>
  {
    return this.http.get<number[]>('http://localhost:'+ this.portNo + '/book/'+acID+'/'+date, {
      headers: this.header
    });
  }

  public addAppointmentEntry(userID:number, acID:number,aeID:number,date:string, isApproved:boolean, timeSlot:number,description:string):Observable<any>
  {
    let jsonObject = {
      'aeID':aeID,
      'date':date,
      'isApproved':false,
      'timeSlot':timeSlot,
      'description':description
    }
    return this.http.post('http://localhost:'+ this.portNo+'/book/'+userID.toString()+'/'+ acID.toString() +'/createaeform', jsonObject, {
      headers: this.header
    });
  }


}
