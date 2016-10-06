"use strict";
var router_1 = require('@angular/router');
var questions_component_1 = require('./components/questions/question-list/questions.component');
var question_component_1 = require('./components/questions/question/question.component');
var topic_component_1 = require('./components/topic/topic.component');
var company_component_1 = require('./components/company/company.component');
var question_set_list_component_1 = require('./components/question-sets/question-set-list/question-set-list.component');
var question_set_component_1 = require('./components/question-sets/question-set/question-set.component');
var topic_list_component_1 = require('./components/topic-list/topic-list.component');
var companies_component_1 = require('./components/company/company-list/companies.component');
var texteditor_component_1 = require('./components/shared/froala/texteditor.component');
var check_box_component_1 = require('./components/shared/check-box/check-box.component');
var radio_component_1 = require('./components/shared/radio/radio.component');
var online_test_component_1 = require('./components/online-test/online-test.component');
var user_list_component_1 = require('./components/users/user-list/user-list.component');
var user_component_1 = require('./components/users/user/user.component');
var online_test_list_component_1 = require('./components/online-test-list/online-test-list.component');
var login_component_1 = require('./components/login/login.component');
var appRoutes = [
    {
        path: '',
        redirectTo: '/questions',
        pathMatch: 'full'
    },
    {
        path: 'questions',
        component: questions_component_1.QuestionsComponent
    },
    {
        path: 'question/:question_id',
        component: question_component_1.QuestionComponent
    },
    {
        path: 'questionsets',
        component: question_set_list_component_1.QuestionSetListComponent
    },
    {
        path: 'questionset/:question_set_id',
        component: question_set_component_1.QuestionSetComponent
    },
    {
        path: 'topic',
        component: topic_component_1.TopicComponent
    },
    {
        path: 'topic/:id',
        component: topic_component_1.TopicComponent
    },
    {
        path: 'topiclist',
        component: topic_list_component_1.TopicListComponent
    },
    {
        path: 'froala',
        component: texteditor_component_1.TextEditorComponent
    },
    {
        path: 'company',
        component: company_component_1.CompanyComponent
    },
    {
        path: 'company/:id',
        component: company_component_1.CompanyComponent
    },
    {
        path: 'companylist',
        component: companies_component_1.CompaniesComponent
    },
    {
        path: 'onlinetest',
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
        path: 'onlinetest/:id',
        component: online_test_component_1.OnlineTestComponent
    },
    {
        path: 'onlinetestlist',
        component: online_test_list_component_1.OnlineTestListComponent
    },
    {
        path: 'login',
        component: login_component_1.LoginComponent
    }
];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
exports.routedComponents = [
    questions_component_1.QuestionsComponent, question_component_1.QuestionComponent,
    question_set_list_component_1.QuestionSetListComponent, question_set_component_1.QuestionSetComponent,
    topic_list_component_1.TopicListComponent, topic_component_1.TopicComponent,
    companies_component_1.CompaniesComponent, company_component_1.CompanyComponent,
    texteditor_component_1.TextEditorComponent, check_box_component_1.CheckBoxComponent, radio_component_1.RadioComponent,
    user_list_component_1.UserListComponent, user_component_1.UserComponent,
    online_test_component_1.OnlineTestComponent, online_test_list_component_1.OnlineTestListComponent,
    login_component_1.LoginComponent
];
//# sourceMappingURL=app.routing.js.map