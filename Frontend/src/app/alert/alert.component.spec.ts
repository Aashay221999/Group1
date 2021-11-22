import { RouterTestingModule } from '@angular/router/testing';
import { ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';

import { AlertComponent } from './alert.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AlertComponent', () => {
  let component: AlertComponent;
  let fixture: ComponentFixture<AlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[RouterTestingModule,HttpClientTestingModule],
      declarations: [ AlertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  /*it('should show alert message'),fakeAsync(()=>{
    expect('.alertMessage').toBeTruthy();
  })*/
});
