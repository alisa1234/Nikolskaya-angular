import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DishBlockComponent } from './dish-block.component';

describe('DishBlockComponent', () => {
  let component: DishBlockComponent;
  let fixture: ComponentFixture<DishBlockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DishBlockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DishBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
