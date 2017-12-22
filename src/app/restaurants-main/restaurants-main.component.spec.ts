import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantsMainComponent } from './restaurants-main.component';

describe('RestaurantsMainComponent', () => {
  let component: RestaurantsMainComponent;
  let fixture: ComponentFixture<RestaurantsMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestaurantsMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantsMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
