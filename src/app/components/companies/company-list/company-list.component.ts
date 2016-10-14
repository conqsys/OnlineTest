import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';

import { BaseComponent } from '../../base.component';

import { Company } from '../../../model/company/company.model';
import { CompanyService } from '../../../services/company/company.service';

@Component({
  moduleId: module.id,
  selector: 'app-companies',
  templateUrl: 'company-list.component.html',
})
export class CompanyListComponent extends BaseComponent implements OnInit {

  model: Company[] = [];

  constructor(private companyService: CompanyService,
    localStorageService: LocalStorageService,
    router: Router) {
    super(localStorageService, router);
  }

  ngOnInit(): void {
    if (this.user) {
      this.getCompanies();
    }
  }

  getCompanies() {
    this.companyService.getCompanies().then(companies => {
      this.model = companies;
    });
  }

  addCompany() {
    this.router.navigate(['/company/0']);
  }
}
