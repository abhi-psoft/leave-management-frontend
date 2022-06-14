import { TestBed } from '@angular/core/testing';

import { SharedHeaderService } from './shared-header.service';

describe('SharedHeaderService', () => {
  let service: SharedHeaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedHeaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
