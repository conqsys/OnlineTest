import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {BaseComponent} from '../../base.component';
import { LocalStorageService } from 'angular-2-local-storage';

import {CompanyModel} from '../../../model/company/company';
import {CompanyService} from '../../../services/company/companyService';

@Component({
  moduleId: module.id,
  selector: 'app-companies',
  templateUrl: 'companies.component.html',
})
export class CompaniesComponent extends BaseComponent implements OnInit {

  private model: Array<CompanyModel>;

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

  // get company details 
  getCompanies() {
    this.companyService.getCompanies().then(result => {
      this.model = result;
    });
  }

  // open add company page from company list
  addCompany() {
    this.router.navigate(['/company']);
  }
}
