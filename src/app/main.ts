import { bootstrap }    from '@angular/platform-browser-dynamic';
import { AppComponent } from './app.component';
import { appRouterProviders } from './app.routes';
import {companyService} from "./services/companyService";
import {contactService} from "./services/contactService";
import {CallService} from './services/callService'
import { HTTP_PROVIDERS } from '@angular/http';
import {provideForms, disableDeprecatedForms} from '@angular/forms';
import {SELECT_DIRECTIVES} from "ng2-select";


bootstrap(AppComponent , [
  provideForms(),
  disableDeprecatedForms(),
  appRouterProviders,
  companyService,
 contactService,
  HTTP_PROVIDERS,
  CallService,
  SELECT_DIRECTIVES 
]);



