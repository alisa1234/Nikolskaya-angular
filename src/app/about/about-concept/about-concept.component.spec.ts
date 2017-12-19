import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutConceptComponent } from './about-concept.component';

describe('AboutConceptComponent', () => {
  let component: AboutConceptComponent;
  let fixture: ComponentFixture<AboutConceptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutConceptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutConceptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
