import { ServerService } from './../../server.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CalenderdetailComponent } from './calenderdetail.component';

describe('CalenderdetailComponent', () => {
  let component: CalenderdetailComponent;
  let fixture: ComponentFixture<CalenderdetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[RouterTestingModule,HttpClientTestingModule],
      declarations: [ CalenderdetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalenderdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  
  /*it('should Show table of calender details',fakeAsync(()  => {
    expect('.container').toBeTruthy()
    }
  ));*/
});
