import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, UntypedFormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, Subject, Subscription, takeUntil, tap } from 'rxjs';
import { ProfessionalDto } from 'src/app/core/dtos';
import { ExpertizeService } from 'src/app/core/services/expertize.service';
import { ProfessionalService } from 'src/app/core/services/professional.service';
import { debounceTrim } from 'src/app/ui/shared/rxjs-operators/debounceTrim';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-search-patient',
  templateUrl: './search-patient.component.html',
  styleUrls: ['./search-patient.component.scss'],
})
export class SearchPatientComponent implements OnInit, OnDestroy {
  expertizes: any;
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  private inputDebounce$ = new BehaviorSubject<string>('');

  public professionals$: Subject<ProfessionalDto[]> = new Subject<
    ProfessionalDto[]
  >();
  public selectedExpertize: string;
  public searchString: string;
  public hasDoneSearch: boolean = false;

  formGroup: UntypedFormGroup;

  constructor(
    private expertizeService: ExpertizeService,
    private formBuilder: FormBuilder,
    private cd: ChangeDetectorRef,
    private readonly professionalService: ProfessionalService,
    private _snackBar: MatSnackBar
  ) {
    this.formGroup = this.formBuilder.group({
      toppings: [],
    });
  }

  handleInputSearch(searchstring: string) {
    this.inputDebounce$.next(searchstring);
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }

  ngOnInit(): void {
    this.expertizeService
      .getExpertizes()
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((expertizes: any) => {
        if (expertizes) {
          this.expertizes = expertizes;
          this.formGroup
            .get('toppings')
            ?.setValue(this.expertizes[0].label.unknown);
          console.log(this.expertizes);
          this.selectedExpertize = this.expertizes[0].label.unknown;
          this.cd.markForCheck();
        }
      });

    this.inputDebounce$
      .pipe(
        tap((inputData: string) => {
          if (inputData === '') {
            this.professionals$.next([]);
          }
        }),
        takeUntil(this._unsubscribeAll),
        debounceTrim
      )
      .subscribe({
        next: (inputData: string) => {
          this.professionalService
            .getProByExpertize(
              `${environment.API_URL(environment)}/anonymous/professionals`,
              {
                name: inputData,
                expertizeLabelUnknow: this.selectedExpertize,
              }
            )
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((pro: ProfessionalDto[]) => {
              this.hasDoneSearch = true;
              this.professionals$.next(pro);
            });
        },
        error: (err) => {
          console.log(err);
          let errorMessage = err.error.exceptionResponse;
          if (errorMessage) {
            console.log(typeof errorMessage);
            if (typeof errorMessage !== 'string') {
              errorMessage = errorMessage.message.toString();
            }
            console.log(errorMessage);
            this.openSnackBar(
              'Echec lors de la récupération des données',
              'Fermer'
            );
          }
        },
      });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }
}
