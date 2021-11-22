import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CreateNewCalenderComponent } from './create-new-calender.component';

describe('CreateNewCalenderComponent', () => {
  let component: CreateNewCalenderComponent;
  let fixture: ComponentFixture<CreateNewCalenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[RouterTestingModule,HttpClientTestingModule,FormsModule],
      declarations: [ CreateNewCalenderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNewCalenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /*it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should Show table of calender details',fakeAsync(()  => {
    expect('.form-group').toBeTruthy()
    }
  ));*/
});
