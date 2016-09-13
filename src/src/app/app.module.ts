import { NgModule }       from '@angular/core';
import { BrowserModule  } from '@angular/platform-browser';
import { AppComponent }   from './app.component';
import  'materialize-css'
import {MaterializeDirective} from "angular2-materialize";
import {HttpModule } from '@angular/http';
import {FormsModule } from '@angular/forms';
import {RouterModule } from '@angular/router';
import {environment } from './';
import {enableProdMode } from '@angular/core';
import {appRouterProviders } from './app.routes';
import {provide} from '@angular/core';
import {TopicComponent} from './components/topic/topic.component'
import {QuestionsComponent} from './components/questions/question-list/questions.component';
import { QuestionSetListComponent } from './components/question-sets/question-set-list/question-set-list.component';
import {StudentComponent} from './components/student/student.component';
import {CompanyComponent} from './components/company/company.component';
import {TopicListComponent} from './components/topic-list/topic-list.component';
if (environment.production) {
  enableProdMode();
}
@NgModule({
    declarations: [AppComponent,QuestionsComponent,QuestionSetListComponent,MaterializeDirective,TopicComponent,StudentComponent,CompanyComponent,TopicListComponent],
    providers:[
 appRouterProviders,
  
    //   provide(Http, {
    //     useFactory: (xhrBackend: XHRBackend, requestOptions: RequestOptions, router: Router) => new HttpInterceptor(xhrBackend, requestOptions, router),
    //     deps: [XHRBackend, RequestOptions, Router]
    //   }),


    ],
    imports: [
    BrowserModule, 
    // Router
    RouterModule,
    HttpModule, 
    // Forms
    FormsModule, 
   
],

    bootstrap:    [AppComponent],
})
export class AppModule {}


