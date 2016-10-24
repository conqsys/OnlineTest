import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { LocalStorageService } from 'angular-2-local-storage';

import { BaseComponent } from '../base.component';

import { Login } from './shared/login.model';
import { LoginService } from './shared/login.service';

@Component({
  moduleId: module.id,
  selector: 'login',
  templateUrl: 'login.component.html',
  providers: [LoginService]
})
export class LoginComponent extends BaseComponent {
  private model: Login;

  constructor(private loginService: LoginService,
    private location: Location,
    localStorageService: LocalStorageService,
    router: Router) {
    super(localStorageService, router);

    this.model = new Login();
    this.model.username = 'amit8774@gmail.com';
    this.model.password = 'Ff3VvbeE';
  }

  login(): void {
    this.loginService
      .login(this.model)
      .then(result => {
        this.localStorageService.set('user', result.user);
        this.localStorageService.set('authorization', 'Bearer ' + result.token);
        this.location.replaceState('/questionSets');
        window.location.reload();
      });
  }

  validateLogin(): void {
    if (!this.model.username && this.model.username === '') {

    }
  }
}
