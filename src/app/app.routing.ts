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
import {test_child,test_child_child} from './components/test/test.child'

import  'materialize-css'
import {MaterializeDirective} from "angular2-materialize";
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
    path: 'testchild',
    component: test_child
  }
];

export const routing = RouterModule.forRoot(appRoutes);

export const routedComponents = [QuestionsComponent, QuestionComponent, TopicComponent,
CompanyComponent,QuestionSetListComponent,QuestionSetComponent,TopicListComponent,
CompaniesComponent,TextEditorComponent,HeroesComponent,CheckBoxComponent,RadioComponent,MaterializeDirective,test_child,test_child_child
];

