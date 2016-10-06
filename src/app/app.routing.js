"use strict";
var router_1 = require('@angular/router');
var company_list_component_1 = require('./components/companies/company-list/company-list.component');
var company_component_1 = require('./components/companies/company/company.component');
var online_test_list_component_1 = require('./components/online-tests/online-test-list/online-test-list.component');
var online_test_component_1 = require('./components/online-tests/online-test/online-test.component');
var question_list_component_1 = require('./components/questions/question-list/question-list.component');
var question_component_1 = require('./components/questions/question/question.component');
var topic_list_component_1 = require('./components/topics/topic-list/topic-list.component');
var topic_component_1 = require('./components/topics/topic/topic.component');
var question_set_list_component_1 = require('./components/question-sets/question-set-list/question-set-list.component');
var question_set_component_1 = require('./components/question-sets/question-set/question-set.component');
var user_list_component_1 = require('./components/users/user-list/user-list.component');
var user_component_1 = require('./components/users/user/user.component');
var login_component_1 = require('./components/login/login.component');
var texteditor_component_1 = require('./components/shared/froala/texteditor.component');
var check_box_component_1 = require('./components/shared/check-box/check-box.component');
var radio_component_1 = require('./components/shared/radio/radio.component');
var appRoutes = [
    {
        path: '',
        redirectTo: '/questions',
        pathMatch: 'full'
    },
    {
        path: 'questions',
        component: question_list_component_1.QuestionListComponent
    },
    {
        path: 'question/:question_id',
        component: question_component_1.QuestionComponent
    },
    {
        path: 'questionSets',
        component: question_set_list_component_1.QuestionSetListComponent
    },
    {
        path: 'questionSet/:question_set_id',
        component: question_set_component_1.QuestionSetComponent
    },
    {
        path: 'topics',
        component: topic_list_component_1.TopicListComponent
    },
    {
        path: 'topic/:topic_id',
        component: topic_component_1.TopicComponent
    },
    {
        path: 'companies',
        component: company_list_component_1.CompanyListComponent
    },
    {
        path: 'company/:company_id',
        component: company_component_1.CompanyComponent
    },
    {
        path: 'onlineTests',
        component: online_test_list_component_1.OnlineTestListComponent
    },
    {
        path: 'onlineTest/:id',
        component: online_test_component_1.OnlineTestComponent
    },
    {
        path: 'users',
        component: user_list_component_1.UserListComponent
    },
    {
        path: 'user/:user_id',
        component: user_component_1.UserComponent
    },
    {
        path: 'login',
        component: login_component_1.LoginComponent
    },
    {
        path: 'froala',
        component: texteditor_component_1.TextEditorComponent
    }
];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
exports.routedComponents = [
    question_list_component_1.QuestionListComponent, question_component_1.QuestionComponent,
    question_set_list_component_1.QuestionSetListComponent, question_set_component_1.QuestionSetComponent,
    topic_list_component_1.TopicListComponent, topic_component_1.TopicComponent,
    company_list_component_1.CompanyListComponent, company_component_1.CompanyComponent,
    user_list_component_1.UserListComponent, user_component_1.UserComponent,
    online_test_component_1.OnlineTestComponent, online_test_list_component_1.OnlineTestListComponent,
    login_component_1.LoginComponent,
    texteditor_component_1.TextEditorComponent, check_box_component_1.CheckBoxComponent, radio_component_1.RadioComponent
];
//# sourceMappingURL=app.routing.js.map