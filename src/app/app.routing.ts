import { Routes, RouterModule } from '@angular/router';

import {QuestionsComponent} from './components/questions/question-list/questions.component';
import {QuestionComponent} from './components/questions/question/question.component';
import {TopicComponent} from './components/topic/topic.component';
import {CompanyComponent} from './components/company/company.component';
import { QuestionSetListComponent } from './components/question-sets/question-set-list/question-set-list.component';
import { QuestionSetComponent } from './components/question-sets/question-set/question-set.component';
import {TopicListComponent} from './components/topic-list/topic-list.component';
import {CompaniesComponent} from './components/company/company-list/companies.component';
import {TextEditorComponent} from './components/froala/texteditor.component'
import {HeroesComponent} from './heroes.component'
import {CheckBoxComponent} from './components/check-box/check-box.component'
import {RadioComponent} from './components/radio/radio.component'
import { OnlineTestComponent } from './components/online-test/online-test.component';
import { UserListComponent } from './components/users/user-list/user-list.component';
import { UserComponent } from './components/users/user/user.component';
import { OnlineTestListComponent } from './components/online-test-list/online-test-list.component';
import { LoginComponent } from './components/login/login.component';

const appRoutes: Routes = [
 
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
    path: 'question/:question_id',
    component: QuestionComponent
  },
  
  {
    path: 'questionsets',
    component: QuestionSetListComponent
  },
  {
    path: 'questionset/:question_set_id',
    component: QuestionSetComponent
  },
   {
    path: 'topic',
    component: TopicComponent
  },
  {
    path: 'topic/:id',
    component: TopicComponent
  },
   {
    path: 'topiclist',
    component: TopicListComponent
  },
   {
    path: 'froala',
    component: TextEditorComponent
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
  },
   {
    path: 'onlinetest',
    component: OnlineTestComponent
  },
   {
    path: 'users',
    component: UserListComponent
  },
   {
    path: 'user/:user_id',
    component: UserComponent
  },
  {
    path: 'onlinetest/:id',
    component: OnlineTestComponent
  },
   {
    path: 'onlinetestlist',
    component: OnlineTestListComponent
  },
   {
    path: 'login',
    component: LoginComponent
  }
];

export const routing = RouterModule.forRoot(appRoutes);

export const routedComponents = [
  QuestionsComponent, QuestionComponent, 
  QuestionSetListComponent, QuestionSetComponent,
  TopicListComponent, TopicComponent,
  CompaniesComponent, CompanyComponent,
  TextEditorComponent, HeroesComponent,CheckBoxComponent,RadioComponent,
  UserListComponent, UserComponent,
  OnlineTestComponent, OnlineTestListComponent,
  LoginComponent
];

