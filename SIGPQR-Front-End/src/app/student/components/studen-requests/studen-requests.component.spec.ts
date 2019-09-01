import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudenRequestsComponent } from './studen-requests.component';

describe('StudenRequestsComponent', () => {
  let component: StudenRequestsComponent;
  let fixture: ComponentFixture<StudenRequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudenRequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudenRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
