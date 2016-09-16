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
var topic_model_1 = require('../../model/topic/topic.model');
var topic_service_1 = require('../../services/topic/topic.service');
var router_1 = require('@angular/router');
var router_2 = require('@angular/router');
var TopicComponent = (function () {
    function TopicComponent(Service, routeinfo, _router) {
        this.Service = Service;
        this.routeinfo = routeinfo;
        this._router = _router;
        this.bydefault();
        this.getTopicByID(routeinfo.params);
    }
    TopicComponent.prototype.bydefault = function () {
        this.model = new topic_model_1.TopicModel();
        this.btnText = 'Save Topic';
        this.model.topic_id = 0;
        this.model.topic_title = "";
        this.model.company_id = 1;
        this.model.created_by = 'vipin';
        this.model.updated_by = 'vipin';
    };
    TopicComponent.prototype.getTopicByID = function (param) {
        var _this = this;
        if (param.value.id != undefined) {
            this.Service.getTopicByID(param.value.id).then(function (result) {
                _this.model = result[0];
                _this.model.topic_title = result[0].topic_title;
                _this.btnText = 'Update Topic';
            });
        }
    };
    TopicComponent.prototype.addTopic = function () {
        var _this = this;
        if (this.model.topic_title == "" || this.model.topic_title == undefined) {
            alert("Please insert Topic");
            return false;
        }
        this.model.company_id = 1;
        this.Service.saveTopic(this.model).then(function (result) {
            if (result) {
                alert("category inserted!");
                _this._router.navigate(['/topiclist']);
            }
            else {
            }
        });
    };
    TopicComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'app-topic',
            templateUrl: 'topic.component.html',
            providers: [topic_model_1.TopicModel, topic_service_1.TopicService]
        }), 
        __metadata('design:paramtypes', [topic_service_1.TopicService, router_1.ActivatedRoute, router_2.Router])
    ], TopicComponent);
    return TopicComponent;
}());
exports.TopicComponent = TopicComponent;
//# sourceMappingURL=topic.component.js.map