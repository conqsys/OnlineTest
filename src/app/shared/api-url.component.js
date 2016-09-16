"use strict";
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
    ApiUrl.baseUrl = 'http://192.168.1.161:1337/';
    return ApiUrl;
}());
exports.ApiUrl = ApiUrl;
//# sourceMappingURL=api-url.component.js.map