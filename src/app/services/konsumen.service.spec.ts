import { TestBed } from '@angular/core/testing';

import { KonsumenService } from './konsumen.service';

describe('KonsumenService', () => {
  let service: KonsumenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KonsumenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
