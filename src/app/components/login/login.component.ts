import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Login } from '../../model/login/login.model';
import { LoginService } from '../../services/login/login.service';

import { LocalStorageService } from 'angular-2-local-storage';

@Component({
	moduleId: module.id,
	selector: 'login',
	templateUrl: 'login.component.html',
})

export class LoginComponent implements OnInit {
	model: Login;

	constructor(private loginService: LoginService,
		private router: Router,
		private localStorageService: LocalStorageService) {
		this.model = new Login();
		this.model.username = "amit8774@gmail.com"
		this.model.password = "Ff3VvbeE"
	}

	ngOnInit() {

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