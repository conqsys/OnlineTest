
import { Component, OnInit } from '@angular/core';
import {CompanyModel} from '../../model/company/company';
import {CompanyService} from '../../services/company/companyService';
@Component({
  moduleId: module.id,
  selector: 'app-company',
  templateUrl: 'company.component.html',
  directives: [],
  providers: [CompanyModel, CompanyService]
})
export class CompanyComponent {
  private model: CompanyModel;
  constructor(private Service: CompanyService) {
    this.bydefault();
  }

  bydefault() {
    this.model = new CompanyModel();
    this.model.CompanyID = 0;
    this.model.Name = "";
    this.model.CreatedBy = 'vipin';
    this.model.ModifiedBy = 'vipin';   
  }

  addCategory() {
    this.Service.saveCompany(this.model).map(r => r.json())
      .subscribe(a => {
        if (a.success) {
          alert("category inserted!");
        
        }
        else {
          alert(a.data);
        }
      });
  }
}