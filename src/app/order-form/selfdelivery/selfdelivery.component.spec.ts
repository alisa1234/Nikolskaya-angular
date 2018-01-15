import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelfdeliveryComponent } from './selfdelivery.component';

describe('SelfdeliveryComponent', () => {
  let component: SelfdeliveryComponent;
  let fixture: ComponentFixture<SelfdeliveryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelfdeliveryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelfdeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
