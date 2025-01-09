import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientDto } from 'src/app/core/dtos';
import { DateFormatService } from 'src/app/core/services/date-format.service';

@Component({
  selector: 'app-patient-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.scss'],
})
export class PatientDetailsComponent {
  patientData: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public readonly dateFormatService: DateFormatService
  ) {}

  ngOnInit() {
    const queryParams = this.route.snapshot.queryParams;
    if (queryParams['patientData']) {
      this.patientData = JSON.parse(queryParams['patientData']);
    } else {
      this.goBack();
    }
  }

  goBack() {
    this.router.navigate(['/patients']);
  }
}
