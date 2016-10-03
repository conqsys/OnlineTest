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
var question_service_1 = require('../../../services/question/question.service');
var base_component_1 = require('../../base.component');
var angular_2_local_storage_1 = require('angular-2-local-storage');
var router_1 = require('@angular/router');
var StatinfoComponent = (function (_super) {
    __extends(StatinfoComponent, _super);
    function StatinfoComponent(service, localStorageService, router) {
        _super.call(this, localStorageService, router);
        this.service = service;
        this.Stats = [];
    }
    StatinfoComponent.prototype.ngOnInit = function () {
        if (this.user) {
            this.getQuestionStateInfo();
        }
    };
    StatinfoComponent.prototype.getQuestionStateInfo = function () {
        var _this = this;
        this.service.getQuestionsStateInfo()
            .then(function (result) {
            if (result) {
                _this.Stats = result;
            }
        });
    };
    StatinfoComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'app-statinfo',
            templateUrl: '../statinfo/statinfo.component.html',
        }), 
        __metadata('design:paramtypes', [question_service_1.QuestionService, angular_2_local_storage_1.LocalStorageService, router_1.Router])
    ], StatinfoComponent);
    return StatinfoComponent;
}(base_component_1.BaseComponent));
exports.StatinfoComponent = StatinfoComponent;
//# sourceMappingURL=statinfo.component.js.map