"use strict";
var ApiUrls = (function () {
    function ApiUrls() {
    }
    ApiUrls.CreateCustomer = function () { return this.baseUrl + '/customers/new'; };
    ApiUrls.GetCustomer = function (id) { return this.baseUrl + '/customers/' + id; };
    ApiUrls.GetAllDeals = function () { return this.baseUrl + '/deals'; };
    ApiUrls.GetOpenOrCreateAuction = function () { return this.baseUrl + '/auctions/openorcreate'; };
    ApiUrls.SubmitBid = function (auctionId) { return this.baseUrl + '/auctions/' + auctionId + '/bids/newbid'; };
    ;
    ApiUrls.UpdateBid = function (auctionId, bidId) { return this.baseUrl + '/auctions/' + auctionId + '/bids/' + bidId + '/update'; };
    ;
    ApiUrls.baseUrl = 'http://localhost:6060/';
    return ApiUrls;
}());
exports.ApiUrls = ApiUrls;
//# sourceMappingURL=apiurls.js.map