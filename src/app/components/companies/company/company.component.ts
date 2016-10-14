import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageService } from 'angular-2-local-storage';

import { BaseComponent } from '../../base.component';

import { Company } from '../../../shared/model/company/company.model';
import { CompanyService } from '../../../shared/services/company/company.service';

@Component({
  moduleId: module.id,
  selector: 'app-company',
  templateUrl: 'company.component.html'
})
export class CompanyComponent extends BaseComponent implements OnInit {
  private model: Company;
  private companyId: number;

  constructor(private companyService: CompanyService,
    private activatedRoute: ActivatedRoute,
    localStorageService: LocalStorageService,
    router: Router) {
    super(localStorageService, router);
    this.model = new Company();
  }

  ngOnInit() {
    if (this.user) {
      this.activatedRoute.params.subscribe(params => {
        this.companyId = Number.parseInt(params['companyId'], 10);
      });
      if (this.companyId > 0) {
        this.getCompanyByID();
      }
    }
  }

  saveCompany() {
    this.companyService.saveCompany(this.model).then(result => {
      this.router.navigate(['/companies']);
    });
  }

  private getCompanyByID() {
    this.companyService.getCompanyById(this.companyId).then(result => {
      this.model = result;
    });
  }
}
