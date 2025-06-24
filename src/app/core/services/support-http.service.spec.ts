import { TestBed } from '@angular/core/testing';

import { SupportHttpService } from './support-http.service';

describe('SupportHttpService', () => {
  let service: SupportHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SupportHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
