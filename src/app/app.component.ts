import { Component } from '@angular/core';
import { Router} from '@angular/router';
import { LocalStorageService } from 'angular-2-local-storage';

@Component({
  moduleId: module.id,
  selector: 'my-app',
  template: `<div class="col-md-12">
      
          <a class="btn" routerLink="/questions" routerLinkActive="active">Questions</a>
          <a class="btn" routerLink="/questionSets" routerLinkActive="active">Question Sets</a>
          <a class="btn" routerLink="/topics" routerLinkActive="active">Topic</a>
          <a class="btn" routerLink="/companies" routerLinkActive="active">Companies</a>
          <a class="btn" routerLink="/users" routerLinkActive="active">Users</a>
          <a class="btn" routerLink="/onlineTests" routerLinkActive="active">Online Test</a>
          <a class="btn" routerLink="/login" routerLinkActive="active">Login</a>
          <a class="btn" (click)=logout()>Logout</a>

    </div>
    <div class="col-md-12">
    <router-outlet></router-outlet></div>`,
  styleUrls: ['app.component.css']
})
export class AppComponent {
  authorization: any;
  title = 'Online Test';
  constructor(private router: Router,
    private localStorageService: LocalStorageService) {

  }

  logout(): void {
    this.authorization = this.localStorageService.get('authorization');
    if (this.authorization) {
      this.localStorageService.remove('authorization');
      this.localStorageService.remove('user');
    }
    this.router.navigate(['/login']);
  }
}
