
import { Component, ViewChild, EventEmitter } from '@angular/core';
import {DatePipe} from "@angular/common";
import {company_info} from '../company/company.component';
import {companyService} from '../../services/companyService';
import {call} from '../call/call.component';
import {contact_component} from '../../components/contact/contact.component';
import {contact_Info} from '../../components/contactInfo/contact.contactInfo';
import { NumbersOnlyDirective } from '../../directives/customdirectives';
import {CallInfo} from '../callInfo/call.callInfo';
import {ComopayInfoModel} from '../../model/companyinfo';
import {CallModel} from '../../model/call';


@Component({
  selector: 'company-info',
  outputs: ['updateCompanyComponent', 'sntCntctCmpToCountryCmp', 'sntCllCmpToCountryCmp','updateCompanyCall'],
  providers: [CallModel],
  directives: [contact_component,call, NumbersOnlyDirective, contact_Info, CallInfo],
  templateUrl: '../app/components/companyInfo/company.companyInfo.html',

})

export class company_info_detail {

  @ViewChild(call) call_info_data: call;
  @ViewChild(contact_component) contact_info_data: contact_component;
  @ViewChild(contact_Info) contact_info_detail: contact_Info;
  @ViewChild(CallInfo) CallInfo: CallInfo;
  ComopayInfo: ComopayInfoModel;
  name: any;
  updateCompanyComponent: EventEmitter<any>;
  sntCntctCmpToCountryCmp: EventEmitter<any>;
  sntCllCmpToCountryCmp: EventEmitter<any>;
  updateCompanyCall:EventEmitter<any>;
  company_info_data: any;
  contact: any;
  call: any;

  errCompanyName: any = false;
  errCompanyName_insert: any = false;
  errCompanyPhone: any = false;
  errComperrCompanyName_insert: any = false;
  company_contact_detail: Array<any>;
  company_Call_detail: Array<any>;
  showCompanyDetail: boolean = true;
  is_Show:any=false;
  //for tab routing
  contadorObjetos = [
    { name: "test1" }

  ];

  constructor(private companyService: companyService, private callModel: CallModel) {

    this.updateCompanyComponent = new EventEmitter<any>();
    this.sntCntctCmpToCountryCmp = new EventEmitter<any>();
    this.sntCllCmpToCountryCmp = new EventEmitter<any>();
    this.updateCompanyCall=new EventEmitter<any>();
    this.callModel = new CallModel();
    this.ComopayInfo = new ComopayInfoModel();
   
   // this.CallInfo.demo_test();
  


  }

  insert_update_company(status, ComopayInfo_data) {

    if (status == 0) {
      ComopayInfo_data.status = status;
      if ((ComopayInfo_data.Name != "" ) && (ComopayInfo_data.Name != null) && (ComopayInfo_data.Name != undefined)) {
        this.companyService.insert_Update_Company_info(ComopayInfo_data).map(r => r.json())
          .subscribe(a => {

            this.ComopayInfo.Name = '';
             this.is_Show=true;
           // this.ComopayInfo.Cmp_ID = '';
            this.ComopayInfo.Phone = null;
            this.ComopayInfo.CallCount = '';
            this.ComopayInfo.Cmp_Contact = '';
            this.updateCompanyComponent.emit(a);

          })

      } else {


      }
    }
    else {


      ComopayInfo_data.status = status;
      if (ComopayInfo_data.new_Name != undefined && ComopayInfo_data.new_Name != null && ComopayInfo_data.new_Name != '') {
        this.errComperrCompanyName_insert = false;
        this.companyService.insert_Update_Company_info(ComopayInfo_data).map(r => r.json())
          .subscribe(a => {
           
            this.ComopayInfo.new_Name = '';
            this.ComopayInfo.new_Phone = null;
            this.updateCompanyComponent.emit(a);
          })
      }
      else {
        this.errComperrCompanyName_insert = true;

      }

    }
  }

  sendData(company_info_data1, company_contact, cmpId) {
     this.is_Show=false;
    this.contact_info_detail.send_Contact_default_info();
    this.CallInfo.send_call_default_info();
    this.showCompanyDetail = false;
    this.errComperrCompanyName_insert = false;
    this.errCompanyName = false;
    this.errCompanyPhone = false;
    this.contact = company_info_data1[0];
    this.call = company_info_data1[1];

    this.ComopayInfo.get_company_Cmp_Name = company_contact.Cmp_Name;
    this.ComopayInfo.get_company_Cmp_Contact = company_contact.Cmp_Contact;
    this.ComopayInfo.get_company_Cmp_ID = company_contact.Cmp_ID;
    this.ComopayInfo.Name = company_contact.Cmp_Name;
    this.ComopayInfo.Cmp_ID = company_contact.Cmp_ID;
    this.ComopayInfo.Phone = company_contact.Cmp_Contact;
    this.ComopayInfo.CallCount = company_contact.CallCount;
    this.ComopayInfo.Cmp_Contact = company_contact.Cmp_Contact;

    this.contact_info_data.sendContactData(this.contact, cmpId);
    this.contact_info_detail.sendContactData_info(cmpId);

    this.call_info_data.sendCallData(this.call, cmpId);
    this.CallInfo.getcontactlist(company_contact);


  }
  updateCompanyInfo(company_info_data) {

    if (company_info_data.id != 0) {

      this.contact_info_data.senddata(company_info_data);
       this.CallInfo.getcontactlist(company_info_data);
    }
    else {

      this.sntCntctCmpToCountryCmp.emit(company_info_data);
      this.contact_info_data.senddata(company_info_data);
      this.CallInfo.getcontactlist(company_info_data);
    }


    // this.sntCntctCmpToCountryCmp.emit(company_info_data);

  }

  updateParentComponent(a) {
    this.sntCllCmpToCountryCmp.emit(a)
  }

  

  //to get  data from contact_component and send it contact_Info
  getContactForparent(contact_detail) {
    this.contact_info_detail.sendData(contact_detail);
   // this.CallInfo.getcontactlist(contact_detail);
  }

  //to get call from call component
  companyInfoDetail(companyInfoDetail) {
    this.CallInfo.sendDataTOcallInfo(companyInfoDetail);

  }

  //validation
  change_event_company_name(value) {
    if (value == '') {

      this.errCompanyName = true;
    }
    else {
      this.errCompanyName = false;

    }


  }

  change_event_company_name_insert(value) {
    if (value == '') {

      this.errComperrCompanyName_insert = true;
    }
    else {
      this.errComperrCompanyName_insert = false;

    }


  }

  change_event_company_Phone(value) {
    if (value == '') {

      this.errCompanyPhone = true;
    }
    else {
      this.errCompanyPhone = false;

    }


  }




  cancel_button() {

    this.showCompanyDetail = true;
  }



  popup_insert__button() {

    this.showCompanyDetail = true;


  }
  updateCallComponent(data){

      this.updateCompanyCall.emit(data);
      this.call_info_data.updateCall(data);

  }






}




