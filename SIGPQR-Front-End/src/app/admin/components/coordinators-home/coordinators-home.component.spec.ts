import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoordinatorsHomeComponent } from './coordinators-home.component';

describe('CoordinatorsHomeComponent', () => {
  let component: CoordinatorsHomeComponent;
  let fixture: ComponentFixture<CoordinatorsHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoordinatorsHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoordinatorsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
