import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstagramContentComponent } from './instagram-content.component';

describe('InstagramContentComponent', () => {
  let component: InstagramContentComponent;
  let fixture: ComponentFixture<InstagramContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstagramContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstagramContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
