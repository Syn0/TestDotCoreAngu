import { TestBed } from '@angular/core/testing';

import { InMemHeroService } from './in-mem-hero.service';

describe('InMemHeroService', () => {
  let service: InMemHeroService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InMemHeroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
