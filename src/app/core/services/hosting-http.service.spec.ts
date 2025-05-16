import { TestBed } from '@angular/core/testing';

import { HostingHttpService } from './hosting-http.service';

describe('HostingHttpService', () => {
  let service: HostingHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HostingHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
