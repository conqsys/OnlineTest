import { Component, ViewChild, Input, Output, OnInit } from '@angular/core';
import {DatePipe} from "@angular/common";
import { Router, ActivatedRoute } from '@angular/router';
import { UserModel } from '../../../model/user/user.model';
import { UserService } from '../../../services/user/user.service';

@Component({
    moduleId: module.id,
    selector:'app-user',
    templateUrl: 'user.component.html',
})
export /**
 * UserComponent
 */
class UserComponent implements OnInit {
    title: string;
    model: UserModel;
    company_id: number;
    user_id: number
    disabled: boolean
    
    constructor(private service: UserService, 
                private activatedRoute: ActivatedRoute, 
                private router:Router) {
        this.title = 'User';
        this.model = new UserModel();
        this.company_id = 1;
        this.disabled = false;
    }

    ngOnInit(): void {

        var subscriptions = this.activatedRoute.params.subscribe(params => {
         this.user_id = +params['user_id']; // (+) converts string 'id' to a number
        });

        if(this.user_id != 0 && this.user_id != undefined) {
            this.getUser(this.company_id, this.user_id);
        }
        else { 
            this.createUserObject("");
        }
    }
// create user object for save user 
    createUserObject(emailId: string): void {
        this.model = new UserModel(); 
        this.model.user_id=0;
        this.model.user_name="";
        this.model.user_email=emailId;
        this.model.user_mobile_no="";
        this.model.user_address="";
        this.model.is_active=true;
        this.model.is_fresher=false;
        this.model.user_exp_month=0;
        this.model.user_exp_year=0;
        this.model.role_id=3;
        
        this.model.created_by="admin";
        this.model.updated_by="admin";
        
        this.model.company_id=this.company_id;
    }
// get user by company_id and user_id
    getUser(company_id: number, user_id: number): void {
        this.service.getUser(company_id, user_id)
            .then(user => { 
                if(user.user_id) {
                    this.model = user;
                    this.model.company_id = this.company_id;
                }
                else {
                    this.router.navigate(['/users']);
                }
            });
    }
// search user by Email
    searchUserByEmail(): void {
        this.service.searchUserByEmail(this.model.user_email)
            .then(user => {
                if(user.user_id) {
                    this.disabled = true;
                    this.model = user;
                    this.model.company_id = this.company_id;
                }
                else {
                    this.disabled = false;
                    this.createUserObject(this.model.user_email);      
                }
            })
    }
// save user 
    saveUser(): void {
        this.service.saveUser(this.model)
            .then(user => {
                this.router.navigate(['/users']);
            })
    }
// open user list page
    cancel(): void {
        this.router.navigate(['/users']);
    }
}