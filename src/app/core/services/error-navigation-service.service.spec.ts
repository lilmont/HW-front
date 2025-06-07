import { TestBed } from '@angular/core/testing';

import { ErrorNavigationServiceService } from './error-navigation-service.service';

describe('ErrorNavigationServiceService', () => {
  let service: ErrorNavigationServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ErrorNavigationServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
