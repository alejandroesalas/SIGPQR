import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestsTimelineComponent } from './requests-timeline.component';

describe('RequestsTimelineComponent', () => {
  let component: RequestsTimelineComponent;
  let fixture: ComponentFixture<RequestsTimelineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestsTimelineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestsTimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
