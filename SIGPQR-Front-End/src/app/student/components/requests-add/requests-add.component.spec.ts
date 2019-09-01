import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestsAddComponent } from './requests-add.component';

describe('RequestsAddComponent', () => {
  let component: RequestsAddComponent;
  let fixture: ComponentFixture<RequestsAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestsAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
