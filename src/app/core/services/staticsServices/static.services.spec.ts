import { TestBed } from '@angular/core/testing';

import { StaticServices } from './static.services';

describe('StaticServices', () => {
  let service: StaticServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StaticServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
