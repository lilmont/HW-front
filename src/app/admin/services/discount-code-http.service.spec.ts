import { TestBed } from '@angular/core/testing';

import { DiscountCodeHttpService } from './discount-code-http.service';

describe('DiscountCodeHttpService', () => {
  let service: DiscountCodeHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiscountCodeHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
