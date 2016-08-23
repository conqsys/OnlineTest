"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require('@angular/core');
var callinfo_1 = require('../../model/callinfo');
var callService_1 = require('../../services/callService');
var contactService_1 = require('../../services/contactService');
var common_1 = require('@angular/common');
var call_1 = require('../../model/call');
var ng2_bootstrap_1 = require('../../../node_modules/ng2-bootstrap/ng2-bootstrap');
var CallInfo = (function () {
    function CallInfo(callservice, callModel, contactService, elementRef) {
        this.callservice = callservice;
        this.callModel = callModel;
        this.contactService = contactService;
        this.showImage = false;
        this.errContactName = false;
        this.errStartDate = false;
        this.errCallStartTime = false;
        this.errEndDate = false;
        this.errCallEndTime = false;
        this.errStatus = false;
        this.selectedCountry = new callinfo_1.Statuslist('Interested');
        this.Call_Status = [
            new callinfo_1.Statuslist('Interested'),
            new callinfo_1.Statuslist('DoNotcall'),
            new callinfo_1.Statuslist('NoAnswer'),
        ];
        this.Hourlist = [
            new callinfo_1.Hourlist('00:00:00'),
            new callinfo_1.Hourlist('01:00:00'),
            new callinfo_1.Hourlist('01:30:00'),
            new callinfo_1.Hourlist('02:30:00'),
            new callinfo_1.Hourlist('03:00:00'),
            new callinfo_1.Hourlist('03:30:00'),
            new callinfo_1.Hourlist('04:00:00'),
            new callinfo_1.Hourlist('04:30:00'),
            new callinfo_1.Hourlist('05:00:00'),
            new callinfo_1.Hourlist('05:30:00'),
            new callinfo_1.Hourlist('06:00:00'),
            new callinfo_1.Hourlist('06:30:00'),
            new callinfo_1.Hourlist('07:00:00'),
            new callinfo_1.Hourlist('07:30:00'),
            new callinfo_1.Hourlist('08:00:00'),
            new callinfo_1.Hourlist('08:30:00'),
            new callinfo_1.Hourlist('09:00:00'),
            new callinfo_1.Hourlist('09:30:00'),
            new callinfo_1.Hourlist('10:00:00'),
            new callinfo_1.Hourlist('10:30:00'),
            new callinfo_1.Hourlist('11:00:00'),
            new callinfo_1.Hourlist('11:30:00'),
            new callinfo_1.Hourlist('12:00:00'),
            new callinfo_1.Hourlist('12:30:00'),
            new callinfo_1.Hourlist('13:00:00'),
            new callinfo_1.Hourlist('13:30:00'),
            new callinfo_1.Hourlist('14:00:00'),
            new callinfo_1.Hourlist('14:30:00'),
            new callinfo_1.Hourlist('15:00:00'),
            new callinfo_1.Hourlist('15:30:00'),
            new callinfo_1.Hourlist('11:30:00'),
            new callinfo_1.Hourlist('16:00:00'),
            new callinfo_1.Hourlist('16:30:00'),
            new callinfo_1.Hourlist('17:00:00'),
            new callinfo_1.Hourlist('17:30:00'),
            new callinfo_1.Hourlist('18:00:00'),
            new callinfo_1.Hourlist('18:30:00'),
            new callinfo_1.Hourlist('19:00:00'),
            new callinfo_1.Hourlist('19:30:00'),
            new callinfo_1.Hourlist('20:00:00'),
            new callinfo_1.Hourlist('20:30:00'),
            new callinfo_1.Hourlist('17:00:00'),
            new callinfo_1.Hourlist('17:30:00'),
            new callinfo_1.Hourlist('21:00:00'),
            new callinfo_1.Hourlist('21:30:00'),
            new callinfo_1.Hourlist('22:00:00'),
            new callinfo_1.Hourlist('22:30:00'),
            new callinfo_1.Hourlist('23:00:00'),
            new callinfo_1.Hourlist('23:30:00')
        ];
        this.elementRef = elementRef;
        this.show_status = true;
        this.updateCallComponent = new core_1.EventEmitter();
        this.callModel = new call_1.CallModel();
        this.callInfoModel = new callinfo_1.CallInfoModel();
        this.callInfoModel.Call_Name = [];
    }
    // getcontactlist(Cmp_ID) {
    //     this.contactService.getAllContactDetail(Cmp_ID).map(r => r.json())
    //         .subscribe(data => {
    //             this.callInfoModel.Name = data[0];
    //         });
    // }
    CallInfo.prototype.getcontactlist = function (data) {
        var _this = this;
        this.cmp_ID = data.cmp_ID;
        this.contactService.getAllContactDetail(data).map(function (r) { return r.json(); })
            .subscribe(function (data) {
            _this.callInfoModel.Call_Name = data;
        });
        jQuery(this.elementRef.nativeElement).find('.datepicker').datepicker({ dateFormat: "dd-MM-yy" });
        jQuery(this.elementRef.nativeElement).find('.datepickerE').datepicker({ dateFormat: "dd-MM-yy" });
    };
    CallInfo.prototype.sendDataTOcallInfo = function (companyInfoDetail) {
        this.getcontactlist(companyInfoDetail);
        var moment = require('moment');
        this.callInfoModel.Call_ID = companyInfoDetail.Call_ID;
        this.callInfoModel.Cmp_ID = companyInfoDetail.cmp_ID;
        this.callInfoModel.Name = companyInfoDetail.Call_Name;
        this.callInfoModel.Call_Startdate = moment(companyInfoDetail.Call_Startdate).format("DD-MM-YYYY ");
        this.callInfoModel.Call_Enddate = moment(companyInfoDetail.Call_Enddate).format("DD-MM-YYYY ");
        this.callInfoModel.call_Status = companyInfoDetail.Call_Status;
        this.callInfoModel.Endtime = companyInfoDetail.Call_Endtime;
        this.callInfoModel.Starttime = companyInfoDetail.Call_Starttime;
        jQuery(this.elementRef.nativeElement).find('#datepicker').datepicker({ dateFormat: "dd-MM-yy" });
        jQuery(this.elementRef.nativeElement).find('#datepickerE').datepicker({ dateFormat: "dd-MM-yy" });
        this.show_status = false;
    };
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
    CallInfo.prototype.updatecallinfo = function (status, callinfodata) {
        var _this = this;
        var moment = require('moment');
        callinfodata.Cmp_ID = this.cmp_ID;
        if (status == 0) {
            callinfodata.Call_Startdate = moment(moment(callinfodata.Call_Startdate).toDate()).format("YYYY-MM-DD");
            callinfodata.Call_Enddate = moment(moment(callinfodata.Call_Enddate).toDate()).format("YYYY-MM-DD");
            // moment(callinfodata.Call_Startdate).format("DD-MM-YYYY")
            if ((callinfodata.Call_ID != null) && (callinfodata.Name != null) && (callinfodata.Call_Startdate != null) && (callinfodata.Call_Startdate != "Invalid date") && (callinfodata.Starttime != null) && (callinfodata.Call_Enddate != null) && (callinfodata.Endtime != null) && (callinfodata.call_Status != null) && (callinfodata.Call_Enddate != "Invalid date")) {
                if (callinfodata.Call_ID != null) {
                    this.callservice.savecallinfodetail(callinfodata).map(function (r) { return r.json(); })
                        .subscribe(function (a) {
                        callinfodata.Name = '';
                        callinfodata.Call_Startdate = '';
                        callinfodata.Starttime = '';
                        callinfodata.Call_Enddate = '';
                        callinfodata.call_Status = '';
                        callinfodata.Endtime = '';
                        _this.updateCallComponent.emit(a);
                    });
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
                else if (callinfodata.call_Status != null) {
                    this.errStatus = true;
                }
            }
        }
        else {
            callinfodata.new_Call_Startdate = moment(moment(callinfodata.new_Call_Startdate).toDate()).format("YYYY-MM-DD");
            callinfodata.new_Call_Enddate = moment(moment(callinfodata.new_Call_Enddate).toDate()).format("YYYY-MM-DD");
            if ((callinfodata.New_Name != null) && (callinfodata.new_Call_Startdate != null) && (callinfodata.new_Call_Startdate != "Invalid date") && (callinfodata.new_Starttime != null) && (callinfodata.new_Call_Enddate != null) && (callinfodata.new_Call_Enddate != null) && (callinfodata.new_call_Status != null) && (callinfodata.new_Call_Enddate != "Invalid date")) {
                callinfodata.Call_ID = undefined;
                this.callservice.savecallinfodetail(callinfodata).map(function (r) { return r.json(); })
                    .subscribe(function (a) {
                    // this.callservice.getUpdateDetail(a).map(r => r.json())
                    //     .subscribe(a => {
                    callinfodata.New_Name = '';
                    callinfodata.new_Call_Startdate = '';
                    callinfodata.new_Starttime = '';
                    callinfodata.new_Call_Enddate = '';
                    callinfodata.new_call_Status = '';
                    callinfodata.new_Endtime = '';
                    _this.callModel.company_Call_detail = a;
                    _this.updateCallComponent.emit(a);
                    // this.showdatepickercall = false;
                    //this.updateParentComponent.emit(a);
                });
            }
            else {
            }
        }
    };
    CallInfo.prototype.onChange = function (deviceValue) {
        console.log(deviceValue);
    };
    CallInfo.prototype.change_event_contact_name = function (value) {
        if (value == '') {
            this.errContactName = true;
        }
        else {
            this.errContactName = false;
        }
    };
    CallInfo.prototype.change_event_Sdate = function (value) {
        if (value == '') {
            this.errStartDate = true;
        }
        else {
            this.errStartDate = false;
        }
    };
    CallInfo.prototype.change_event_Starttime = function (value) {
        if (value == '') {
            this.errCallStartTime = true;
        }
        else {
            this.errCallStartTime = false;
        }
    };
    CallInfo.prototype.change_event_Enddate = function (value) {
        if (value == '') {
            this.errEndDate = true;
        }
        else {
            this.errEndDate = false;
        }
    };
    CallInfo.prototype.change_event_Endtime = function (value) {
        if (value == '') {
            this.errCallEndTime = true;
        }
        else {
            this.errCallEndTime = false;
        }
    };
    CallInfo.prototype.change_event_Status = function (value) {
        if (value == '') {
            this.errStatus = true;
        }
        else {
            this.errStatus = false;
        }
    };
    CallInfo.prototype.send_call_default_info = function () {
        this.show_status = true;
    };
    CallInfo = __decorate([
        core_1.Component({
            selector: 'callinfo-component',
            templateUrl: '../app/components/callinfo/call.callinfo.html',
            outputs: ['updateCallComponent'],
            directives: [ng2_bootstrap_1.DATEPICKER_DIRECTIVES, common_1.CORE_DIRECTIVES]
        }),
        __param(3, core_1.Inject(core_1.ElementRef)), 
        __metadata('design:paramtypes', [callService_1.CallService, call_1.CallModel, contactService_1.contactService, core_1.ElementRef])
    ], CallInfo);
    return CallInfo;
}());
exports.CallInfo = CallInfo;
//# sourceMappingURL=call.callinfo.js.map