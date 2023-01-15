import { TestBed } from '@angular/core/testing';
import { EventService } from '../event-service/event.service';
import { DataService } from './data.service';

describe('DataService', () => {
  let service: DataService;
  let eventService: EventService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataService);
    eventService = TestBed.inject(EventService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
