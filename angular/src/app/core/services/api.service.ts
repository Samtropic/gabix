import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RequestOptions } from '../types/request.types';
import { CommonData } from '../types/common.types';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private httpClient: HttpClient) {}

  get<T>(url: string, options: RequestOptions): Observable<T> {
    return this.httpClient.get<T>(url, options) as Observable<T>;
  }

  post<T, K>(url: string, body: K, options: RequestOptions): Observable<T> {
    return this.httpClient.post<T>(url, body, options) as Observable<T>;
  }

  patch<T, K extends CommonData>(
    url: string,
    body: K,
    options: RequestOptions
  ): Observable<T> {
    let { id, createdAt, updatedAt, ...strippedBody } = body;
    return this.httpClient.patch<T>(
      url,
      strippedBody,
      options
    ) as Observable<T>;
  }

  delete<T>(url: string, options: RequestOptions): Observable<T> {
    return this.httpClient.delete<T>(url, options) as Observable<T>;
  }
}
