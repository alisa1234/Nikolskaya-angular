import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmenuCalendarComponent } from './submenu-calendar.component';

describe('SubmenuCalendarComponent', () => {
  let component: SubmenuCalendarComponent;
  let fixture: ComponentFixture<SubmenuCalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmenuCalendarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmenuCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
