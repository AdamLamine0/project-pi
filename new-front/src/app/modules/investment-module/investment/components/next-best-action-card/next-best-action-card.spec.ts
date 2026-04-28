import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NextBestActionCard } from './next-best-action-card';

describe('NextBestActionCard', () => {
  let component: NextBestActionCard;
  let fixture: ComponentFixture<NextBestActionCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NextBestActionCard],
    }).compileComponents();

    fixture = TestBed.createComponent(NextBestActionCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
