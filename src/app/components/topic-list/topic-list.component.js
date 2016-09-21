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
var TopicListComponent = (function () {
    function TopicListComponent(service, routeinfo, router) {
        this.service = service;
        this.routeinfo = routeinfo;
        this.router = router;
        this.selectedTopic = new topic_model_1.TopicModel();
        this.getTopic();
    }
    // get Topic by company_id
    TopicListComponent.prototype.getTopic = function () {
        var _this = this;
        this.service.getTopic(1).then(function (result) {
            if (result != undefined && result != null) {
                _this.topicdata = result;
            }
            else {
            }
        });
    };
    // navigate topic_id to Topic Component.ts
    TopicListComponent.prototype.editTopic = function (item) {
        this.router.navigate(['/topic/' + item.topic_id]);
    };
    //open topic page for add topic 
    TopicListComponent.prototype.showTopic = function () {
        this.router.navigate(['/topic']);
    };
    //remove Topic by topic_id
    TopicListComponent.prototype.removeItem = function (item) {
        var _this = this;
        // this.data = _.filter(this.data, (elem)=>elem!=item);
        this.service.removeTopic(item.topic_id).then(function (result) {
            if (result) {
                Materialize.toast('Topic deleted!', 2000, 'rounded');
                _this.getTopic();
            }
            else {
                Materialize.toast('Topic not deleted!', 2000, 'rounded');
                alert("");
            }
        });
        // console.log("Remove: ", (item.SubjectID);
    };
    TopicListComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'app-topiclist',
            templateUrl: 'topic-list.component.html',
            providers: [topic_model_1.TopicModel, topic_service_1.TopicService]
        }), 
        __metadata('design:paramtypes', [topic_service_1.TopicService, router_1.ActivatedRoute, router_2.Router])
    ], TopicListComponent);
    return TopicListComponent;
}());
exports.TopicListComponent = TopicListComponent;
//# sourceMappingURL=topic-list.component.js.map