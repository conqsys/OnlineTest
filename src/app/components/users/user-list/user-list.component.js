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
var user_service_1 = require('../../../services/user/user.service');
var base_component_1 = require('../../base.component');
var angular_2_local_storage_1 = require('angular-2-local-storage');
var UserListComponent = (function (_super) {
    __extends(UserListComponent, _super);
    function UserListComponent(service, localStorageService, router) {
        _super.call(this, localStorageService, router);
        this.service = service;
        this.model = [];
        this.title = 'Users';
        this.model = new Array();
    }
    UserListComponent.prototype.ngOnInit = function () {
        if (this.user) {
            this.getUsers(this.user.company_id);
        }
    };
    // get user by company_id
    UserListComponent.prototype.getUsers = function (company_id) {
        var _this = this;
        this.service.getUsers(company_id)
            .then(function (users) {
            _this.model = users;
        });
    };
    // navigate user_id to user component.ts
    UserListComponent.prototype.selectUser = function (selectedUser) {
        this.selectedUserId = selectedUser.user_id;
        this.router.navigate(['/user', this.selectedUserId]);
    };
    // open user page for add user
    UserListComponent.prototype.addUser = function () {
        this.router.navigate(['/user', 0]);
    };
    UserListComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'user-list',
            templateUrl: 'user-list.component.html',
        }), 
        __metadata('design:paramtypes', [user_service_1.UserService, angular_2_local_storage_1.LocalStorageService, router_1.Router])
    ], UserListComponent);
    return UserListComponent;
}(base_component_1.BaseComponent));
exports.UserListComponent = UserListComponent;
//# sourceMappingURL=user-list.component.js.map