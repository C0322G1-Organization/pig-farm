import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoNewsComponent } from './info-news.component';

describe('InfoNewsComponent', () => {
  let component: InfoNewsComponent;
  let fixture: ComponentFixture<InfoNewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoNewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

<<<<<<< HEAD
  it('should employee-create', () => {
=======
  it('should createNotification', () => {
>>>>>>> developer
    expect(component).toBeTruthy();
  });
});
