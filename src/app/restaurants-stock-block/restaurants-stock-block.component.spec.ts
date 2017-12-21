import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantsStockBlockComponent } from './restaurants-stock-block.component';

describe('RestaurantsStockBlockComponent', () => {
  let component: RestaurantsStockBlockComponent;
  let fixture: ComponentFixture<RestaurantsStockBlockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestaurantsStockBlockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantsStockBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
