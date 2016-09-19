import { Component } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'my-app',
  template: `<div class="col-md-12">
      
          <a class="btn" routerLink="/questions" routerLinkActive="active">Questions</a>
          <a class="btn" routerLink="/questionsets" routerLinkActive="active">Question Sets</a>
          <a class="btn" routerLink="/topiclist" routerLinkActive="active">Topic</a>
          <a class="btn" routerLink="/companylist" routerLinkActive="active">Companies</a>
          <a class="btn" routerLink="/users" routerLinkActive="active">Users</a>

    </div>
    <div class="col-md-12">
    <router-outlet></router-outlet></div>`,
  styleUrls: ['app.component.css']
})
export class AppComponent {
  title = 'Tour of Heroes';
}
