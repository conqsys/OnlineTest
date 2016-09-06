import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule }              from './app/app.module';
import "materialize-css";
import "angular2-materialize";
platformBrowserDynamic().bootstrapModule(AppModule);




// import { bootstrap } from '@angular/platform-browser-dynamic';
// import { enableProdMode } from '@angular/core';
// import { AppComponent, environment } from './app/';

// if (environment.production) {
//   enableProdMode();
// }

// bootstrap(AppComponent);
