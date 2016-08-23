"use strict";
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var app_component_1 = require('./app.component');
var app_routes_1 = require('./app.routes');
var companyService_1 = require("./services/companyService");
var contactService_1 = require("./services/contactService");
var callService_1 = require('./services/callService');
var http_1 = require('@angular/http');
var forms_1 = require('@angular/forms');
var ng2_select_1 = require("ng2-select");
platform_browser_dynamic_1.bootstrap(app_component_1.AppComponent, [
    forms_1.provideForms(),
    forms_1.disableDeprecatedForms(),
    app_routes_1.appRouterProviders,
    companyService_1.companyService,
    contactService_1.contactService,
    http_1.HTTP_PROVIDERS,
    callService_1.CallService,
    ng2_select_1.SELECT_DIRECTIVES
]);
//# sourceMappingURL=main.js.map