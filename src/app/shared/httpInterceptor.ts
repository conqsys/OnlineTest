import {Injectable, EventEmitter} from '@angular/core';
import {Http, Request, RequestOptionsArgs, Response, XHRBackend, RequestOptions, ConnectionBackend, Headers} from '@angular/http';
import { Router} from '@angular/router';
import { Observable } from 'rxjs/Rx';
import * as Rx from 'rxjs/Rx';

import { CookieService } from 'angular2-cookie/services/cookies.service';

export class HttpInterceptor extends Http {

    requested : EventEmitter<string>;
    completed : EventEmitter<string>;
    error : EventEmitter<string>;
    
    constructor(backend: ConnectionBackend, 
                defaultOptions: RequestOptions, 
                private router: Router,
                private cookie: CookieService) {
        super(backend, defaultOptions);
        this.requested = new EventEmitter<string>();
        this.completed = new EventEmitter<string>();
        this.error = new EventEmitter<string>(); 
        
    }
 
    request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
        return this.intercept(super.request(url, options));
    }
 
    get(url: string, options?: RequestOptionsArgs): Observable<Response> {
        //this.requested.emit('start');
        
        if (options == null) {
            options = new RequestOptions();
        }
        if (options.headers == null) {
            options.headers = new Headers();
        }
        var authorization = this.cookie.get('Authorization');
        if(authorization){
            options.headers.append('Authorization', authorization);
        }

        return this.intercept(super.get(url,options));
    }
 
    post(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
        //this.requested.emit('start');
        
        return this.intercept(super.post(url, body, this.getRequestOptionArgs(options)));
    }
 
    put(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
        //this.requested.emit('start');
        
        return this.intercept(super.put(url, body, this.getRequestOptionArgs(options)));
    }
 
    delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
        //this.requested.emit('start');
        
        return this.intercept(super.delete(url, options));
    }
    
    getRequestOptionArgs(options?: RequestOptionsArgs) : RequestOptionsArgs {
        if (options == null) {
            options = new RequestOptions();
        }
        if (options.headers == null) {
            options.headers = new Headers();
        }
        options.headers.append('Content-Type', 'application/json');
        var authorization = this.cookie.get('Authorization');
        if(authorization){
            options.headers.append('Authorization', authorization);
        }

        return options;
    }
 
    intercept(observable: Observable<Response>): Observable<Response> {
        //this.completed.emit('end');
        //this.loadingPage.close();
        return observable.catch((err, source) => {
            //this.error.emit(err);
            if (err.status  == 401) {                   // UnOthorised Access
                var authorization = this.cookie.get('Authorization');
                if(authorization){
                    this.cookie.removeAll();
                }
                this.router.navigate(['/login']);
                return Observable.empty();
                
            } else if (err.status == 403) {
                console.log("you can't access api");
                return Observable.throw(err);
            } else if (err.status  == 0) {                // Api Connection Refused
                console.log('ERR_CONNECTION_REFUSED, Api is down');
                return Observable.throw(err);
            } 
            else {
                return Observable.throw(err);
            }
        });

    }
}
