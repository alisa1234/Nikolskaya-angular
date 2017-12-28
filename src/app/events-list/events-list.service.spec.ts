import { TestBed, inject } from '@angular/core/testing';

import { EventsListService } from './events-list.service';

describe('EventsListService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EventsListService]
    });
  });

  it('should be created', inject([EventsListService], (service: EventsListService) => {
    expect(service).toBeTruthy();
  }));
});
