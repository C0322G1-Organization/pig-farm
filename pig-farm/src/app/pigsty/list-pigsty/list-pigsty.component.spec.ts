import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPigstyComponent } from './list-pigsty.component';

describe('ListPigstyComponent', () => {
  let component: ListPigstyComponent;
  let fixture: ComponentFixture<ListPigstyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListPigstyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPigstyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
