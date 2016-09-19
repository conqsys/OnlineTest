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
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                app_routing_1.routing,
                http_1.HttpModule
            ],
            declarations: [
                app_component_1.AppComponent,
                hero_search_component_1.HeroSearchComponent,
                app_routing_1.routedComponents
            ],
            providers: [
                hero_service_1.HeroService,
                question_service_1.QuestionService,
                topic_service_1.TopicService,
                question_option_service_1.QuestionOptionService,
                companyService_1.CompanyService,
                question_set_service_1.QuestionSetService
            ],
            bootstrap: [app_component_1.AppComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map