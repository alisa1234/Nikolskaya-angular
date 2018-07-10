import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MidifiersComponent } from './midifiers.component';

describe('MidifiersComponent', () => {
  let component: MidifiersComponent;
  let fixture: ComponentFixture<MidifiersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MidifiersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MidifiersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
