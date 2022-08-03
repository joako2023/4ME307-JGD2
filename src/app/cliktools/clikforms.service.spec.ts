import { TestBed } from '@angular/core/testing';

import { ClikForms } from './clikforms';

describe('ClikForms', () => {
  let service: ClikForms;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClikForms);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});