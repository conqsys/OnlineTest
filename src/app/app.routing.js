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
var texteditor_component_1 = require('./components/froala/texteditor.component');
var heroes_component_1 = require('./heroes.component');
var check_box_component_1 = require('./components/check-box/check-box.component');
var radio_component_1 = require('./components/radio/radio.component');
require('materialize-css');
var angular2_materialize_1 = require("angular2-materialize");
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
    }
];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
exports.routedComponents = [questions_component_1.QuestionsComponent, question_component_1.QuestionComponent, topic_component_1.TopicComponent,
    company_component_1.CompanyComponent, question_set_list_component_1.QuestionSetListComponent, question_set_component_1.QuestionSetComponent, topic_list_component_1.TopicListComponent,
    companies_component_1.CompaniesComponent, texteditor_component_1.TextEditorComponent, heroes_component_1.HeroesComponent, check_box_component_1.CheckBoxComponent, radio_component_1.RadioComponent, angular2_materialize_1.MaterializeDirective
];
//# sourceMappingURL=app.routing.js.map