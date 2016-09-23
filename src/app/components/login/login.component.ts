import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Login } from '../../model/login/login.model';
import { LoginService } from '../../services/login/login.service';

import {BaseComponent} from '../base.component';
import { LocalStorageService } from 'angular-2-local-storage';

@Component({
	moduleId: module.id,
	selector: 'login',
	templateUrl: 'login.component.html'
})
export class LoginComponent extends BaseComponent {
	model: Login;

	constructor(
		private loginService: LoginService,
		localStorageService: LocalStorageService,
		router: Router) {
		super(localStorageService, router);
		
		this.model = new Login();
		this.model.username = 'amit8774@gmail.com';
		this.model.password = 'Ff3VvbeE';
	}

	login(): void {
		this.loginService.login(this.model)
            .then(result => {
				this.localStorageService.set('user', result.user);
				this.localStorageService.set('authorization', 'Bearer ' + result.token);
                this.router.navigate(['/questionsets']);
            });
	}
}
