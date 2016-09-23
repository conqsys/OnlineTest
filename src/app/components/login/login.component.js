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
var login_model_1 = require('../../model/login/login.model');
var login_service_1 = require('../../services/login/login.service');
var angular_2_local_storage_1 = require('angular-2-local-storage');
var LoginComponent = (function () {
    function LoginComponent(loginService, router, localStorageService) {
        this.loginService = loginService;
        this.router = router;
        this.localStorageService = localStorageService;
        this.model = new login_model_1.Login();
        this.model.username = "amit8774@gmail.com";
        this.model.password = "Ff3VvbeE";
    }
    LoginComponent.prototype.ngOnInit = function () {
    };
    LoginComponent.prototype.login = function () {
        var _this = this;
        this.loginService.login(this.model)
            .then(function (result) {
            _this.localStorageService.set('user', result.user);
            _this.localStorageService.set('authorization', 'Bearer ' + result.token);
            _this.router.navigate(['/questionsets']);
        });
    };
    LoginComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'login',
            templateUrl: 'login.component.html',
        }), 
        __metadata('design:paramtypes', [login_service_1.LoginService, router_1.Router, angular_2_local_storage_1.LocalStorageService])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map