import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuTabsInsideComponent } from './menu-tabs-inside.component';

describe('MenuTabsInsideComponent', () => {
  let component: MenuTabsInsideComponent;
  let fixture: ComponentFixture<MenuTabsInsideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuTabsInsideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuTabsInsideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
