import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { DatetimeslotService } from './datetimeslot.service';

describe('DatetimeslotService', () => {
  let service: DatetimeslotService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[RouterTestingModule,HttpClientTestingModule]
    })
    .compileComponents();
  });
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatetimeslotService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
