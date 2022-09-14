import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPlacementComponent } from './list-placement.component';

describe('ListPlacementComponent', () => {
  let component: ListPlacementComponent;
  let fixture: ComponentFixture<ListPlacementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListPlacementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPlacementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
