import { TestBed, inject } from '@angular/core/testing';

import { RestaurantsListService } from './restaurants-list.service';

describe('RestaurantsListService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RestaurantsListService]
    });
  });

  it('should be created', inject([RestaurantsListService], (service: RestaurantsListService) => {
    expect(service).toBeTruthy();
  }));
});
