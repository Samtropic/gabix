import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, UntypedFormGroup } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { ExpertizeService } from 'src/app/core/services/expertize.service';

@Component({
  selector: 'app-search-patient',
  templateUrl: './search-patient.component.html',
  styleUrls: ['./search-patient.component.scss'],
})
export class SearchPatientComponent implements OnInit, OnDestroy {
  expertizes: any;
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  formGroup: UntypedFormGroup;

  constructor(
    private expertizeService: ExpertizeService,
    private formBuilder: FormBuilder,
    private cd: ChangeDetectorRef
  ) {
    this.formGroup = this.formBuilder.group({
      toppings: [],
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
          this.cd.markForCheck();
        }
      });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }
}
