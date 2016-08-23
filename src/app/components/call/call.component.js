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
var call_1 = require('../../model/call');
var call_callinfo_1 = require('../callinfo/call.callinfo');
var callinfo_1 = require('../../model/callinfo');
var callService_1 = require('../../services/callService');
var call = (function () {
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
    function call(callservice, elementRef) {
        this.callservice = callservice;
        this.showdatepickercall = false;
        this.errContactName = false;
        this.errStartDate = false;
        this.errCallStartTime = false;
        this.errEndDate = false;
        this.errCallEndTime = false;
        this.errStatus = false;
        this.elementRef = elementRef;
        this.updateParentComponent = new core_1.EventEmitter();
        this.callModel = new call_1.CallModel();
        this.callInfoModel = new callinfo_1.CallInfoModel();
        this.companyInfoDetail = new core_1.EventEmitter();
    }
    // ngOnInit() {
    //     jQuery(this.elementRef.nativeElement).find('.datepicker').datepicker({ dateFormat: "dd-MM-yy" });
    //     jQuery(this.elementRef.nativeElement).find('.datepickerE').datepicker({ dateFormat: "dd-MM-yy" });
    //     jQuery(this.elementRef.nativeElement).find('.timepicker').timepicker();
    //     jQuery(this.elementRef.nativeElement).find('.timepickerE').timepicker();
    // }
    call.prototype.sendCallData = function (call, cmpid) {
        this.callModel.company_Call_detail = call;
        this.CMP_ID = cmpid;
    };
    call.prototype.sendCallInfoData = function (calldata) {
        if (this.showdatepickercall) {
            if (this.show_data.Call_ID == calldata.Call_ID) {
                this.showdatepickercall = false;
            }
            else {
                this.show_data = calldata;
                calldata.cmp_ID = this.CMP_ID;
                this.showdatepickercall = true;
                this.companyInfoDetail.emit(calldata);
            }
        }
        else {
            this.show_data = calldata;
            this.showdatepickercall = true;
            calldata.cmp_ID = this.CMP_ID;
            this.companyInfoDetail.emit(calldata);
        }
    };
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
    call.prototype.deleteCall = function (calldata, index) {
        var _this = this;
        this.callservice.deleteCall(calldata.Call_ID).
            subscribe(function (a) {
            _this.callModel.company_Call_detail.splice(index, 1);
            _this.updateParentComponent.emit(a);
        });
    };
    call.prototype.updateCall = function (data) {
        var _this = this;
        this.callservice.getUpdateDetail(data).map(function (r) { return r.json(); })
            .subscribe(function (a) {
            _this.callModel.company_Call_detail = a;
            // this.showdatepickercall = false;
        });
    };
    __decorate([
        core_1.ViewChild(call_callinfo_1.CallInfo), 
        __metadata('design:type', call_callinfo_1.CallInfo)
    ], call.prototype, "call_info", void 0);
    call = __decorate([
        core_1.Component({
            selector: 'call-component',
            templateUrl: '../app/components/call/call.component.html',
            directives: [call_callinfo_1.CallInfo],
            outputs: ['updateParentComponent', 'companyInfoDetail']
        }),
        __param(1, core_1.Inject(core_1.ElementRef)), 
        __metadata('design:paramtypes', [callService_1.CallService, core_1.ElementRef])
    ], call);
    return call;
}());
exports.call = call;
//# sourceMappingURL=call.component.js.map