"use strict";
var router_1 = require('@angular/router');
var company_component_1 = require('./components/company/company.component');
var routes = [
    {
        path: '',
        redirectTo: '/company',
        pathMatch: 'full'
    },
    {
        path: 'company',
        component: company_component_1.company_info
    }
];
exports.appRouterProviders = [
    router_1.provideRouter(routes)
];
//# sourceMappingURL=app.routes.js.map