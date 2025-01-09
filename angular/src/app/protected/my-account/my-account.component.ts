import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ProfessionalService } from 'src/app/core/services/professional.service';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss'],
})
export class MyAccountComponent implements OnInit {
  professional$: Observable<any>;
  formGroup: UntypedFormGroup;
  isLoading = true;

  
  constructor(
    private Router: Router,
    private professionalService: ProfessionalService,
    private formBuilder: UntypedFormBuilder
  ) {
    this.professional$ = this.professionalService.me$;
    this.formGroup = this.formBuilder.group({
      isPrlEnable: [],
    });
  }

  ngOnInit(): void {
    this.professionalService.getMyProfessionalAccount();
    this.professional$.subscribe((professional) => {
      if (professional) {
        this.formGroup
          .get('isPrlEnable')
          ?.setValue(professional.services.prl.enabled);
        this.formGroup
          .get('isPrlEnable')
          ?.valueChanges
          .subscribe((value) => {
            this.professionalService
              .updatePrlService({ enabled: value })
              .pipe()
              .subscribe();
          });
      }
    });
  }
}
