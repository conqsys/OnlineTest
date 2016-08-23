import { Component, EventEmitter } from '@angular/core';
import {DatePipe} from "@angular/common";
import {company_info} from './company.component';
import {ComopayInfoModel} from '../../model/companyinfo';
import {companyService} from '../../services/companyService';
import {contact_component} from '../../components/contact/contact.component';
@Component({
  selector: 'company-info',
  outputs: ['updateCompanyComponent'],
  directives: [contact_component],
  templateUrl: '../app/components/company/company.companyInfo.html',

})
export class company_info_detail {
  ComopayInfo: ComopayInfoModel;
  name: any;
  updateCompanyComponent: EventEmitter<any>;
  company_info_data: any;
  contact: any;
  call: any;
  company_contact_detail: Array<any>;
  company_Call_detail: Array<any>;
  constructor(private companyService: companyService) {
    this.updateCompanyComponent = new EventEmitter<any>();
    this.ComopayInfo = new ComopayInfoModel();


  }

  update_company(ComopayInfo) {
    this.companyService.insert_Update_Company_info(ComopayInfo).map(r => r.json())
      .subscribe(a => {
        this.ComopayInfo.Name = '';
        this.ComopayInfo.Cmp_ID = '';
        this.ComopayInfo.Phone = null;
        this.ComopayInfo.CallCount = '';
        this.ComopayInfo.Cmp_Contact = '';
        this.updateCompanyComponent.emit(a);

      })




  }

  insert_company(ComopayInfo) {
    ComopayInfo.Cmp_ID = 0;
    this.companyService.insert_Update_Company_info(ComopayInfo).map(r => r.json())
      .subscribe(a => {
        this.ComopayInfo.Name = '';
        this.ComopayInfo.Cmp_ID = '';
        this.ComopayInfo.Phone = null;
        this.ComopayInfo.CallCount = '';
        this.ComopayInfo.Cmp_Contact = '';
        this.ComopayInfo.new_Name = '';
        this.ComopayInfo.new_Phone = null;
        this.ComopayInfo.New_Cmp_ID = '';
        this.updateCompanyComponent.emit(a);

      })


  }



  sendData(company_info_data1, company_contact) {
    this.contact = company_info_data1[0];
    this.call = company_info_data1[1];
    //this.company_contact_detail=company_contact.Cmp_Name;
    this.company_contact_detail = this.contact;
    this.company_Call_detail = this.call;
    this.ComopayInfo.Name = company_contact.Cmp_Name;
    this.ComopayInfo.Cmp_ID = company_contact.Cmp_ID
    this.ComopayInfo.Phone = company_contact.Cmp_Contact;
    this.ComopayInfo.CallCount = company_contact.CallCount;
    this.ComopayInfo.Cmp_Contact = company_contact.Cmp_Contact;


  }




  contadorObjetos = [
    { name: "test1" }

  ];
}





