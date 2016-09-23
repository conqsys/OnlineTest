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
var user_model_1 = require('../../../model/user/user.model');
var user_service_1 = require('../../../services/user/user.service');
var base_component_1 = require('../../base.component');
var angular_2_local_storage_1 = require('angular-2-local-storage');
var UserComponent = (function (_super) {
    __extends(UserComponent, _super);
    function UserComponent(service, activatedRoute, localStorageService, router) {
        _super.call(this, localStorageService, router);
        this.service = service;
        this.activatedRoute = activatedRoute;
        this.title = 'User';
        this.model = new user_model_1.UserModel();
        this.disabled = false;
    }
    UserComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.user) {
            this.activatedRoute.params.subscribe(function (params) {
                _this.user_id = +params['user_id']; // (+) converts string 'id' to a number
            });
            if (this.user_id !== 0 && this.user_id !== undefined) {
                this.getUser(this.user.company_id, this.user_id);
            }
            else {
                this.createUserObject('');
            }
        }
    };
    // create user object for save user 
    UserComponent.prototype.createUserObject = function (emailId) {
        this.model = new user_model_1.UserModel();
        this.model.user_id = 0;
        this.model.user_name = '';
        this.model.user_email = emailId;
        this.model.user_mobile_no = '';
        this.model.user_address = '';
        this.model.is_active = true;
        this.model.is_fresher = false;
        this.model.user_exp_month = 0;
        this.model.user_exp_year = 0;
        this.model.role_id = 3;
        this.model.created_by = this.user.user_id;
        this.model.updated_by = this.user.user_id;
        this.model.company_id = this.user.company_id;
    };
    // get user by company_id and user_id
    UserComponent.prototype.getUser = function (company_id, user_id) {
        var _this = this;
        this.service.getUser(company_id, user_id)
            .then(function (user) {
            if (user.user_id) {
                _this.model = user;
                _this.model.company_id = _this.user.company_id;
            }
            else {
                _this.router.navigate(['/users']);
            }
        });
    };
    // search user by Email
    UserComponent.prototype.searchUserByEmail = function () {
        var _this = this;
        this.service.searchUserByEmail(this.model.user_email)
            .then(function (user) {
            if (user.user_id) {
                _this.disabled = true;
                _this.model = user;
                _this.model.company_id = _this.user.company_id;
            }
            else {
                _this.disabled = false;
                _this.createUserObject(_this.model.user_email);
            }
        });
    };
    // save user 
    UserComponent.prototype.saveUser = function () {
        var _this = this;
        this.service.saveUser(this.model)
            .then(function (user) {
            _this.router.navigate(['/users']);
        });
    };
    // open user list page
    UserComponent.prototype.cancel = function () {
        this.router.navigate(['/users']);
    };
    UserComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'app-user',
            templateUrl: 'user.component.html'
        }), 
        __metadata('design:paramtypes', [user_service_1.UserService, router_1.ActivatedRoute, angular_2_local_storage_1.LocalStorageService, router_1.Router])
    ], UserComponent);
    return UserComponent;
}(base_component_1.BaseComponent));
exports.UserComponent = UserComponent;
//# sourceMappingURL=user.component.js.map