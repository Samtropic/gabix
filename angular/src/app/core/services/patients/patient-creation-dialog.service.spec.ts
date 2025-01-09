import { TestBed } from '@angular/core/testing';

import { PatientCreationDialogService } from './patient-creation-dialog.service';

describe('PatientCreationDialogService', () => {
  let service: PatientCreationDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PatientCreationDialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
