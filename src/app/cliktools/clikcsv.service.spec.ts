import { TestBed } from '@angular/core/testing';

import { ClikCSV } from './clikcsv';

describe('ClikCSV', () => {
  let service: ClikCSV;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClikCSV);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});