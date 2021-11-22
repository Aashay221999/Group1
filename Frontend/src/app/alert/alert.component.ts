import { Component, OnInit } from '@angular/core';
import { AlertService } from '../alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {
  message:any;
  isUnset:boolean=true;
  constructor(private alertService: AlertService) { }

  ngOnInit(): void {
    this.alertService.getMessage()
    .subscribe(message => { 
      this.message = message;
      if (this.message.text == false)
      {
        this.isUnset = false;
      }
      else
      {
        this.isUnset = true;
      }
       
    });
  }

}
