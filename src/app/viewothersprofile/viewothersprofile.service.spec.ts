import { TestBed, inject } from '@angular/core/testing';

import { ViewothersprofileService } from './viewothersprofile.service';

describe('ViewothersprofileService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ViewothersprofileService]
    });
  });

  it('should be created', inject([ViewothersprofileService], (service: ViewothersprofileService) => {
    expect(service).toBeTruthy();
  }));
});
