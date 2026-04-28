import { TestBed } from '@angular/core/testing';

import { InvestmentHoldingService } from './investment-holding.service';

describe('InvestmentHoldingService', () => {
  let service: InvestmentHoldingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvestmentHoldingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
