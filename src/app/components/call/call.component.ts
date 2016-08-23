import { Component, ElementRef, ViewChild, Inject, OnInit, EventEmitter } from '@angular/core';
import {company_info_detail} from '../companyInfo/company.companyInfo';
import {CallModel} from '../../model/call';
import {CallInfo} from '../callinfo/call.callinfo'
import {CallInfoModel, Statuslist, Hourlist} from '../../model/callinfo';
import {CallService} from '../../services/callService';
import * as moment from 'moment';
declare var jQuery: any;
@Component({
    selector: 'call-component',
    templateUrl: '../app/components/call/call.component.html',
    directives: [CallInfo],
    outputs: ['updateParentComponent','companyInfoDetail']
})

export class call  {

    @ViewChild(CallInfo) call_info: CallInfo;
   
    callModel: CallModel;
    callInfoModel: CallInfoModel;
    show_data: any;
    showdatepickercall: boolean = false;
    elementRef: ElementRef;
    cmpid: any;
    updateParentComponent: EventEmitter<any>;
    companyInfoDetail: EventEmitter<any>;
    errContactName: any = false;
    errStartDate: any = false;
    errCallStartTime: any = false;
    errEndDate: any = false;
    errCallEndTime: any = false;
    errStatus: any = false;
    CMP_ID:any;

    // selectedCountry: Statuslist = new Statuslist('Interested');
    // Call_Status = [
    //     new Statuslist('Interested'),
    //     new Statuslist('DoNotcall'),
    //     new Statuslist('NoAnswer'),

    // ];
    // Hourlist = [
    //     new Hourlist('00:00:00'),
    //     new Hourlist('01:00:00'),
    //     new Hourlist('01:30:00'),
    //     new Hourlist('02:30:00'),
    //     new Hourlist('03:00:00'),
    //     new Hourlist('03:30:00'),
    //     new Hourlist('04:00:00'),
    //     new Hourlist('04:30:00'),
    //     new Hourlist('05:00:00'),
    //     new Hourlist('05:30:00'),
    //     new Hourlist('06:00:00'),
    //     new Hourlist('06:30:00'),
    //     new Hourlist('07:00:00'),
    //     new Hourlist('07:30:00'),
    //     new Hourlist('08:00:00'),
    //     new Hourlist('08:30:00'),
    //     new Hourlist('09:00:00'),
    //     new Hourlist('09:30:00'),
    //     new Hourlist('10:00:00'),
    //     new Hourlist('10:30:00'),
    //     new Hourlist('11:00:00'),
    //     new Hourlist('11:30:00'),
    //     new Hourlist('12:00:00'),
    //     new Hourlist('12:30:00'),
    //     new Hourlist('13:00:00'),
    //     new Hourlist('13:30:00'),
    //     new Hourlist('14:00:00'),
    //     new Hourlist('14:30:00'),
    //     new Hourlist('15:00:00'),
    //     new Hourlist('15:30:00'),
    //     new Hourlist('11:30:00'),
    //     new Hourlist('16:00:00'),
    //     new Hourlist('16:30:00'),
    //     new Hourlist('17:00:00'),
    //     new Hourlist('17:30:00'),
    //     new Hourlist('18:00:00'),
    //     new Hourlist('18:30:00'),
    //     new Hourlist('19:00:00'),
    //     new Hourlist('19:30:00'),
    //     new Hourlist('20:00:00'),
    //     new Hourlist('20:30:00'),
    //     new Hourlist('17:00:00'),
    //     new Hourlist('17:30:00'),
    //     new Hourlist('21:00:00'),
    //     new Hourlist('21:30:00'),
    //     new Hourlist('22:00:00'),
    //     new Hourlist('22:30:00'),
    //     new Hourlist('23:00:00'),
    //     new Hourlist('23:30:00')
    // ]


    constructor(private callservice: CallService, @Inject(ElementRef) elementRef: ElementRef) {
        this.elementRef = elementRef;
        this.updateParentComponent = new EventEmitter<any>();
        this.callModel = new CallModel();
        this.callInfoModel = new CallInfoModel();
        this.companyInfoDetail=new EventEmitter<any>();
    }

    // ngOnInit() {
    //     jQuery(this.elementRef.nativeElement).find('.datepicker').datepicker({ dateFormat: "dd-MM-yy" });
    //     jQuery(this.elementRef.nativeElement).find('.datepickerE').datepicker({ dateFormat: "dd-MM-yy" });
    //     jQuery(this.elementRef.nativeElement).find('.timepicker').timepicker();
    //     jQuery(this.elementRef.nativeElement).find('.timepickerE').timepicker();
    // }



    sendCallData(call, cmpid) {
        
        this.callModel.company_Call_detail = call;
        this.CMP_ID = cmpid;

   
}


    sendCallInfoData(calldata) {
        if (this.showdatepickercall) {
            if (this.show_data.Call_ID == calldata.Call_ID) {
                this.showdatepickercall = false;
            }
            else {
              
                this.show_data = calldata;
                calldata.cmp_ID=this.CMP_ID;
                this.showdatepickercall = true;
                this.companyInfoDetail.emit(calldata)
              //  this.company_info_detail.getParentCall(calldata, this.callModel.company_Call_detail);
               // this.call_info.getCallInfo(calldata, this.callModel.company_Call_detail);

            }
        }
        else {

            this.show_data = calldata;
            this.showdatepickercall = true;
             calldata.cmp_ID=this.CMP_ID;
            this.companyInfoDetail.emit(calldata)
           // this.company_info_detail.getParentCall(calldata, this.callModel.company_Call_detail);
          //  this.call_info.getCallInfo(calldata, this.callModel.company_Call_detail);
        }


    }

    // updatecallinfo(callinfodata) {
    //     var moment = require('moment');
     
    //     callinfodata.Call_Startdate = moment(moment(callinfodata.new_Call_Startdate).toDate()).format("YYYY-MM-DD");

    //     callinfodata.Call_Enddate = moment(moment(callinfodata.new_Call_Enddate).toDate()).format("YYYY-MM-DD");
    //     if ((callinfodata.New_Name != null) && (callinfodata.new_Call_Startdate != null) && (callinfodata.new_Call_Startdate != "Invalid date") && (callinfodata.new_Starttime != null) && (callinfodata.Call_Enddate != null) && (callinfodata.new_Call_Enddate != null) && (callinfodata.new_call_Status != null) && (callinfodata.new_Call_Enddate != "Invalid date")) {
    //         this.callservice.savecallinfodetail(callinfodata).map(r => r.json())
    //             .subscribe(a => {
    //                 this.callservice.getUpdateDetail(a).map(r => r.json())
    //                     .subscribe(a => {
    //                         this.callModel.company_Call_detail = a;
    //                         this.showdatepickercall = false;
    //                         this.updateParentComponent.emit(a);

    //                     })

    //             })
    //     }

    //     else {


    //         alert('Please Fill All')

    //         //  if(callinfodata.Name != null){

    //         //     this.errContactName = true;
    //         // }

    //         // else if(callinfodata.Call_Startdate != null || callinfodata.Call_Startdate != "Invalid date"){
    //         //      this.errStartDate = true;
    //         // }
    //         // else if(callinfodata.Starttime != null){
    //         //       this.errCallStartTime = true;
    //         // }
    //         // else if(callinfodata.Call_Enddate != null || callinfodata.Call_Enddate != "Invalid date"){
    //         //       this.errEndDate = true;
    //         // }
    //         // else if(callinfodata.Endtime != null){
    //         //      this.errCallEndTime = true;
    //         // }
    //         //  else if(callinfodata.call_Status != null){ this.errStatus = true;}         


    //     }





    // }


    // updateCallComponent(data) {

    //     this.callservice.getUpdateDetail(data).map(r => r.json())
    //         .subscribe(a => {
    //             this.callModel.company_Call_detail = a;
    //             this.showdatepickercall = false;

    //         })

    // }

    deleteCall(calldata, index) {

        this.callservice.deleteCall(calldata.Call_ID).
            subscribe(a => {
                this.callModel.company_Call_detail.splice(index, 1);
                this.updateParentComponent.emit(a);

            })
    }

updateCall(data){


 this.callservice.getUpdateDetail(data).map(r => r.json())
            .subscribe(a => {
                this.callModel.company_Call_detail = a;
                // this.showdatepickercall = false;

            })

}



    // change_event_contact_name(value) {
    //     if (value == '') {

    //         this.errContactName = true;
    //     }
    //     else {
    //         this.errContactName = false;

    //     }


    // }

    // change_event_Sdate(value) {

    //     if (value == '') {

    //         this.errStartDate = true;
    //     }
    //     else {
    //         this.errStartDate = false;

    //     }
    // }

    // change_event_Starttime(value) {

    //     if (value == '') {

    //         this.errCallStartTime = true;
    //     }
    //     else {
    //         this.errCallStartTime = false;

    //     }
    // }


    // change_event_Enddate(value) {

    //     if (value == '') {

    //         this.errEndDate = true;
    //     }
    //     else {
    //         this.errEndDate = false;

    //     }
    // }


    // change_event_Endtime(value) {

    //     if (value == '') {

    //         this.errCallEndTime = true;
    //     }
    //     else {
    //         this.errCallEndTime = false;

    //     }
    // }

    // change_event_Status(value) {

    //     if (value == '') {

    //         this.errStatus = true;
    //     }
    //     else {
    //         this.errStatus = false;

    //     }
    }

   





