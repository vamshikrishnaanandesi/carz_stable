import { TestBed, inject } from '@angular/core/testing';

import { FranchiseeLoginService } from './franchisee-login.service';

describe('FranchiseeLoginService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FranchiseeLoginService]
    });
  });

  it('should be created', inject([FranchiseeLoginService], (service: FranchiseeLoginService) => {
    expect(service).toBeTruthy();
  }));
});
