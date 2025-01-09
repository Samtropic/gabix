import { Observable, debounceTime, filter, map } from 'rxjs';

export function debounceTrim(value: Observable<string>): Observable<string> {
  return value.pipe(
    filter((value) => value.trim() !== ''),
    debounceTime(300),
    map((value) => value.trim())
  );
}
