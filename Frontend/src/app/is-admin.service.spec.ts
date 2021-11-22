import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { IsAdminService } from './is-admin.service';

describe('IsAdminService', () => {
  let service: IsAdminService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[RouterTestingModule,HttpClientTestingModule]
    })
    .compileComponents();
  });
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IsAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
