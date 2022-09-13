import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportPortUpdateComponent } from './export-port-update.component';

describe('UpdateComponent', () => {
  let component: ExportPortUpdateComponent;
  let fixture: ComponentFixture<ExportPortUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExportPortUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportPortUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should export-port-create', () => {
    expect(component).toBeTruthy();
  });
});
