import { Inject, Injectable, LOCALE_ID } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DateFormatService {
  private readonly frenchFormat = 'dd MMM yy';
  private readonly usFormat = "MMM d'th' yy";

  constructor(@Inject(LOCALE_ID) private locale: string) {}

  getDateFormat(): string {
    if (this.locale === 'fr') {
      return this.frenchFormat;
    } else {
      return this.usFormat;
    }
  }
}
