import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, OnInit, inject } from '@angular/core';
import {
  AbstractControl,
  ControlContainer,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { birthdateValidator } from 'src/app/ui/shared/validators/birthdate.validator';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
  ],
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: () => inject(ControlContainer, { skipSelf: true }),
    },
  ],
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit, OnDestroy {
  @Input() controlKey!: string;
  @Input() label = '';

  parentContainer = inject(ControlContainer);

  get parentFormGroup() {
    return this.parentContainer.control as FormGroup;
  }

  get formControl(): { [key: string]: AbstractControl } {
    const formGroup = this.parentFormGroup.controls[
      this.controlKey
    ] as FormGroup;
    return formGroup.controls;
  }

  ngOnInit(): void {
    this.parentFormGroup.addControl(
      this.controlKey,
      new FormGroup({
        firstName: new FormControl(
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(50),
            Validators.pattern(
              "^(?:[a-zA-ZÀ-ÿ][a-zA-ZÀ-ÿ' -]{1,}|[a-zA-ZÀ-ÿ]+)$"
            ),
          ])
        ),
        lastName: new FormControl(
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(50),
            Validators.pattern(
              "^(?:[a-zA-ZÀ-ÿ][a-zA-ZÀ-ÿ' -]{1,}|[a-zA-ZÀ-ÿ]+)$"
            ),
          ])
        ),
        email: new FormControl(
          '',
          Validators.compose([Validators.required, Validators.email])
        ),
        phone: new FormControl(
          '',
          Validators.compose([
            Validators.pattern(
              '^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$'
            ),
          ])
        ),
        birthdate: new FormControl(
          '',
          Validators.compose([birthdateValidator])
        ),
      })
    );
  }
  ngOnDestroy() {
    this.parentFormGroup.removeControl(this.controlKey);
  }
}
