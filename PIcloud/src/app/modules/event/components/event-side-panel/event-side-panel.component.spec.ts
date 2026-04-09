import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventSidePanelComponent } from './event-side-panel.component';

describe('EventSidePanelComponent', () => {
  let component: EventSidePanelComponent;
  let fixture: ComponentFixture<EventSidePanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EventSidePanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventSidePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
