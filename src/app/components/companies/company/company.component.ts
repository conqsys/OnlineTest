import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageService } from 'angular-2-local-storage';

import { BaseComponent } from '../../base.component';

import { Company } from '../../../model/company/company.model';
import { CompanyService } from '../../../services/company/company.service';

@Component({
  moduleId: module.id,
  selector: 'app-company',
  templateUrl: 'company.component.html'
})
export class CompanyComponent extends BaseComponent implements OnInit {
  model: Company;
  errorMesssage: string;
  company_id: number;

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
        this.company_id = Number.parseInt(params['company_id'], 10);
      });
      if (this.company_id > 0) {
        this.getCompanyByID(this.company_id);
      } else {
        this.initializeModel();
      }
    }
  }

  initializeModel() {
    this.model.company_id = 0;
    this.model.company_title = '';
    this.model.company_address = '';
    this.model.company_phone = '';
    this.model.company_url = '';
    this.model.company_email = '';
    this.model.company_hr_phone = '';
    this.model.company_hr_emailid = '';
    this.model.smtp_host = '';
    this.model.smtp_port = 0;
    this.model.smtp_username = '';
    this.model.smtp_password = '';
    this.model.created_by = this.user.user_id;
    this.model.updated_by = this.user.user_id;
  }

  saveCompany() {
    this.model.updated_by = this.user.user_id;
    this.companyService.saveCompany(this.model).then(result => {
      this.router.navigate(['/companies']);
    });
  }

  getCompanyByID(company_id: any) {
    this.companyService.getCompanyById(company_id).then(result => {
      this.model = result;
    });
  }
}
