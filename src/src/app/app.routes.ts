import { provideRouter, RouterConfig }  from '@angular/router';
import {QuestionsComponent} from './components/questions/questions.component';
import {StudentComponent} from './components/student/student.component';
import {TopicComponent} from './components/topic/topic.component';
import {CompanyComponent} from './components/company/company.component'
;const routes: RouterConfig = [
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
    path: 'topic',
    component: TopicComponent
  },
   {
    path: 'company',
    component: CompanyComponent
  }


];

export const appRouterProviders = [
  provideRouter(routes)
];
