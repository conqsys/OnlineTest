import { Component, ViewChild, Input, Output, OnInit } from '@angular/core';
import {DatePipe} from "@angular/common";
import { Router} from '@angular/router';

import { UserModel } from '../../../model/user/user.model';
import { UserService } from '../../../services/user/user.service';

@Component({
    moduleId: module.id,
    selector:'user-list',
    templateUrl: 'user-list.component.html',
})
export /**
 * UserListComponent
 */
class UserListComponent implements OnInit {

    title: string;
    model: UserModel[]=[];
    selectedUserId: number;
    company_id: number; 
    
    constructor(private service: UserService, private router: Router) {
        this.title = 'Users';
        this.model = new Array<UserModel>();
        this.company_id = 1;
    }

    ngOnInit(): void {
        this.getUsers(this.company_id);
    }
// get user by company_id
    getUsers(company_id:number): void {
        this.service.getUsers(company_id)
            .then(users => { 
              this.model = users;
            });
    }
// navigate user_id to user component.ts
    selectUser(selectedUser:UserModel): void {
        this.selectedUserId = selectedUser.user_id; 
        
        this.router.navigate(['/user', this.selectedUserId]);
    }
// open user page for add user
    addUser(): void {
        this.router.navigate(['/user', 0]);
    }
}