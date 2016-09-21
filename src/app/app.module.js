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
var platform_browser_1 = require('@angular/platform-browser');
var forms_1 = require('@angular/forms');
var http_1 = require('@angular/http');
require('./rxjs-extensions');
var app_component_1 = require('./app.component');
var app_routing_1 = require('./app.routing');
var hero_service_1 = require('./hero.service');
var hero_search_component_1 = require('./hero-search.component');
var question_service_1 = require('./services/question/question.service');
var topic_service_1 = require('./services/topic/topic.service');
var question_option_service_1 = require('./services/question-option/question-option.service');
var companyService_1 = require('./services/company/companyService');
var question_set_service_1 = require('./services/question-set/question-set.service');
var online_test_service_1 = require('./services/online-test/online-test.service');
var user_service_1 = require('./services/user/user.service');
var login_service_1 = require('./services/login/login.service');
require('materialize-css');
var angular2_materialize_1 = require("angular2-materialize");
var control_messages_component_1 = require('./Components/validation/control-messages.component');
var validation_service_1 = require('./services/validation/validation.service');
;
var froala_directives_1 = require('./components/froala/directives/froala.directives');
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                app_routing_1.routing,
                http_1.HttpModule
            ],
            declarations: [
                app_component_1.AppComponent,
                control_messages_component_1.ControlMessages,
                hero_search_component_1.HeroSearchComponent,
                app_routing_1.routedComponents,
                angular2_materialize_1.MaterializeDirective,
                froala_directives_1.FroalaEditorDirective
            ],
            providers: [
                hero_service_1.HeroService,
                question_service_1.QuestionService,
                topic_service_1.TopicService,
                question_option_service_1.QuestionOptionService,
                companyService_1.CompanyService,
                question_set_service_1.QuestionSetService,
                online_test_service_1.OnlineTestService,
                user_service_1.UserService,
                login_service_1.LoginService,
                validation_service_1.ValidationService,
            ],
            bootstrap: [app_component_1.AppComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map