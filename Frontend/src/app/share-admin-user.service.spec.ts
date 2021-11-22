import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ShareAdminUserService } from './share-admin-user.service';

describe('ShareAdminUserService', () => {
  let service: ShareAdminUserService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[RouterTestingModule,HttpClientTestingModule]
    })
    .compileComponents();
  });
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShareAdminUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
