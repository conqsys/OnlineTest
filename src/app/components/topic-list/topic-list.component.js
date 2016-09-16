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
    function TopicListComponent(Service, routeinfo, _router) {
        this.Service = Service;
        this.routeinfo = routeinfo;
        this._router = _router;
        this.selectedTopic = new topic_model_1.TopicModel();
        this.getTopic();
    }
    TopicListComponent.prototype.getTopic = function () {
        // this.Service.getTopic(1).map(r => r.json())
        //   .subscribe(result => {
        //     if (result != undefined && result != null) {
        //       this.topicdata = result;       
        //     }
        //     else {
        //       alert(result.data);
        //     }
        //   });
    };
    TopicListComponent.prototype.editTopic = function (item) {
        this._router.navigate(['/topic/' + item.topic_id]);
    };
    TopicListComponent.prototype.showTopic = function () {
        this._router.navigate(['/topic']);
    };
    TopicListComponent.prototype.removeItem = function (item) {
        // this.data = _.filter(this.data, (elem)=>elem!=item);
        // this.Service.removeTopic(item.topic_id)
        //   .map(r => r.json())
        //   .subscribe(result => {
        //     if (result) {
        //       alert("record succesfully deleted!");
        //       this.getTopic();
        //     }
        //     else {
        //       alert("record not deleted!");
        //     }
        //   });
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