import { TestBed } from '@angular/core/testing';

import { AppValidatorService } from './app-validator.service';

describe('AppValidatorService', () => {
  let service: AppValidatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppValidatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
