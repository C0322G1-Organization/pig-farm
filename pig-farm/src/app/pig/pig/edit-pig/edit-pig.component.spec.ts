import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPigComponent } from './edit-pig.component';

describe('EditPigComponent', () => {
  let component: EditPigComponent;
  let fixture: ComponentFixture<EditPigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
