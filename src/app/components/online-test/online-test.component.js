"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
var base_component_1 = require('../base.component');
var angular_2_local_storage_1 = require('angular-2-local-storage');
var online_test_model_1 = require('../../model/online-test/online-test.model');
var online_test_service_1 = require('../../services/online-test/online-test.service');
var OnlineTestComponent = (function (_super) {
    __extends(OnlineTestComponent, _super);
    function OnlineTestComponent(service, activatedRoute, localStorageService, router) {
        _super.call(this, localStorageService, router);
        this.service = service;
        this.activatedRoute = activatedRoute;
        this.model = new online_test_model_1.OnlineTestModel();
    }
    OnlineTestComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.user) {
            this.bydefault();
            this.paramsSub = this.activatedRoute.params.subscribe(function (params) {
                _this.online_test_id = Number.parseInt(params['id'], 10);
                if (_this.online_test_id > 0)
                    _this.getOnlineTestByID(_this.online_test_id);
            });
        }
    };
    OnlineTestComponent.prototype.bydefault = function () {
        this.model.online_test_id = 0;
        this.model.company_id = this.user.company_id;
        this.model.online_test_title = "";
        this.model.test_start_date = "";
        this.model.test_start_time = "";
        this.model.test_end_date = "";
        this.model.test_end_time = "";
        this.model.question_set_id = 0;
        this.model.test_support_text = "";
        this.model.test_experience_years = 0;
        this.model.created_by = this.user.user_id;
        this.model.updated_by = this.user.user_id;
        this.getQuestionSet();
    };
    // get qustionset
    OnlineTestComponent.prototype.getQuestionSet = function () {
        var _this = this;
        this.service.getQuestion().then(function (result) {
            if (result) {
                _this.questionSetData = result;
            }
        });
    };
    // save test details 
    OnlineTestComponent.prototype.addOnlineTest = function () {
        var _this = this;
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
    // get test details by online_test_id 
    OnlineTestComponent.prototype.getOnlineTestByID = function (id) {
        var _this = this;
        this.service.getOnlineTestById(id).then(function (result) {
            _this.model = result;
        });
    };
    OnlineTestComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'online-test',
            templateUrl: 'online-test.component.html',
        }), 
        __metadata('design:paramtypes', [online_test_service_1.OnlineTestService, router_1.ActivatedRoute, angular_2_local_storage_1.LocalStorageService, router_1.Router])
    ], OnlineTestComponent);
    return OnlineTestComponent;
}(base_component_1.BaseComponent));
exports.OnlineTestComponent = OnlineTestComponent;
//# sourceMappingURL=online-test.component.js.map