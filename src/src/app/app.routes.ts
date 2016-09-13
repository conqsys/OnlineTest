import { provideRouter, RouterConfig }  from '@angular/router';
import {QuestionsComponent} from './components/questions/question-list/questions.component';
import {StudentComponent} from './components/student/student.component';
import {TopicComponent} from './components/topic/topic.component';
import {CompanyComponent} from './components/company/company.component';
import { QuestionSetListComponent } from './components/question-sets/question-set-list/question-set-list.component';
import { QuestionSetComponent } from './components/question-sets/question-set/question-set.component';
import {TopicListComponent} from './components/topic-list/topic-list.component';
import {CompaniesComponent} from './components/company/company-list/companies.component';

const routes: RouterConfig = [
  {
    path: '',
    redirectTo: '/questions',
    pathMatch: 'full'
  },

  {
    path: 'questions',
    component: QuestionsComponent
  },
  {
    path: 'student',
    component: StudentComponent
  },
  {
    path: 'questionsets',
    component: QuestionSetListComponent
  },
  {
    path: 'questionset',
    component: QuestionSetComponent
  },
   {
    path: 'topic',
    component: TopicComponent
  },
   {
    path: 'topiclist',
    component: TopicListComponent
  },
   {
    path: 'company',
    component: CompanyComponent
  },
  {
    path: 'company/:id',
    component: CompanyComponent
  },
   {
    path: 'companylist',
    component: CompaniesComponent
  }


];

export const appRouterProviders = [
  provideRouter(routes)
];
