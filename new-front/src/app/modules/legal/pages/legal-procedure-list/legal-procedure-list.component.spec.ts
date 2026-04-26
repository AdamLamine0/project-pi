import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LegalProcedureListComponent } from './legal-procedure-list.component';

describe('LegalProcedureListComponent', () => {
  let component: LegalProcedureListComponent;
  let fixture: ComponentFixture<LegalProcedureListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LegalProcedureListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LegalProcedureListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

