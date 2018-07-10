import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusketMobComponent } from './busket-mob.component';

describe('BusketMobComponent', () => {
  let component: BusketMobComponent;
  let fixture: ComponentFixture<BusketMobComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusketMobComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusketMobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
