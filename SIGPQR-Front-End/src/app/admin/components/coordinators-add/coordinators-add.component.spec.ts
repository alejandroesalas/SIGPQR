import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoordinatorsAddComponent } from './coordinators-add.component';

describe('CoordinatorsAddComponent', () => {
  let component: CoordinatorsAddComponent;
  let fixture: ComponentFixture<CoordinatorsAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoordinatorsAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoordinatorsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
