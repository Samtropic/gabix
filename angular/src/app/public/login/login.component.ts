import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  public loginForm: UntypedFormGroup;
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  tokenKey = 'jwtToken';

  constructor(
    private authService: AuthService,
    private FormBuilder: UntypedFormBuilder,
    private Router: Router,
    private snackBar: MatSnackBar
  ) {
    this.loginForm = this.FormBuilder.group({
      email: [null, Validators.required],
      password: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    if (localStorage.getItem('jwtToken')) {
      this.Router.navigate(['/professional/patients']);
    }
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  login(): void {
    if (this.loginForm.invalid) {
      return;
    }

    this.authService
      .login(this.loginForm.value)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((response: any) => {
        if (!!response.token) {
          localStorage.setItem(this.tokenKey, response.token);
          this.Router.navigate(['/professional/patients']);
          this.snackBar.open('Connecté avec succès !', undefined, {
            duration: 2000,
          });
        }
      });
  }
}
