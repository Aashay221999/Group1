import { BookentryComponent } from './../bookentry/bookentry.component';
import { ComponentFixture, fakeAsync, inject, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppentrybycalenderComponent } from './appentrybycalender.component';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { UserService } from 'src/app/user.service';
import { PortService } from 'src/app/port.service';
import { ServerService } from 'src/app/server.service';
import { HttpClient } from '@angular/common/http';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
//import{BookentryComponent} from'src/app/generaluser/bookentry/bookentry.component';
describe('AppentrybycalenderComponent', () => {
  let component: AppentrybycalenderComponent;
  let fixture: ComponentFixture<AppentrybycalenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppentrybycalenderComponent ],
      imports: [RouterTestingModule, HttpClientTestingModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppentrybycalenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  /*it('should Show the table of entries',fakeAsync(()  => {
    expect('.row').toBeTruthy();
    expect('.container-fluid').toBeTruthy();
    }
  ))*/
  
});
