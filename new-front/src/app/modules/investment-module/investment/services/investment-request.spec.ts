import { TestBed } from '@angular/core/testing';

import { InvestmentRequest } from './investment-request';

describe('InvestmentRequest', () => {
  let service: InvestmentRequest;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvestmentRequest);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
