import { TestBed } from '@angular/core/testing';

import { ClikTools } from './cliktools';

describe('ClikTools', () => {
  let service: ClikTools;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClikTools);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});