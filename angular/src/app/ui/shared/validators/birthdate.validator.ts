import { AbstractControl } from '@angular/forms';
import * as moment from 'moment';

export function birthdateValidator(control: AbstractControl) {
  if (control.value) {
    const date = moment(control.value);
    const today = moment();
    if (
      date.isAfter(today) ||
      (date.isBefore(today) && today.diff(date, 'years') > 150) // Maybe science will skyrocket one's life in the future !
    ) {
      return { invalidDate: true };
    }
  }
  return null;
}
