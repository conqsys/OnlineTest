"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var Rx_1 = require('rxjs/Rx');
var HttpInterceptor = (function (_super) {
    __extends(HttpInterceptor, _super);
    function HttpInterceptor(backend, defaultOptions, router) {
        _super.call(this, backend, defaultOptions);
        this.router = router;
        this.requested = new core_1.EventEmitter();
        this.completed = new core_1.EventEmitter();
        this.error = new core_1.EventEmitter();
    }
    HttpInterceptor.prototype.request = function (url, options) {
        return this.intercept(_super.prototype.request.call(this, url, options));
    };
    HttpInterceptor.prototype.get = function (url, options) {
        //this.requested.emit('start');
        return this.intercept(_super.prototype.get.call(this, url, options));
    };
    HttpInterceptor.prototype.post = function (url, body, options) {
        //this.requested.emit('start');
        return this.intercept(_super.prototype.post.call(this, url, body, this.getRequestOptionArgs(options)));
    };
    HttpInterceptor.prototype.put = function (url, body, options) {
        //this.requested.emit('start');
        return this.intercept(_super.prototype.put.call(this, url, body, this.getRequestOptionArgs(options)));
    };
    HttpInterceptor.prototype.delete = function (url, options) {
        //this.requested.emit('start');
        return this.intercept(_super.prototype.delete.call(this, url, options));
    };
    HttpInterceptor.prototype.getRequestOptionArgs = function (options) {
        if (options == null) {
            options = new http_1.RequestOptions();
        }
        if (options.headers == null) {
            options.headers = new http_1.Headers();
        }
        options.headers.append('Content-Type', 'application/json');
        return options;
    };
    HttpInterceptor.prototype.intercept = function (observable) {
        var _this = this;
        //this.completed.emit('end');
        //this.loadingPage.close();
        return observable.catch(function (err, source) {
            //this.error.emit(err);
            if (err.status == 401) {
                _this.router.navigate(['/login']);
                return Rx_1.Observable.empty();
            }
            else if (err.status == 403) {
                console.log("you can't access api");
                return Rx_1.Observable.throw(err);
            }
            else if (err.status == 0) {
                console.log('ERR_CONNECTION_REFUSED, Api is down');
                return Rx_1.Observable.throw(err);
            }
            else {
                return Rx_1.Observable.throw(err);
            }
        });
    };
    return HttpInterceptor;
}(http_1.Http));
exports.HttpInterceptor = HttpInterceptor;
//# sourceMappingURL=httpInterceptor.js.map