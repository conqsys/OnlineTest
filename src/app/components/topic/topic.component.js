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
var base_component_1 = require('../base.component');
var angular_2_local_storage_1 = require('angular-2-local-storage');
var topic_model_1 = require('../../model/topic/topic.model');
var topic_service_1 = require('../../services/topic/topic.service');
var router_1 = require('@angular/router');
var router_2 = require('@angular/router');
var forms_1 = require('@angular/forms');
var TopicComponent = (function (_super) {
    __extends(TopicComponent, _super);
    function TopicComponent(formBuilder, service, routeinfo, localStorageService, router) {
        _super.call(this, localStorageService, router);
        this.formBuilder = formBuilder;
        this.service = service;
        this.routeinfo = routeinfo;
    }
    TopicComponent.prototype.ngOnInit = function () {
        if (this.user) {
            this.bydefault();
            this.getTopicByID(this.routeinfo.params);
            this.topicForm = this.formBuilder.group({
                'title': ['', [forms_1.Validators.required, forms_1.Validators.minLength(5)]],
            });
        }
    };
    // create default object for save topic
    TopicComponent.prototype.bydefault = function () {
        this.model = new topic_model_1.TopicModel();
        this.btnText = 'Save Topic';
        this.model.topic_id = 0;
        this.model.topic_title = "";
        this.model.company_id = this.user.company_id;
        this.model.created_by = this.user.user_id;
        this.model.updated_by = this.user.user_id;
    };
    // get Topic by topic_id
    TopicComponent.prototype.getTopicByID = function (param) {
        var _this = this;
        if (param.value.id != undefined) {
            this.service.getTopicByID(param.value.id).then(function (result) {
                _this.model = result[0];
                _this.btnText = 'Update Topic';
            });
        }
    };
    // save topic 
    TopicComponent.prototype.saveTopic = function () {
        var _this = this;
        if (this.topicForm.valid) {
            this.model.company_id = this.user.company_id;
            this.service.saveTopic(this.model).then(function (result) {
                if (result) {
                    Materialize.toast(_this.btnText, 1000, 'rounded');
                    _this.router.navigate(['/topiclist']);
                }
                else {
                }
            });
        }
    };
    TopicComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'app-topic',
            templateUrl: 'topic.component.html'
        }), 
        __metadata('design:paramtypes', [forms_1.FormBuilder, topic_service_1.TopicService, router_1.ActivatedRoute, angular_2_local_storage_1.LocalStorageService, router_2.Router])
    ], TopicComponent);
    return TopicComponent;
}(base_component_1.BaseComponent));
exports.TopicComponent = TopicComponent;
//# sourceMappingURL=topic.component.js.map