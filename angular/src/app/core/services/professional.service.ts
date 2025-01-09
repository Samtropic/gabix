import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, takeUntil, tap } from 'rxjs';
import {
  PatientDto,
  ProfessionalConfirmatuionDto,
  ProfessionalDto,
  ProfessionalServicesPrlDto,
} from '../dtos';
import { QueryParams } from '../types/request.types';

@Injectable()
export class ProfessionalService implements OnDestroy {
  public me$ = new Subject<ProfessionalDto>();
  private _unsubscribeAll = new Subject();

  constructor(private http: HttpClient) {}

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  getMyProfessionalAccount() {
    return this.http
      .get<ProfessionalDto>('http://localhost:4000/pro/me')
      .pipe(
        tap((professional: ProfessionalDto) => {
          if (professional) {
            this.me$.next(professional);
          }
        })
      )
      .subscribe();
  }

  getMyPatients(params?: QueryParams) {
    return this.http.get<PatientDto[]>('http://localhost:4000/pro/patients', {
      params,
    });
  }

  updatePrlService(body: ProfessionalServicesPrlDto): any {
    return this.http.put<ProfessionalDto>(
      'http://localhost:4000/pro/me/settings/service/prl',
      body
    );
  }
}
