import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramSlotComponent } from './program-slot.component';

describe('ProgramSlotComponent', () => {
  let component: ProgramSlotComponent;
  let fixture: ComponentFixture<ProgramSlotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProgramSlotComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProgramSlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
