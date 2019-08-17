import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacultiesEditComponent } from './faculties-edit.component';

describe('FacultiesEditComponent', () => {
  let component: FacultiesEditComponent;
  let fixture: ComponentFixture<FacultiesEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacultiesEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacultiesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
