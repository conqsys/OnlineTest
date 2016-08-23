import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';


@Component({
  selector: 'my-app',
  template: `
  <h1>{{title}}</h1>
 <nav>
   
  
 </nav>
 <router-outlet></router-outlet>
  `,
  styleUrls: ['app/stylesheet/app.component.css'],
  directives: [ROUTER_DIRECTIVES],

})
export class AppComponent {
  title = '';
}
