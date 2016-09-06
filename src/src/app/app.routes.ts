import { provideRouter, RouterConfig }  from '@angular/router';
import {QuestionsComponent} from './components/questions/questions.component';
import {StudentComponent} from './components/student/student.component';

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
  }


];

export const appRouterProviders = [
  provideRouter(routes)
];
