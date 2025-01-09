import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProfessionalPageComponent } from './professional-page/professional-page.component';
import { PublicComponent } from './public.component';
import { SearchPatientComponent } from './search-patient/search-patient.component';

const routes: Routes = [
  {
    path: '',
    component: PublicComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'search', component: SearchPatientComponent },
      { path: 'professional', component: ProfessionalPageComponent },
      { path: '', redirectTo: 'search', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicRoutingModule {}
