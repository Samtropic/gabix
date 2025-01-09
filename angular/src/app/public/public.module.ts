import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../core/services/auth.service';
import { LoginComponent } from './login/login.component';
import { ProfessionalPageComponent } from './professional-page/professional-page.component';
import { PublicRoutingModule } from './public-routing.module';
import { PublicComponent } from './public.component';
import { SearchPatientComponent } from './search-patient/search-patient.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorService } from '../core/interceptors/token-interceptor.service';
import { ExpertizeService } from '../core/services/expertize.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
@NgModule({
  declarations: [
    PublicComponent,
    LoginComponent,
    ProfessionalPageComponent,
    SearchPatientComponent,
    PageNotFoundComponent,
  ],
  imports: [
    PublicRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    CommonModule,
    MatButtonModule,
    MatCheckboxModule,
    MatRadioModule,
    MatMenuModule,
    MatTooltipModule,
  ],
  providers: [
    AuthService,
    ExpertizeService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
  ],
})
export class PublicModule {}
