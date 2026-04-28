import { TestBed } from '@angular/core/testing';

import { NextBestActionService } from './next-best-action.service';

describe('NextBestActionService', () => {
  let service: NextBestActionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NextBestActionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
