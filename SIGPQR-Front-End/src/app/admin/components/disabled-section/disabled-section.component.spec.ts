import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisabledSectionComponent } from './disabled-section.component';

describe('DisabledUsersComponent', () => {
  let component: DisabledSectionComponent;
  let fixture: ComponentFixture<DisabledSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisabledSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisabledSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
