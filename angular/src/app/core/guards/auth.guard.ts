import { CanMatchFn, Router } from '@angular/router';

export const authGuard: CanMatchFn = () => {
  const item = localStorage.getItem('jwtToken');
  if (item) {
    return true;
  }
  return false;
};
