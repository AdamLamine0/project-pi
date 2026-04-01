import { TestBed } from '@angular/core/testing';

import { LegalProcedureService } from './legal-procedure.service';

describe('LegalProcedureService', () => {
  let service: LegalProcedureService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LegalProcedureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
