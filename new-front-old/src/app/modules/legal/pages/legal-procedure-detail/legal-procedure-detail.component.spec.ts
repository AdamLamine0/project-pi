import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LegalProcedureDetailComponent } from './legal-procedure-detail.component';

describe('LegalProcedureDetailComponent', () => {
  let component: LegalProcedureDetailComponent;
  let fixture: ComponentFixture<LegalProcedureDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LegalProcedureDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LegalProcedureDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

