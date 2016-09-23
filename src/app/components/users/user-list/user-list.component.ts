import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';

import { UserModel } from '../../../model/user/user.model';
import { UserService } from '../../../services/user/user.service';

import {BaseComponent} from '../../base.component';
import { LocalStorageService } from 'angular-2-local-storage';

@Component({
    moduleId: module.id,
    selector: 'user-list',
    templateUrl: 'user-list.component.html',
})
export /**
 * UserListComponent
 */
    class UserListComponent extends BaseComponent implements OnInit {

    title: string;
    model: UserModel[] = [];
    selectedUserId: number;

    constructor(private service: UserService,
        localStorageService: LocalStorageService,
        router: Router) {
        super(localStorageService, router);
        this.title = 'Users';
        this.model = new Array<UserModel>();
    }

    ngOnInit(): void {
        if (this.user) {
            this.getUsers(this.user.company_id);
        }
    }

    // get user by company_id
    getUsers(company_id: number): void {
        this.service.getUsers(company_id)
            .then(users => {
                this.model = users;
            });
    }

    // navigate user_id to user component.ts
    selectUser(selectedUser: UserModel): void {
        this.selectedUserId = selectedUser.user_id;

        this.router.navigate(['/user', this.selectedUserId]);
    }

    // open user page for add user
    addUser(): void {
        this.router.navigate(['/user', 0]);
    }
}
