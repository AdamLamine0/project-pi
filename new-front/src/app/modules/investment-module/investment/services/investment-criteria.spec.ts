import { TestBed } from '@angular/core/testing';

import { InvestmentCriteria } from './investment-criteria';

describe('InvestmentCriteria', () => {
  let service: InvestmentCriteria;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvestmentCriteria);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
