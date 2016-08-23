import { Component, ElementRef, ViewChild, Inject, OnInit, EventEmitter } from '@angular/core';
import {CallInfoModel, Statuslist, Hourlist} from '../../model/callinfo';
import {FormGroup, Validators, FormControl, REACTIVE_FORM_DIRECTIVES} from '@angular/forms';
import {CallService} from '../../services/callService';
import {contactService} from '../../services/contactService';

import {CORE_DIRECTIVES} from '@angular/common';
import {FORM_DIRECTIVES} from '@angular/forms';
import {CallModel} from '../../model/call';



import * as moment from 'moment';
import {DATEPICKER_DIRECTIVES} from '../../../node_modules/ng2-bootstrap/ng2-bootstrap';
declare var jQuery: any;

@Component({
    selector: 'callinfo-component',
    templateUrl: '../app/components/callinfo/call.callinfo.html',
    outputs: ['updateCallComponent'],
    directives: [DATEPICKER_DIRECTIVES, CORE_DIRECTIVES]
})

export class CallInfo {

    callInfoModel: CallInfoModel;
    DCall_Name: any;
    showImage: boolean = false;
    elementRef: ElementRef;
    call_name_data: any;
    errContactName: any = false;
    errStartDate: any = false;
    errCallStartTime: any = false;
    errEndDate: any = false;
    errCallEndTime: any = false;
    errStatus: any = false;
    show_status: any;
    cmp_ID: any;

    selectedCountry: Statuslist = new Statuslist('Interested');
    Call_Status = [
        new Statuslist('Interested'),
        new Statuslist('DoNotcall'),
        new Statuslist('NoAnswer'),
    ];

    Hourlist = [
        new Hourlist('00:00:00'),
        new Hourlist('01:00:00'),
        new Hourlist('01:30:00'),
        new Hourlist('02:30:00'),
        new Hourlist('03:00:00'),
        new Hourlist('03:30:00'),
        new Hourlist('04:00:00'),
        new Hourlist('04:30:00'),
        new Hourlist('05:00:00'),
        new Hourlist('05:30:00'),
        new Hourlist('06:00:00'),
        new Hourlist('06:30:00'),
        new Hourlist('07:00:00'),
        new Hourlist('07:30:00'),
        new Hourlist('08:00:00'),
        new Hourlist('08:30:00'),
        new Hourlist('09:00:00'),
        new Hourlist('09:30:00'),
        new Hourlist('10:00:00'),
        new Hourlist('10:30:00'),
        new Hourlist('11:00:00'),
        new Hourlist('11:30:00'),
        new Hourlist('12:00:00'),
        new Hourlist('12:30:00'),
        new Hourlist('13:00:00'),
        new Hourlist('13:30:00'),
        new Hourlist('14:00:00'),
        new Hourlist('14:30:00'),
        new Hourlist('15:00:00'),
        new Hourlist('15:30:00'),
        new Hourlist('11:30:00'),
        new Hourlist('16:00:00'),
        new Hourlist('16:30:00'),
        new Hourlist('17:00:00'),
        new Hourlist('17:30:00'),
        new Hourlist('18:00:00'),
        new Hourlist('18:30:00'),
        new Hourlist('19:00:00'),
        new Hourlist('19:30:00'),
        new Hourlist('20:00:00'),
        new Hourlist('20:30:00'),
        new Hourlist('17:00:00'),
        new Hourlist('17:30:00'),
        new Hourlist('21:00:00'),
        new Hourlist('21:30:00'),
        new Hourlist('22:00:00'),
        new Hourlist('22:30:00'),
        new Hourlist('23:00:00'),
        new Hourlist('23:30:00')
    ]

    updateCallComponent: EventEmitter<any>;

    constructor(private callservice: CallService, private callModel: CallModel, private contactService: contactService, @Inject(ElementRef) elementRef: ElementRef) {
        this.elementRef = elementRef;
        this.show_status = true;
        this.updateCallComponent = new EventEmitter<any>();
        this.callModel = new CallModel();
        this.callInfoModel = new CallInfoModel();
        this.callInfoModel.Call_Name = [];

    }

    // getcontactlist(Cmp_ID) {
    //     this.contactService.getAllContactDetail(Cmp_ID).map(r => r.json())
    //         .subscribe(data => {
    //             this.callInfoModel.Name = data[0];
    //         });
    // }
    getcontactlist(data) {
        this.cmp_ID = data.cmp_ID;
        this.contactService.getAllContactDetail(data).map(r => r.json())
            .subscribe(data => {
                this.callInfoModel.Call_Name = data;

            });
        jQuery(this.elementRef.nativeElement).find('.datepicker').datepicker({ dateFormat: "dd-MM-yy" });
        jQuery(this.elementRef.nativeElement).find('.datepickerE').datepicker({ dateFormat: "dd-MM-yy" });
      
    }

    sendDataTOcallInfo(companyInfoDetail) {
        this.getcontactlist(companyInfoDetail);
        var moment = require('moment');
        this.callInfoModel.Call_ID = companyInfoDetail.Call_ID;
        this.callInfoModel.Cmp_ID = companyInfoDetail.cmp_ID;
        this.callInfoModel.Name = companyInfoDetail.Call_Name;
        this.callInfoModel.Call_Startdate = moment(companyInfoDetail.Call_Startdate).format("DD-MM-YYYY ");
        this.callInfoModel.Call_Enddate = moment(companyInfoDetail.Call_Enddate).format("DD-MM-YYYY ");
        this.callInfoModel.call_Status = companyInfoDetail.Call_Status
        this.callInfoModel.Endtime = companyInfoDetail.Call_Endtime
        this.callInfoModel.Starttime = companyInfoDetail.Call_Starttime
        jQuery(this.elementRef.nativeElement).find('#datepicker').datepicker({ dateFormat: "dd-MM-yy" });
        jQuery(this.elementRef.nativeElement).find('#datepickerE').datepicker({ dateFormat: "dd-MM-yy" });
       
        this.show_status = false;

    }



    // getCallInfo(callinfo, call) {
    //     this.callInfoModel.Call_Name = call;
    //     this.callservice.getcallinfo(callinfo.Call_ID).map(r => r.json())
    //         .subscribe(data => {
    //             var moment = require('moment');
    //             this.callInfoModel.Call_ID = data[0][0].Call_ID;
    //             this.callInfoModel.Cmp_ID = data[0][0].Cmp_ID
    //             this.callInfoModel.Call_Startdate = moment(data[0][0].Call_Startdate).format("DD-MM-YYYY ");
    //             this.callInfoModel.Call_Enddate = moment(data[0][0].Call_Enddate).format("DD-MM-YYYY ");
    //             this.callInfoModel.Name = data[0][0].Call_Name;
    //             this.callInfoModel.call_Status = data[0][0].Call_Status
    //             this.callInfoModel.Endtime = data[0][0].Call_Endtime
    //             this.callInfoModel.Starttime = data[0][0].Call_Starttime

    //         });
    //     jQuery(this.elementRef.nativeElement).find('#datepicker').datepicker({ dateFormat: "dd-MM-yy" });
    //     jQuery(this.elementRef.nativeElement).find('#datepickerE').datepicker({ dateFormat: "dd-MM-yy" });
    //     jQuery(this.elementRef.nativeElement).find('#timepicker').timepicker({ 'timeFormat': 'HH:mm:ss' });
    //     jQuery(this.elementRef.nativeElement).find('#timepickerE').timepicker({ 'timeFormat': 'HH:mm:ss' });

    // }

    // toggleImage(): void {
    //     this.showImage = !this.showImage;
    // }

    updatecallinfo(status, callinfodata) {
        var moment = require('moment');
        callinfodata.Cmp_ID = this.cmp_ID;
        if (status == 0) {
            callinfodata.Call_Startdate = moment(moment(callinfodata.Call_Startdate).toDate()).format("YYYY-MM-DD");
            callinfodata.Call_Enddate = moment(moment(callinfodata.Call_Enddate).toDate()).format("YYYY-MM-DD")

            // moment(callinfodata.Call_Startdate).format("DD-MM-YYYY")

            if ((callinfodata.Call_ID != null) && (callinfodata.Name != null) && (callinfodata.Call_Startdate != null) && (callinfodata.Call_Startdate != "Invalid date") && (callinfodata.Starttime != null) && (callinfodata.Call_Enddate != null) && (callinfodata.Endtime != null) && (callinfodata.call_Status != null) && (callinfodata.Call_Enddate != "Invalid date")) {
                if (callinfodata.Call_ID != null) {
                    this.callservice.savecallinfodetail(callinfodata).map(r => r.json())
                        .subscribe(a => {
                              callinfodata.Name = ''; 
                             callinfodata.Call_Startdate = ''
                            
                              callinfodata.Starttime ='';
                              callinfodata.Call_Enddate = ''
                               callinfodata.call_Status='';
                                callinfodata.Endtime='';
                            this.updateCallComponent.emit(a);


                        })
                }
            }
            else {

                if (callinfodata.Name == null) {

                    this.errContactName = true;
                }

                else if (callinfodata.Call_Startdate != null || callinfodata.Call_Startdate != "Invalid date") {
                    this.errStartDate = true;
                }
                else if (callinfodata.Starttime != null) {
                    this.errCallStartTime = true;
                }
                else if (callinfodata.Call_Enddate != null || callinfodata.Call_Enddate != "Invalid date") {
                    this.errEndDate = true;
                }
                else if (callinfodata.Endtime != null) {
                    this.errCallEndTime = true;
                }
                else if (callinfodata.call_Status != null) { this.errStatus = true; }


            }

        }
        else {




            callinfodata.new_Call_Startdate = moment(moment(callinfodata.new_Call_Startdate).toDate()).format("YYYY-MM-DD");

            callinfodata.new_Call_Enddate = moment(moment(callinfodata.new_Call_Enddate).toDate()).format("YYYY-MM-DD");

            if ((callinfodata.New_Name != null) && (callinfodata.new_Call_Startdate != null) && (callinfodata.new_Call_Startdate != "Invalid date") && (callinfodata.new_Starttime != null) && (callinfodata.new_Call_Enddate != null) && (callinfodata.new_Call_Enddate != null) && (callinfodata.new_call_Status != null) && (callinfodata.new_Call_Enddate != "Invalid date")) {
                callinfodata.Call_ID = undefined;
                this.callservice.savecallinfodetail(callinfodata).map(r => r.json())
                    .subscribe(a => {
                        // this.callservice.getUpdateDetail(a).map(r => r.json())
                        //     .subscribe(a => {
                             callinfodata.New_Name = ''; 
                             callinfodata.new_Call_Startdate = ''
                            
                              callinfodata.new_Starttime ='';
                              callinfodata.new_Call_Enddate = ''
                               callinfodata.new_call_Status='';
                                callinfodata.new_Endtime='';
                                this.callModel.company_Call_detail = a;
                                this.updateCallComponent.emit(a);
                                // this.showdatepickercall = false;
                                //this.updateParentComponent.emit(a);

                            })

                    // })
            }

            else {


             

                //  if(callinfodata.Name != null){

                //     this.errContactName = true;
                // }

                // else if(callinfodata.Call_Startdate != null || callinfodata.Call_Startdate != "Invalid date"){
                //      this.errStartDate = true;
                // }
                // else if(callinfodata.Starttime != null){
                //       this.errCallStartTime = true;
                // }
                // else if(callinfodata.Call_Enddate != null || callinfodata.Call_Enddate != "Invalid date"){
                //       this.errEndDate = true;
                // }
                // else if(callinfodata.Endtime != null){
                //      this.errCallEndTime = true;
                // }
                //  else if(callinfodata.call_Status != null){ this.errStatus = true;}         


            }



        }


    }



    onChange(deviceValue) {
        console.log(deviceValue);
    }


    change_event_contact_name(value) {
        if (value == '') {

            this.errContactName = true;
        }
        else {
            this.errContactName = false;

        }


    }

    change_event_Sdate(value) {

        if (value == '') {

            this.errStartDate = true;
        }
        else {
            this.errStartDate = false;

        }
    }

    change_event_Starttime(value) {

        if (value == '') {

            this.errCallStartTime = true;
        }
        else {
            this.errCallStartTime = false;

        }
    }


    change_event_Enddate(value) {

        if (value == '') {

            this.errEndDate = true;
        }
        else {
            this.errEndDate = false;

        }
    }


    change_event_Endtime(value) {

        if (value == '') {

            this.errCallEndTime = true;
        }
        else {
            this.errCallEndTime = false;

        }
    }

    change_event_Status(value) {

        if (value == '') {

            this.errStatus = true;
        }
        else {
            this.errStatus = false;

        }
    }

    send_call_default_info(){

        this.show_status=true;
    }



}