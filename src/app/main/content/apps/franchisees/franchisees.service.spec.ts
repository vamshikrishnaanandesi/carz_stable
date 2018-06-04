import { TestBed, inject } from '@angular/core/testing';

import { FranchiseesService } from './franchisees.service';

describe('FranchiseesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FranchiseesService]
    });
  });

  it('should be created', inject([FranchiseesService], (service: FranchiseesService) => {
    expect(service).toBeTruthy();
  }));
});
