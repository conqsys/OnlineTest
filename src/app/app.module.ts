import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {Router} from '@angular/router';
import {HttpInterceptor} from './shared/httpInterceptor';
import { Http, RequestOptions } from '@angular/http';

import { XHRBackend } from '@angular/http';

import './rxjs-extensions';
import 'materialize-css';
import {MaterializeDirective} from 'angular2-materialize';
import { LocalStorageService, LOCAL_STORAGE_SERVICE_CONFIG } from 'angular-2-local-storage';

import { AppComponent } from './app.component';
import { routing, routedComponents } from './app.routing';
import {StatinfoComponent} from './components/shared/statinfo/statinfo.component';
import {StatsComponent} from './components/shared/stats/stats.component';

import { QuestionService } from './services/question/question.service';
import { TopicService } from './services/topic/topic.service';
import { QuestionOptionService } from './services/question-option/question-option.service';
import { CompanyService } from './services/company/company.service';
import { QuestionSetService } from './services/question-set/question-set.service';
import { OnlineTestService } from './services/online-test/online-test.service';
import { UserService } from './services/user/user.service';
import { LoginService } from './services/login/login.service';

import { ControlMessages } from './Components/validation/control-messages.component';
import { ValidationService } from './services/validation/validation.service';
import { FroalaEditorDirective } from './components/shared/froala/directives/froala.directives';

// Create config options (see ILocalStorageServiceConfigOptions) for deets:
let localStorageServiceConfig = {
  prefix: 'my-app',
  storageType: 'localStorage'
};

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    routing,
    HttpModule
  ],
  declarations: [
    AppComponent,
    ControlMessages,
    routedComponents,
    MaterializeDirective,
    FroalaEditorDirective,
    StatinfoComponent,
    StatsComponent
  ],
  providers: [
    QuestionService,
    TopicService,
    QuestionOptionService,
    CompanyService,
    QuestionSetService,
    OnlineTestService,
    UserService,
    LoginService,
    ValidationService,
    LocalStorageService,
    {
      provide: Http,
      useFactory: (xhrBackend: XHRBackend,
        requestOptions: RequestOptions,
        router: Router,
        localStorageService: LocalStorageService) => new HttpInterceptor(xhrBackend,
          requestOptions,
          router,
          localStorageService),

      deps: [XHRBackend, RequestOptions, Router, LocalStorageService],
    },
    { provide: LOCAL_STORAGE_SERVICE_CONFIG, useValue: localStorageServiceConfig },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
