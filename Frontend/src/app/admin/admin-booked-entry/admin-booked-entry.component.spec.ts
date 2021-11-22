import { RouterModule } from '@angular/router';
import { ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';

import { AdminBookedEntryComponent } from './admin-booked-entry.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('AdminBookedEntryComponent', () => {
  let component: AdminBookedEntryComponent;
  let fixture: ComponentFixture<AdminBookedEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[RouterTestingModule,HttpClientTestingModule],
      declarations: [ AdminBookedEntryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminBookedEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /*it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should show all the booked entries',fakeAsync(()=>{
    expect('.container').toBeTruthy();
    expect('.table table-striped table-bordered').toBeTruthy();
  }))*/
});
