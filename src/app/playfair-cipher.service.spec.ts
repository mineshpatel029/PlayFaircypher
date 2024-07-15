import { TestBed } from '@angular/core/testing';

import { PlayfairCipherService } from './playfair-cipher.service';

describe('PlayfairCipherService', () => {
  let service: PlayfairCipherService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlayfairCipherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
