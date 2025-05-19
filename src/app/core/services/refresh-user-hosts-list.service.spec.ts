import { TestBed } from '@angular/core/testing';

import { RefreshUserHostsListService } from './refresh-user-hosts-list.service';

describe('RefreshUserHostsListService', () => {
  let service: RefreshUserHostsListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RefreshUserHostsListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
