import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Login } from '../../model/login/login.model';
import { LoginService } from '../../services/login/login.service';

import { CookieService } from 'angular2-cookie/services/cookies.service';

@Component({
	moduleId: module.id,
	selector: 'login',
	templateUrl: 'login.component.html',
})

export class LoginComponent implements OnInit {
	model: Login;

	constructor(private loginService: LoginService,
				private router: Router,
				private cookie:CookieService) { 
		this.model = new Login();
		this.model.username="b@b.com"
		this.model.password="vuedlHlS"
	}

	ngOnInit() {
		
	}

	login(): void {
		this.loginService.login(this.model)
            .then(result => { 
				
				var obj = { user_id: result.user_id, 
							user_name: result.user_name, 
							user_email: result.user_email,
							user_mobile_no: result.user_mobile_no,
							role_id: result.role_id,
							role_name: result.role_name,
							company_id: result.company_id
						  };

				this.cookie.putObject("user", result.user);
				this.cookie.put("Authorization", "Bearer " + result.token);
				
				

                this.router.navigate(['/questionsets']);
            });
	}
}