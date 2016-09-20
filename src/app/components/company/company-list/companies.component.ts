import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {CompanyModel} from '../../../model/company/company';
import {CompanyService} from '../../../services/company/companyService';

@Component({
  selector: 'app-companies',
  templateUrl: '../app/components/company/company-list/companies.component.html',
})
export class CompaniesComponent {
  private model:Array<CompanyModel>;
  constructor(private companyService: CompanyService, private router: Router) {
    this.getCompanies();
  }

 //get company details 
  getCompanies()
  {
           this.companyService.getCompanies().then(result => {
          this.model=result;
      })
  }
// open add company page from company list
  addCompany(){
    this.router.navigate(['/company']);
  }

}