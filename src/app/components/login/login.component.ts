import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Login } from '../../model/login/login.model';
import { LoginService } from '../../services/login/login.service';

@Component({
	moduleId: module.id,
	selector: 'login',
	templateUrl: 'login.component.html',
})

export class LoginComponent implements OnInit {
	model: Login;

	constructor(private loginService: LoginService,
				private router: Router) { 
		this.model = new Login();
	}

	ngOnInit() {
		
	}

	login(): void {
		this.loginService.login(this.model)
            .then(result => { 
                this.router.navigate(['/questionsets']);
            });
	}
}