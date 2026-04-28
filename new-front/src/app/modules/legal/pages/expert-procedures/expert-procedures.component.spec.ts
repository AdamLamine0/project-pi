import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpertProceduresComponent } from './expert-procedures.component';

describe('ExpertProceduresComponent', () => {
  let component: ExpertProceduresComponent;
  let fixture: ComponentFixture<ExpertProceduresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpertProceduresComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpertProceduresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

