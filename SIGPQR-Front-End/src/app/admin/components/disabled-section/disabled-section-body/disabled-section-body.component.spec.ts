import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisabledSectionBodyComponent } from './disabled-section-body.component';

describe('DisabledSectionBodyComponent', () => {
  let component: DisabledSectionBodyComponent;
  let fixture: ComponentFixture<DisabledSectionBodyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisabledSectionBodyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisabledSectionBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
