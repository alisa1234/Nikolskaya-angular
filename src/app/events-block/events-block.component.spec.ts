import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsBlockComponent } from './events-block.component';

describe('EventsBlockComponent', () => {
  let component: EventsBlockComponent;
  let fixture: ComponentFixture<EventsBlockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventsBlockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventsBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
