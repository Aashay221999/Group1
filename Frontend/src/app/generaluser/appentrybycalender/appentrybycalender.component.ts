import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';

import { Router } from '@angular/router';
import { inject } from '@angular/core/testing';
import { ServerService } from 'src/app/server.service';

@Component({
  selector: 'app-appentrybycalender',
  templateUrl: './appentrybycalender.component.html',
  styleUrls: ['./appentrybycalender.component.css']
})
export class AppentrybycalenderComponent implements OnInit {
  acid:number=0;
  date:string="";
  appEntryList:Array<any>=[];
  private router =Router;
  constructor(private ar:ActivatedRoute , private ss:ServerService) {
    this.ar.params.subscribe(newparams=>{
      this.acid=parseInt(newparams['id']) ;
    })
   }

  ngOnInit(): void {
    this.ss.getUnbookedAppointmentEntitiesByAcIDAndDate(this.acid, this.date).subscribe(response=>{
      this.appEntryList=response;
    })
  }
  book(){
    (<any>this.router).navigate(['guser/bookentry']);
  }

}
