import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutVacanciesComponent } from './about-vacancies.component';

describe('AboutVacanciesComponent', () => {
  let component: AboutVacanciesComponent;
  let fixture: ComponentFixture<AboutVacanciesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutVacanciesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutVacanciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
