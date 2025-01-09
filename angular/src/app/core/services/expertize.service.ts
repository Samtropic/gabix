import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ExpertizeDto } from '../dtos';

@Injectable()
export class ExpertizeService {

  constructor(private http: HttpClient) {}

  getExpertizes(): Observable<ExpertizeDto[]> {
    return this.http.get<ExpertizeDto[]>('http://localhost:4000/anonymous/expertizes');
  }
}
