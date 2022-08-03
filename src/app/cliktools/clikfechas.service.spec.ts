import { TestBed } from '@angular/core/testing';

import { ClikPDF } from './clikpdf';

describe('ClikPDF', () => {
  let service: ClikPDF;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClikPDF);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});