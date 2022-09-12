import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTreatmentComponent } from './create-treatment.component';

describe('CreateReatmentComponent', () => {
  let component: CreateTreatmentComponent;
  let fixture: ComponentFixture<CreateTreatmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateTreatmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTreatmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
