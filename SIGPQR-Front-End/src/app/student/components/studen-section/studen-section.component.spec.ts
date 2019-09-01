import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudenSectionComponent } from './studen-section.component';

describe('StudenSectionComponent', () => {
  let component: StudenSectionComponent;
  let fixture: ComponentFixture<StudenSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudenSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudenSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
