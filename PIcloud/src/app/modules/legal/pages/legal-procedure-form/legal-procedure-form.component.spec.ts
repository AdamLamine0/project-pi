import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LegalProcedureFormComponent } from './legal-procedure-form.component';

describe('LegalProcedureFormComponent', () => {
  let component: LegalProcedureFormComponent;
  let fixture: ComponentFixture<LegalProcedureFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LegalProcedureFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LegalProcedureFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
