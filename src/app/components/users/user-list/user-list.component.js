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
var user_service_1 = require('../../../services/user/user.service');
var UserListComponent = (function () {
    function UserListComponent(service, router) {
        this.service = service;
        this.router = router;
        this.model = [];
        this.title = 'Users';
        this.model = new Array();
        this.company_id = 1;
    }
    UserListComponent.prototype.ngOnInit = function () {
        this.getUsers(this.company_id);
    };
    UserListComponent.prototype.getUsers = function (company_id) {
        var _this = this;
        this.service.getUsers(company_id)
            .then(function (users) {
            _this.model = users;
        });
    };
    UserListComponent.prototype.selectUser = function (selectedUser) {
        this.selectedUserId = selectedUser.user_id;
        this.router.navigate(['/user', this.selectedUserId]);
    };
    UserListComponent.prototype.addUser = function () {
        this.router.navigate(['/user', 0]);
    };
    UserListComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'user-list',
            templateUrl: 'user-list.component.html',
        }), 
        __metadata('design:paramtypes', [user_service_1.UserService, router_1.Router])
    ], UserListComponent);
    return UserListComponent;
}());
exports.UserListComponent = UserListComponent;
//# sourceMappingURL=user-list.component.js.map