import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoordinatorRequestsComponent } from './coordinator-requests.component';

describe('CoordinatorRequestsComponent', () => {
  let component: CoordinatorRequestsComponent;
  let fixture: ComponentFixture<CoordinatorRequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoordinatorRequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoordinatorRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
