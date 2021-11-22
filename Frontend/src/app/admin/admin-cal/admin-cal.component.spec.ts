import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCalComponent } from './admin-cal.component';

describe('AdminCalComponent', () => {
  let component: AdminCalComponent;
  let fixture: ComponentFixture<AdminCalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminCalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /*it('should create', () => {
    expect(component).toBeTruthy();
  });*/
});
