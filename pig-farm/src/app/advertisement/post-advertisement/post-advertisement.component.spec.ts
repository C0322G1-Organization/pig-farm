import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostAdvertisementComponent } from './post-advertisement.component';

describe('PostAdvertisementComponent', () => {
  let component: PostAdvertisementComponent;
  let fixture: ComponentFixture<PostAdvertisementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostAdvertisementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostAdvertisementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
