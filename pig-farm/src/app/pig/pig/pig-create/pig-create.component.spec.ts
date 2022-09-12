import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PigCreateComponent } from './pig-create.component';

describe('PigCreateComponent', () => {
  let component: PigCreateComponent;
  let fixture: ComponentFixture<PigCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PigCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PigCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
