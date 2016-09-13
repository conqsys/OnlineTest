import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {CompanyModel} from '../../../model/company/company';
import {CompanyService} from '../../../services/company/companyService';

@Component({
  selector: 'app-companies',
  templateUrl: '../app/components/company/company-list/companies.component.html',
  directives: [],
  providers: [CompanyModel, CompanyService]
})
export class CompaniesComponent {
  private model:Array<CompanyModel>;
  constructor(private companyService: CompanyService, private router: Router) {
    this.getCompanies();
  }

 
  getCompanies()
  {
       this.companyService.getCompanies().map(r => r.json())
      .subscribe(result => {
          this.model=result;
      })
  }

  addCompany(){
    this.router.navigate(['/company/'+3])
  }

}