import { NgModule } from '@angular/core';
import { ProtectedRoutingModule } from './protected-routing.module';
import { ProtectedComponent } from './protected.component';
import { SidebarMenuComponent } from './sidebar-menu/sidebar-menu.component';
import { ProfessionalPatientsComponent } from './professional-patients/professional-patients.component';
import { ProfessionalService } from '../core/services/professional.service';
import { CommonModule, DatePipe } from '@angular/common';
import { MyAccountComponent } from './my-account/my-account.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { PatientCreationDialogComponent } from '../ui/dialog/patient-creation-dialog.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {
  MatPaginatorIntl,
  MatPaginatorModule,
} from '@angular/material/paginator';
import { FrenchPaginatorIntl } from '../ui/shared/intl/french-paginator';
@NgModule({
  declarations: [
    ProtectedComponent,
    SidebarMenuComponent,
    ProfessionalPatientsComponent,
    MyAccountComponent,
  ],
  imports: [
    CommonModule,
    ProtectedRoutingModule,
    MatSlideToggleModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    PatientCreationDialogComponent,
    MatSnackBarModule,
    MatPaginatorModule,
  ],
  providers: [
    ProfessionalService,
    DatePipe,
    { provide: MatPaginatorIntl, useClass: FrenchPaginatorIntl },
  ],
})
export class ProtectedModule {}
