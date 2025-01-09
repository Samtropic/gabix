import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { PatientDto } from '../../dtos';

@Injectable({
  providedIn: 'root',
})
export class PatientCreationDialogService {
  private confirmationSubject = new Subject<any>();

  constructor() {}

  getConfirmCreationObservable() {
    return this.confirmationSubject.asObservable();
  }

  confirmCreation(data: PatientDto) {
    this.confirmationSubject.next(data);
  }
}
