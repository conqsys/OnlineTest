import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyModel } from '../../model/company/company';
import { CompanyService } from '../../services/company/companyService';

import {BaseComponent} from '../base.component';
import { LocalStorageService } from 'angular-2-local-storage';

@Component({
  moduleId: module.id,
  selector: 'app-company',
  templateUrl: 'company.component.html'
})
export class CompanyComponent extends BaseComponent implements OnInit {
  model: CompanyModel;
  errorMesssage: string;
  company_id: number;
  paramsSub: any;
  constructor(private companyService: CompanyService,
    private activatedRoute: ActivatedRoute,
    localStorageService: LocalStorageService,
    router: Router) {
    super(localStorageService, router);
  }

  ngOnInit() {
    if (this.user) {
      this.bydefault();
      this.paramsSub = this.activatedRoute.params.subscribe(params => {
        this.company_id = Number.parseInt(params['id'], 10);
        if (this.company_id > 0) {
          this.getCompanyByID(this.company_id);
        }
      });
    }
  }

  ngOnDestroy() {
    this.paramsSub.unsubscribe();
  }

  bydefault() {
    this.model = new CompanyModel();
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

  // save company  
  addCompany() {

    // if (this.model.company_title == "") {
    //   this.errorMesssage ="Please enter company title.";
    //   return;
    // }
    // if( this.model.company_address ==  ""){
    //      this.errorMesssage ="Please enter company address.";
    //       return;
    // }
    // if( this.model.company_phone  ==  ""){
    //     alert("Please enter company phone");
    //       return;
    // }
    // if (this.model.company_url == "") {
    //   alert("Please enter company url.");
    //   return;
    // }

    // if (this.model.company_email == "") {
    //   alert("Please enter company title.");
    //   return;
    // }

    // if (this.model.company_hr_phone == "") {
    //   alert("Please enter company hr phone.");
    //   return;
    // }

    // if (this.model.company_hr_emailid == "") {
    //   alert("Please enter company hr emailID.");
    //   return;
    // }

    this.companyService.saveCompany(this.model).then(result => {
      if (result) {
        alert('Company saved successfully.!');
        this.router.navigate(['/companylist']);
      } else {
        alert(result);
      }
    });
  }

  // get companies details from service
  getCompanyByID(id: any) {
    this.companyService.getCompanyById(id).then(result => {
      this.model = result;
    });
  }
}
