
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CompanyModel } from '../../model/company/company';
import { CompanyService } from '../../services/company/companyService';
@Component({
  moduleId: module.id,
  selector: 'app-company',
  templateUrl: 'company.component.html',
  providers: [CompanyModel, CompanyService]
})
export class CompanyComponent {
  private model: CompanyModel;
  company_id: any;
  paramsSub: any;
  constructor(private companyService: CompanyService, private activatedRoute: ActivatedRoute) {
    //this.model = new Array<CompanyModel>
    this.bydefault();
    
  }

  ngOnInit() {
    this.paramsSub = this.activatedRoute.params.subscribe(params => {
      this.company_id = Number.parseInt(params['id'], 10);
      if (this.company_id > 0)
        this.getCompanyByID(this.company_id);
    });
  }

  ngOnDestroy() {
    this.paramsSub.unsubscribe();
  }

  bydefault() {
    this.model = new CompanyModel();
    this.model.company_title = "";
    this.model.company_address = "";
    this.model.company_phone = "";
    this.model.company_url = "";
    this.model.company_email = "";
    this.model.company_hr_phone = "";
    this.model.company_hr_emailid = "";
    this.model.created_by = 'Harendra Maurya';
    this.model.updated_by = 'Harendra Maurya';
  }

  addCompany() {

    if (this.model.company_title == "") {
      alert("Please enter company title.");
      return;
    }
    if( this.model.company_address ==  ""){
        alert("Please enter company address");
          return;
    }
    if( this.model.company_phone  ==  ""){
        alert("Please enter company phone");
          return;
    }
    if (this.model.company_url == "") {
      alert("Please enter company url.");
      return;
    }

    if (this.model.company_email == "") {
      alert("Please enter company title.");
      return;
    }

    if (this.model.company_hr_phone == "") {
      alert("Please enter company hr phone.");
      return;
    }

    if (this.model.company_hr_emailid == "") {
      alert("Please enter company hr emailID.");
      return;
    }

    this.companyService.saveCompany(this.model).then(result => {
      if (result) {
        alert("Company saved successfully.!");
        this.model.company_title = "";
        this.model.company_url = "";
        this.model.company_address = "";
        this.model.company_hr_emailid = "";
        this.model.company_phone = "";
        this.model.company_hr_phone = "";
        this.model.company_email = "";
      }
      else {
        alert(result);
      }
    });

  }

  getCompanyByID(id: any) {
    this.companyService.getCompanyById(id).then(result => {
      this.model = result;
    })
  }


}