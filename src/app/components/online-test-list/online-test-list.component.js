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
var router_1 = require('@angular/router');
var core_1 = require('@angular/core');
var online_test_service_1 = require('../../services/online-test/online-test.service');
var OnlineTestListComponent = (function () {
    function OnlineTestListComponent(service, router) {
        this.service = service;
        this.router = router;
        this.getOnlineTests();
    }
    // get test details 
    OnlineTestListComponent.prototype.getOnlineTests = function () {
        var _this = this;
        this.service.getOnlineTests().then(function (result) {
            if (result != undefined && result != null) {
                _this.onlineTestData = result;
            }
            else {
            }
        });
    };
    //pass the online_test_id to online-test component.ts 
    OnlineTestListComponent.prototype.editTest = function (item) {
        this.router.navigate(['/onlinetest/' + item.online_test_id]);
    };
    //open onlinetest page for add test 
    OnlineTestListComponent.prototype.showOnlineTest = function () {
        this.router.navigate(['/onlinetest']);
    };
    //delete test by online_test_id
    OnlineTestListComponent.prototype.removeTest = function (item) {
        var _this = this;
        // this.data = _.filter(this.data, (elem)=>elem!=item);
        this.service.removeOnlineTest(item.online_test_id).then(function (result) {
            if (result) {
                alert("record succesfully deleted!");
                _this.getOnlineTests();
            }
            else {
                alert("record not deleted!");
            }
        });
    };
    OnlineTestListComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'online-test-list',
            templateUrl: 'online-test-list.component.html',
        }), 
        __metadata('design:paramtypes', [online_test_service_1.OnlineTestService, router_1.Router])
    ], OnlineTestListComponent);
    return OnlineTestListComponent;
}());
exports.OnlineTestListComponent = OnlineTestListComponent;
//# sourceMappingURL=online-test-list.component.js.map