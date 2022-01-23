import { TestBed } from '@angular/core/testing';

import { ProgressreportService } from './progressreport.service';

describe('ProgressreportService', () => {
  let service: ProgressreportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProgressreportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
