import { provideRouter, RouterConfig }  from '@angular/router';
import {company_info} from './components/company/company.component'


const routes: RouterConfig = [
  {
    path: '',
    redirectTo: '/company',
    pathMatch: 'full'
  },

  {
    path: 'company',
    component: company_info
  }

];

export const appRouterProviders = [
  provideRouter(routes)
];
