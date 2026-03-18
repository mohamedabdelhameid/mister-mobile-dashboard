import { TestBed } from '@angular/core/testing';

import { ColorsServices } from './colors.services';

describe('ColorsServices', () => {
  let service: ColorsServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ColorsServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
