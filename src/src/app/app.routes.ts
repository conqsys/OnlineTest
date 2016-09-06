import { provideRouter, RouterConfig }  from '@angular/router';
import {QuestionsComponent} from './components/questions/questions.component';

const routes: RouterConfig = [
  {
    path: '',
    redirectTo: '/questions',
    pathMatch: 'full'
  },

  {
    path: 'questions',
    component: QuestionsComponent
  }

];

export const appRouterProviders = [
  provideRouter(routes)
];
