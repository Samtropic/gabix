import { HttpHeaders, HttpContext, HttpParams } from '@angular/common/http';

export interface RequestOptions {
  headers?:
    | HttpHeaders
    | {
        [header: string]: string | string[];
      };
  observe?: 'body';
  context?: HttpContext;
  params?:
    | HttpParams
    | {
        [param: string]:
          | string
          | number
          | boolean
          | ReadonlyArray<string | number | boolean>;
      };
  reportProgress?: boolean;
  responseType?: 'json';
  withCredentials?: boolean;
  transferCache?:
    | {
        includeHeaders?: string[];
      }
    | boolean;
}

export interface QueryParams {
  // Key-value pair representing any query parameter
  // Example: { page: 10, pageSize: 25}
  [param: string]:
    | string
    | number
    | boolean
    | ReadonlyArray<string | number | boolean>;
}

export interface SearchCriteria extends QueryParams {
  page: number;
  pageSize: number;
}
