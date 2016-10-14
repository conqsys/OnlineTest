import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { LocalStorageService } from 'angular-2-local-storage';

import {BaseComponent} from '../../base.component';

import { User } from '../../../shared/model/user/user.model';
import { UserService } from '../../../shared/services/user/user.service';

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
    model: User[] = [];
    selectedUserId: number;

    constructor(private userService: UserService,
        localStorageService: LocalStorageService,
        router: Router) {
        super(localStorageService, router);
        this.title = 'Users';
        this.model = new Array<User>();
    }

    ngOnInit(): void {
        if (this.user) {
            this.getUsers();
        }
    }

    getUsers(): void {
        this.userService.getUsers()
            .then(users => {
                this.model = users;
            });
    }

    selectUser(selectedUser: User): void {
        this.selectedUserId = selectedUser.user_id;

        this.router.navigate(['/user', this.selectedUserId]);
    }

    addUser(): void {
        this.router.navigate(['/user', 0]);
    }
}
