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
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var online_test_model_1 = require('../../model/online-test/online-test.model');
var online_test_service_1 = require('../../services/online-test/online-test.service');
var OnlineTestComponent = (function () {
    function OnlineTestComponent(service, activatedRoute, router) {
        this.service = service;
        this.activatedRoute = activatedRoute;
        this.router = router;
        this.bydefault();
    }
    OnlineTestComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.paramsSub = this.activatedRoute.params.subscribe(function (params) {
            _this.online_test_id = Number.parseInt(params['id'], 10);
            if (_this.online_test_id > 0)
                _this.getOnlineTestByID(_this.online_test_id);
        });
    };
    OnlineTestComponent.prototype.ngOnDestroy = function () {
        this.paramsSub.unsubscribe();
    };
    OnlineTestComponent.prototype.bydefault = function () {
        this.model = new online_test_model_1.OnlineTestModel();
        this.model.online_test_id = 0;
        this.model.company_id = 1;
        this.model.online_test_title = "";
        this.model.test_start_date = "";
        this.model.test_start_time = "";
        this.model.test_end_date = "";
        this.model.test_end_time = "";
        this.model.question_set_id = 0;
        this.model.test_support_text = "";
        this.model.test_experience_years = 0;
        this.model.created_by = 'Vipin';
        this.model.updated_by = 'Vipin';
        this.getQuestion();
    };
    OnlineTestComponent.prototype.getQuestion = function () {
        var _this = this;
        this.service.getQuestion().then(function (result) {
            if (result) {
                _this.questionSetData = result;
            }
        });
    };
    OnlineTestComponent.prototype.addOnlineTest = function () {
        // if (this.model.company_title == "") {
        //   alert("Please enter company title.");
        //   return;
        // }
        // if( this.model.company_address ==  ""){
        //     alert("Please enter company address");
        //       return;
        // }
        // if( this.model.company_phone  ==  ""){
        //     alert("Please enter company phone");
        //       return;
        // }
        // if (this.model.company_url == "") {
        //   alert("Please enter company url.");
        //   return;
        // }
        var _this = this;
        // if (this.model.company_email == "") {
        //   alert("Please enter company title.");
        //   return;
        // }
        // if (this.model.company_hr_phone == "") {
        //   alert("Please enter company hr phone.");
        //   return;
        // }
        // if (this.model.company_hr_emailid == "") {
        //   alert("Please enter company hr emailID.");
        //   return;
        // }
        this.service.saveOnlineTest(this.model).then(function (result) {
            if (result) {
                alert("Company saved successfully.!");
                _this.router.navigate(['/onlinetestlist']);
            }
            else {
                alert(result);
            }
        });
    };
    OnlineTestComponent.prototype.getOnlineTestByID = function (id) {
        var _this = this;
        this.service.getOnlineTestById(id).then(function (result) {
            var start_date = result.test_start_date.split("T");
            var end_date = result.test_end_date.split("T");
            result.test_start_date = start_date[0];
            result.test_end_date = end_date[0];
            _this.model = result;
        });
    };
    OnlineTestComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'online-test',
            templateUrl: 'online-test.component.html',
        }), 
        __metadata('design:paramtypes', [online_test_service_1.OnlineTestService, router_1.ActivatedRoute, router_1.Router])
    ], OnlineTestComponent);
    return OnlineTestComponent;
}());
exports.OnlineTestComponent = OnlineTestComponent;
//# sourceMappingURL=online-test.component.js.map