import { Inject, Injectable, LOCALE_ID } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DateFormatService {
  private readonly frenchFormat = 'dd MMM yy';
  private readonly usFormat = "MMM d'th' yy";
  private readonly timeFormat = 'HH:mm:ss';

  constructor(@Inject(LOCALE_ID) private locale: string) {}

  getDatetimeFormat(withTime?: boolean): string {
    let dtFormat = '';
    switch (this.locale) {
      case 'fr':
        dtFormat = this.frenchFormat;
        break;
      case 'us':
        dtFormat = this.usFormat;
        break;
      default:
        dtFormat = this.frenchFormat;
    }
    return withTime ? dtFormat + ` ${this.timeFormat}` : dtFormat;
  }
}
