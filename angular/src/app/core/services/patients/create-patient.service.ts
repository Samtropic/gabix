import { Injectable } from '@angular/core';
import { PatientDto } from '../../dtos';
import { ApiService } from '../api.service';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CreatePatientService {
  constructor(private apiService: ApiService) {}

  createPatient = (url: string, body: PatientDto): Observable<PatientDto> => {
    return this.apiService.post(url, body, {});
  };
}
