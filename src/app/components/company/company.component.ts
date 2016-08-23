


import { Component, ViewChild } from '@angular/core';
import {DatePipe} from "@angular/common";
import {companyService} from '../../services/companyService';
import {company_info_detail} from '../companyInfo/company.companyInfo';
import {ComopayComponentModel} from '../../model/company';
import {call} from '../call/call.component';
import { NumbersOnlyDirective } from '../../directives/customdirectives';

@Component({
  selector: 'my-company',
  templateUrl: '../app/components/company/company.component.html',
  directives: [company_info_detail,NumbersOnlyDirective],
  styleUrls: ['../app/stylesheet/company.css'],


})

export class company_info {
  data: Array<any>;
  show_data: any;
  companyInfo: Array<any>;
  childcmp: any;
  errCompanyNumber:any=false;
  errCompanyName:any=false;
  ComopayComponent: ComopayComponentModel;
  @ViewChild(company_info_detail) company_info_data: company_info_detail;
  @ViewChild(call) call_info_data: call;

  constructor(private companyService: companyService) {
    this.ComopayComponent = new ComopayComponentModel();
    companyService.getCompany().map(r => r.json())
      .subscribe(a => {

        this.data = a;
      });

  }
  

  public UpdateCompanyComponent(cmp_id) {


    this.companyService.getCompany().map(r => r.json())
      .subscribe(a => {

        this.data = a;
      });
  }
  //to enable company infornation
  show_company_info(data) {


   
        this.show_data = data;
       
        this.companyService.getCompany_info(data.Cmp_ID).map(r => r.json())
          .subscribe(a => {

            this.companyInfo = a;
            var company_contact = this.company_info_data.sendData(a,data,data.Cmp_ID);



          })
      }


  

  sntCntctCmpToCountryCmp(company_info) {

    this.companyService.getCompany().map(r => r.json())
      .subscribe(a => {

        this.data = a;
      });

  }




 

  //validation
  change_event_company_name(value){
    if(value==''){

      this.errCompanyName=true;
    }
    else{
        this.errCompanyName=false;

    }
 

  }


  change_event_company_number(value){
  if(value==''){

      this.errCompanyNumber=true;
    }
    else{
        this.errCompanyNumber=false;

    }


  }

  


  




}


















