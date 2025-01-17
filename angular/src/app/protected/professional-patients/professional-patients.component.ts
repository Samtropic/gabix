import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Inject,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { ProfessionalService } from 'src/app/core/services/professional.service';
import { MatTableDataSource } from '@angular/material/table';
import { DatePipe } from '@angular/common';
import { DateFormatService } from 'src/app/core/services/date-format.service';
import { MatDialog } from '@angular/material/dialog';
import { PatientCreationDialogComponent } from 'src/app/ui/dialog/patient-creation-dialog.component';
import { PatientDto } from 'src/app/core/dtos';
import { CreatePatientService } from 'src/app/core/services/patients/create-patient.service';
import { PatientCreationDialogService } from 'src/app/core/services/patients/patient-creation-dialog.service';
import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { SearchCriteria } from 'src/app/core/types/request.types';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-professional-patients',
  templateUrl: './professional-patients.component.html',
  styleUrls: ['./professional-patients.component.scss'],
})
export class ProfessionalPatientsComponent implements OnInit, OnDestroy {
  patients: any[] = [];
  isLoading = true;
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  dataSource = new MatTableDataSource<any>([]); // Initialize empty data source
  displayedColumns: any;

  dialogOpenSubscription: Subscription;
  dialogCloseSubscription: Subscription;
  dialogDataSubscription: Subscription;

  private paginator: MatPaginator;
  searchCriteria: SearchCriteria = {
    page: 1,
    pageSize: 0,
  };

  sorter: MatSort;

  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.dataSource.paginator = this.paginator;
  }

  @ViewChild(MatSort) set matSort(ms: MatSort) {
    this.sorter = ms;
    this.dataSource.sort = this.sorter;
  }

  constructor(
    private Router: Router,
    private professionalService: ProfessionalService,
    private cd: ChangeDetectorRef,
    private datePipe: DatePipe,
    private dialog: MatDialog,
    public readonly dateFormatService: DateFormatService,
    private readonly createPatientService: CreatePatientService,
    private readonly patientCreationDialogService: PatientCreationDialogService,
    private _snackBar: MatSnackBar
  ) {
    this.displayedColumns = [
      'firstName',
      'lastName',
      'birthdate',
      'email',
      'phone',
      'createdAt',
    ];
  }

  ngOnInit(): void {
    this.fetchPatients();
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  printPatient(patient: any): void {
    console.log('Patient:', patient);
  }

  onPatientClick(patient: any) {
    this.Router.navigate(['patients', patient._id], {
      queryParams: { patientData: JSON.stringify(patient) },
    });
  }

  onPageChange(event: PageEvent) {
    this.searchCriteria.page = event.pageIndex + 1; // Page index starts from 0
    this.searchCriteria.pageSize = event.pageSize;
    this.fetchPatients();
  }

  fetchPatients(): void {
    this.professionalService
      .getMyPatients(this.searchCriteria)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((patients: any) => {
        if (patients?.length) {
          this.patients = patients;
          this.dataSource = new MatTableDataSource(this.patients);
          this.dataSource.sort = this.sorter;
        }
        this.isLoading = false;
        this.cd.markForCheck;
      });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }

  openDialog() {
    const dialogModal = this.dialog.open(PatientCreationDialogComponent, {
      width: '40%',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms',
      data: {
        title: 'Ajouter un patient',
      },
    });
    this.dialogOpenSubscription = dialogModal.afterOpened().subscribe(() => {
      this.dialogDataSubscription = this.patientCreationDialogService
        .getConfirmCreationObservable()
        .subscribe((patientData) => {
          this.createPatient(patientData);
        });
    });
    this.dialogCloseSubscription = dialogModal.afterClosed().subscribe(() => {
      this.dialogDataSubscription.unsubscribe();
      this.dialogOpenSubscription.unsubscribe();
    });
  }

  closeDialog() {
    this.dialog.closeAll();
  }

  createPatient(user: PatientDto) {
    this.createPatientService
      .createPatient(`${environment.API_URL(environment)}/pro/patients`, user)
      .subscribe({
        next: (patient) => {
          console.log('createPatient', patient);
          this.fetchPatients();
          this.closeDialog();
          this.openSnackBar('Création réussie', 'Fermer');
        },
        error: (err) => {
          let errorMessage = err.error.exceptionResponse;
          if (errorMessage) {
            console.log(typeof errorMessage);
            if (typeof errorMessage !== 'string') {
              errorMessage = errorMessage.message.toString();
            }
            console.log(errorMessage);
            this.openSnackBar('Echec de la création', 'Fermer');
          }
        },
      });
  }
}
