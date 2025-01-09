import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { ProfessionalService } from 'src/app/core/services/professional.service';

@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.scss'],
})
export class SidebarMenuComponent implements OnInit {
  professional$: Observable<any>;

  constructor(
    private Router: Router,
    private professionalService: ProfessionalService
  ) {
    this.professional$ = this.professionalService.me$;
  }

  ngOnInit(): void {
    this.professionalService.getMyProfessionalAccount();
  }

  logout(): void {
    localStorage.removeItem('jwtToken');
    this.Router.navigate(['/search']);
  }
}
