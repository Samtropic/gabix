import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfessionalPatientsComponent } from './professional-patients/professional-patients.component';
import { ProtectedComponent } from './protected.component';
import { MyAccountComponent } from './my-account/my-account.component';

const routes: Routes = [
  {
    path: 'me',
    component: MyAccountComponent,
  },
  {
    path: '',
    component: ProtectedComponent,
    children: [
      {
        path: 'patients',
        component: ProfessionalPatientsComponent,
      },
      { path: '', redirectTo: 'patients', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProtectedRoutingModule {}
