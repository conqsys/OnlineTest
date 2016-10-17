import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';

import { BaseComponent } from '../../base.component';

import { Company } from '../../../shared/model/company/company.model';
import { CompanyService } from '../../../shared/services/company/company.service';

@Component({
  moduleId: module.id,
  selector: 'app-companies',
  templateUrl: 'company-list.component.html',
})
export class CompanyListComponent extends BaseComponent implements OnInit {

  private model: Company[] = [];

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

  addCompany(): void {
    this.router.navigate(['/company/0']);
  }

  editCompany(companyId: number): void {
    this.router.navigate(['/company/' + companyId]);
  }

  private getCompanies(): void {
    this.companyService
      .getCompanies()
      .then(companies => {
        this.model = companies;
      });
  }
}
