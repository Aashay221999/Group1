import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ServerService } from '../server.service';
import { AlertService } from '../alert.service';
import { userNamVal } from './usernameUniqueTest';
// import * as bcrypt from 'bcrypt';
// import * as shajs from 'sha.js';
// // import { bcrypt } from 'bcryptjs'
// // const bcrypt = require('bcryptjs');

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  error: string = "";
  constructor(private router: Router, private serverComm:ServerService,private alertService:AlertService) {
    let usernamesObtained: Array<string> = [];
    this.serverComm.getUserNames().subscribe(response=>{
      console.log(response);
      for (let i = 0; i <response.length; i ++)
      {
        usernamesObtained.push(response[i]);
      }
    })
    
    this.registerForm = new FormGroup({
            username: new FormControl('', [Validators.required, userNamVal(usernamesObtained)]),
            password: new FormControl('', [Validators.required, Validators.minLength(6)]),
            email: new FormControl('', [Validators.required, Validators.email]),
            mobile: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
            dob :new FormControl('', Validators.required)
        });
        // let salt = bcrypt.bcryptjs.hashSync('Pass@123', 10);
        // // let pass = bcrypt.hashSync('Pass@123', 10);
        // // console.log(pass);
        // console.log(bcrypt.compare('Pass@123',salt));

        
   }
    

  ngOnInit(): void {
  }
  
  public onSubmit():void {
   
    let userID:number = Math.floor(100000 + Math.random() * 900000);
    this.serverComm.getUserIDs().subscribe(response=>{
      if (response == null || response.length == 0)
      {

      }
      else
      {
        let flag = true;
        while(flag)
        {
          if (response.indexOf(userID) == -1 )
          {
            flag = false;
          }
          else
          {
            userID = Math.floor(100000 + Math.random() * 900000);
          }
        } 
      }
    })




    this.serverComm.addUser(userID, this.registerForm.value.username, 
        this.registerForm.value.mobile, this.registerForm.value.dob, this.registerForm.value.email, this.registerForm.value.password)
      .subscribe(response=>{
        if(response == true)
        {
          console.log("User Inserted");
          this.alertService.success("Registration Succesfull.", true);
          this.router.navigate(['login']);
        }
        else
        {
          this.error = "Username already Exists";
        }
      })
    


  }

  setError(event:any)
  {
    console.log(event.target);
  }

  unSetError()
  {
    this.alertService.error("false");
  }

  checkWhichError(formfield:number)
  {
    if (formfield == 1)
    {
      if (this.registerForm.controls.userID.errors?.required)
      {
        this.alertService.error("UserID is Mandatory");
      }
      if (this.registerForm.controls.userID.errors?.maxlength)
      {
        this.alertService.error("UserID at max can be of 10 Digit Long");
      }
    }
    if (formfield == 2)
    {
      if (this.registerForm.controls.username.errors?.required)
      {
        this.alertService.error("Username is Mandatory");
      }
      if (this.registerForm.controls.username.errors?.invalidUsername)
      {
        this.alertService.error("Username already Exists, Please try Again");
      }
    }
    if (formfield == 3)
    {
      if (this.registerForm.controls.password.errors?.required)
      {
         this.alertService.error("Password is Mandatory");
      }
      if (this.registerForm.controls.password.errors?.minlength)
      {
         this.alertService.error("Password has to be minimum 6 Characters long");
      }
    }
    if (formfield == 4)
    {
      if (this.registerForm.controls.email.errors?.required)
      {
        this.alertService.error("Email is Mandatory");
      }
    }
    if (formfield == 5)
    {
      if (this.registerForm.controls.mobile.errors?.required)
      {
         this.alertService.error("Mobile Number is Mandatory");
      }
      if (this.registerForm.controls.mobile.errors?.minlength)
      {
         this.alertService.error("Mobile Number has to be 10 Characters long");
      }
      if (this.registerForm.controls.mobile.errors?.maxlength)
      {
         this.alertService.error("Mobile Number has to be 10 Characters long");
      }
    }
    if (formfield == 6)
    {
      if (this.registerForm.controls.dob.errors?.required)
      {
        this.alertService.error("Date of Birth is Mandatory");
      }
    }
  }
}
