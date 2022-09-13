import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportPortCreateComponent } from './export-port-create.component';

describe('CreateComponent', () => {
  let component: ExportPortCreateComponent;
  let fixture: ComponentFixture<ExportPortCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExportPortCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportPortCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should export-port-create', () => {
    expect(component).toBeTruthy();
  });
});
