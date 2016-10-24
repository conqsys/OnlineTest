import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
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
    router: Router,
    location: Location) {
    super(localStorageService, router, location);
    this.model = new Company();
  }

  ngOnInit(): void {
    if (this.user) {
      this.activatedRoute.params.subscribe((params: any) => {
        this.companyId = +params['companyId'];
      });
      if (this.companyId > 0) {
        this.getCompanyByID();
      }
    }
  }

  saveCompany(): void {
    this.companyService
      .saveCompany(this.model)
      .then(result => {
        this.router.navigate(['/companies']);
      });
  }

  private getCompanyByID(): void {
    this.companyService
      .getCompanyById(this.companyId)
      .then(result => {
        this.model = result;
      });
  }
}
