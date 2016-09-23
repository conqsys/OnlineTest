import { Component, ViewChild, Input, Output, OnInit, Injector, ReflectiveInjector } from '@angular/core';
import { Router} from '@angular/router';
import { LocalStorageService } from 'angular-2-local-storage';

export class BaseComponent {
    user: any;

    constructor(protected localStorageService: LocalStorageService,
        protected router: Router) {
        var token = this.localStorageService.get('authorization');
        if (token) {
            this.user = this.localStorageService.get('user');
        } else {
            this.router.navigate(['/login']);
        }
    }
} 