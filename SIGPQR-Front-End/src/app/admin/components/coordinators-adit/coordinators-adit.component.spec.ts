import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoordinatorsAditComponent } from './coordinators-adit.component';

describe('CoordinatorsAditComponent', () => {
  let component: CoordinatorsAditComponent;
  let fixture: ComponentFixture<CoordinatorsAditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoordinatorsAditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoordinatorsAditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
