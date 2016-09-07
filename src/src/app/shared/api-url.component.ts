
export class ApiUrl {
		static baseUrl:String='http://localhost:1337/';
		static CreateCustomer() { return this.baseUrl+ '/customers/new'}
		static GetCustomer(id:any) { return this.baseUrl+ '/customers/'+id}
	 	static GetAllDeals() { return this.baseUrl+ '/deals' }
		static GetOpenOrCreateAuction() { return this.baseUrl+ '/auctions/openorcreate' }
		static SubmitBid(auctionId:any) { return this.baseUrl+ '/auctions/'+auctionId+'/bids/newbid'};
		static UpdateBid(auctionId:any,bidId:any) { return this.baseUrl+ '/auctions/'+auctionId+'/bids/'+bidId+'/update'};

}