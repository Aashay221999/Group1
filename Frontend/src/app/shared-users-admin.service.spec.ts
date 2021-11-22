import { TestBed } from '@angular/core/testing';

import { SharedUsersAdminService } from './shared-users-admin.service';

describe('SharedUsersAdminService', () => {
  let service: SharedUsersAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedUsersAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
