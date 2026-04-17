import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcedureHomeComponent } from './procedure-home.component';

describe('ProcedureHomeComponent', () => {
  let component: ProcedureHomeComponent;
  let fixture: ComponentFixture<ProcedureHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProcedureHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProcedureHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
