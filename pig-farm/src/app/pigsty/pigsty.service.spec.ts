import { TestBed } from '@angular/core/testing';

import { PigstyService } from './pigsty.service';

describe('PigstyService', () => {
  let service: PigstyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PigstyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
