"use strict";
var http_1 = require('@angular/http');
var ApiUrl = (function () {
    function ApiUrl() {
    }
    ApiUrl.CreateCustomer = function () { return this.baseUrl + '/customers/new'; };
    ApiUrl.GetCustomer = function (id) { return this.baseUrl + '/customers/' + id; };
    ApiUrl.GetAllDeals = function () { return this.baseUrl + '/deals'; };
    ApiUrl.GetOpenOrCreateAuction = function () { return this.baseUrl + '/auctions/openorcreate'; };
    ApiUrl.SubmitBid = function (auctionId) { return this.baseUrl + '/auctions/' + auctionId + '/bids/newbid'; };
    ;
    ApiUrl.UpdateBid = function (auctionId, bidId) { return this.baseUrl + '/auctions/' + auctionId + '/bids/' + bidId + '/update'; };
    ;
    ApiUrl.baseUrl = 'http://localhost:1337/';
    ApiUrl.headers = new http_1.Headers({
        'Content-Type': 'application/json'
    });
    return ApiUrl;
}());
exports.ApiUrl = ApiUrl;
//# sourceMappingURL=api-url.component.js.map