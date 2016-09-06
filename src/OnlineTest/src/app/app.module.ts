import { NgModule }       from '@angular/core';
import { BrowserModule  } from '@angular/platform-browser';
import { AppComponent }   from './app.component';
import {HttpModule } from '@angular/http';
import {FormsModule } from '@angular/forms';
import {RouterModule } from '@angular/router';
import {  environment } from './';
import { enableProdMode } from '@angular/core';
if (environment.production) {
  enableProdMode();
}
@NgModule({
    declarations: [AppComponent],
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


