import { TestBed } from '@angular/core/testing';

import { ClikMaps } from './clikMaps';

describe('ClikMaps', () => {
  let service: ClikMaps;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClikMaps);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});