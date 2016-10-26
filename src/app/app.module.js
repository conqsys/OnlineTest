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
var router_1 = require('@angular/router');
var common_1 = require('@angular/common');
var httpInterceptor_1 = require('./shared/httpInterceptor');
require('./rxjs-extensions');
require('materialize-css');
var angular2_materialize_1 = require('angular2-materialize');
var angular_2_local_storage_1 = require('angular-2-local-storage');
var app_component_1 = require('./app.component');
var app_routing_1 = require('./app.routing');
var statinfo_component_1 = require('./components/shared/statinfo/statinfo.component');
var stats_component_1 = require('./components/shared/stats/stats.component');
var question_service_1 = require('./shared/services/question/question.service');
var topic_service_1 = require('./shared/services/topic/topic.service');
var question_option_service_1 = require('./shared/services/question-option/question-option.service');
var company_service_1 = require('./shared/services/company/company.service');
var question_set_service_1 = require('./shared/services/question-set/question-set.service');
var online_test_service_1 = require('./shared/services/online-test/online-test.service');
var user_service_1 = require('./shared/services/user/user.service');
var control_messages_component_1 = require('./Components/validation/control-messages.component');
var validation_service_1 = require('./shared/services/validation/validation.service');
var froala_directives_1 = require('./components/shared/froala/directives/froala.directives');
var message_service_1 = require('./shared/services/message/message.service');
var strip_html_pipe_1 = require('./components/shared/strip-html-pipe/strip-html.pipe');
// Create config options (see ILocalStorageServiceConfigOptions) for deets:
var localStorageServiceConfig = {
    prefix: 'my-app',
    storageType: 'localStorage'
};
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
                app_routing_1.routedComponents,
                angular2_materialize_1.MaterializeDirective,
                froala_directives_1.FroalaEditorDirective,
                statinfo_component_1.StatinfoComponent,
                stats_component_1.StatsComponent,
                strip_html_pipe_1.StripHtmlPipe
            ],
            providers: [
                question_service_1.QuestionService,
                topic_service_1.TopicService,
                question_option_service_1.QuestionOptionService,
                company_service_1.CompanyService,
                question_set_service_1.QuestionSetService,
                online_test_service_1.OnlineTestService,
                user_service_1.UserService,
                validation_service_1.ValidationService,
                angular_2_local_storage_1.LocalStorageService,
                message_service_1.MessageService,
                {
                    provide: http_1.Http,
                    useFactory: function (xhrBackend, requestOptions, router, location, localStorageService) {
                        return new httpInterceptor_1.HttpInterceptor(xhrBackend, requestOptions, router, location, localStorageService);
                    },
                    deps: [http_1.XHRBackend, http_1.RequestOptions, router_1.Router, common_1.Location, angular_2_local_storage_1.LocalStorageService],
                },
                { provide: angular_2_local_storage_1.LOCAL_STORAGE_SERVICE_CONFIG, useValue: localStorageServiceConfig },
            ],
            bootstrap: [app_component_1.AppComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map