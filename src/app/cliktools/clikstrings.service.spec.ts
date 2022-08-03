import { TestBed } from '@angular/core/testing';

import { ClikStrings } from './clikstrings';

describe('ClikStrings', () => {
  let service: ClikStrings;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClikStrings);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});