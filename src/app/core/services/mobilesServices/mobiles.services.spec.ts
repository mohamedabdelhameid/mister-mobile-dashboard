import { TestBed } from '@angular/core/testing';

import { MobilesServices } from './mobiles.services';

describe('MobilesServices', () => {
  let service: MobilesServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MobilesServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
