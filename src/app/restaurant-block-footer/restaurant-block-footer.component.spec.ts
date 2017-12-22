import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantBlockFooterComponent } from './restaurant-block-footer.component';

describe('RestaurantBlockFooterComponent', () => {
  let component: RestaurantBlockFooterComponent;
  let fixture: ComponentFixture<RestaurantBlockFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestaurantBlockFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantBlockFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
