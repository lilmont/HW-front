import { TestBed } from '@angular/core/testing';

import { AcademyHttpService } from './academy-http.service';

describe('AcademyHttpService', () => {
  let service: AcademyHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AcademyHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
