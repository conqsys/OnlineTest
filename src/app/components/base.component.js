"use strict";
var BaseComponent = (function () {
    function BaseComponent(localStorageService, router) {
        this.localStorageService = localStorageService;
        this.router = router;
        var token = this.localStorageService.get('authorization');
        if (token) {
            this.user = this.localStorageService.get('user');
        }
        else {
            this.router.navigate(['/login']);
        }
    }
    return BaseComponent;
}());
exports.BaseComponent = BaseComponent;
//# sourceMappingURL=base.component.js.map