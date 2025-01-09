import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { PatientDto } from 'src/app/core/dtos';
import { PatientCreationDialogService } from 'src/app/core/services/patients/patient-creation-dialog.service';
import { UserFormComponent } from '../../component/user-form/user-form.component';

@Component({
  selector: 'app-patient-creation-dialog',
  templateUrl: './patient-creation-dialog.component.html',
  styleUrls: ['./patient-creation-dialog.component.scss'],
  standalone: true,
  imports: [
    UserFormComponent,
    ReactiveFormsModule,
    MatDialogModule,
    MatIconModule,
  ],
})
export class PatientCreationDialogComponent implements OnInit {
  public inputData: any;
  form = new FormGroup({});

  constructor(
    private ref: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<PatientCreationDialogComponent>,
    private readonly patientCreationDialogService: PatientCreationDialogService
  ) {}

  ngOnInit(): void {
    this.form.reset();
    this.inputData = this.data;
    this.ref.detectChanges();
  }

  closeDialog() {
    this.dialogRef.close();
  }

  onConfirm() {
    const formData = this.form.getRawValue() as any;
    const patientData = formData.patientForm as PatientDto;
    this.patientCreationDialogService.confirmCreation(patientData);
  }
}
