import {
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HttpInterceptor,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptorService implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('jwtToken');
    let newRequest = request.clone({
      setHeaders: {
        'X-Docorga-APP-Type': 'gabix',
      },
    });

    if (token) {
      newRequest = newRequest.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
    return next.handle(newRequest);
  }
}
