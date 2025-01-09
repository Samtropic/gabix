import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ProfessionalService } from 'src/app/core/services/professional.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-professional-patients',
  templateUrl: './professional-patients.component.html',
  styleUrls: ['./professional-patients.component.scss'],
})
export class ProfessionalPatientsComponent implements OnInit {
  patients: any[] = [];
  isLoading = true;
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  dataSource: any;
  displayedColumns: any;

  constructor(
    private Router: Router,
    private professionalService: ProfessionalService,
    private cd: ChangeDetectorRef
  ) {
    this.displayedColumns = ['firstname', 'lastname', 'email', 'phone'];
  }

  ngOnInit(): void {
    this.professionalService
      .getMyPatients()
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((patients: any) => {
        if (patients?.length) {
          this.patients = patients;
          this.dataSource = new MatTableDataSource(this.patients);
        }
        this.isLoading = false;
        this.cd.markForCheck;
      });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  printPatient(patient: any): void {
    console.log('Patient:', patient);
  }
}
