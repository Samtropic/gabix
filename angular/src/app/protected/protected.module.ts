import { NgModule } from '@angular/core';
import { ProtectedRoutingModule } from './protected-routing.module';
import { ProtectedComponent } from './protected.component';
import { SidebarMenuComponent } from './sidebar-menu/sidebar-menu.component';
import { ProfessionalPatientsComponent } from './professional-patients/professional-patients.component';
import { ProfessionalService } from '../core/services/professional.service';
import { CommonModule } from '@angular/common';
import { MyAccountComponent } from './my-account/my-account.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';

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
  ],
  providers: [ProfessionalService],
})
export class ProtectedModule {}
