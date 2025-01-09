import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import {
  PatientDto,
  ProfessionalDto,
  ProfessionalServicesPrlDto,
} from '../dtos';
import { QueryParams } from '../types/request.types';
import { ApiService } from './api.service';

@Injectable()
export class ProfessionalService implements OnDestroy {
  public me$ = new Subject<ProfessionalDto>();
  private _unsubscribeAll = new Subject();

  constructor(
    private http: HttpClient,
    private readonly apiService: ApiService
  ) {}

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

  getProByExpertize = (
    url: string,
    params: QueryParams
  ): Observable<ProfessionalDto[]> => {
    return this.apiService.get(url, {
      params,
      responseType: 'json',
    });
  };
}
