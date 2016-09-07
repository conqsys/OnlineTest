import { provideRouter, RouterConfig }  from '@angular/router';
import {QuestionsComponent} from './components/questions/questions.component';
import {StudentComponent} from './components/student/student.component';
import {CategoryComponent} from './components/category/category.component';
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
    path: 'category',
    component: CategoryComponent
  },
   {
    path: 'company',
    component: CompanyComponent
  }


];

export const appRouterProviders = [
  provideRouter(routes)
];
