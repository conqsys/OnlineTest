"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var HighlightDirective = (function () {
    function HighlightDirective(el) {
        el.nativeElement.style.backgroundColor = 'yellow';
    }
    HighlightDirective = __decorate([
        core_1.Directive({ selector: '[myHighlight]' }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], HighlightDirective);
    return HighlightDirective;
}());
exports.HighlightDirective = HighlightDirective;
var NumbersOnlyDirective = (function () {
    function NumbersOnlyDirective(el) {
        this.el = el.nativeElement;
    }
    NumbersOnlyDirective.prototype.onKeyDown = function (e) {
        if (e.keyCode < 48 || e.keyCode > 57) {
            if (e.keyCode < 97) {
                e.target.value = e.target.value.slice(0, -1);
            }
        }
    };
    __decorate([
        core_1.HostListener('keyup', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], NumbersOnlyDirective.prototype, "onKeyDown", null);
    NumbersOnlyDirective = __decorate([
        core_1.Directive({
            selector: '[numbers-only]'
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], NumbersOnlyDirective);
    return NumbersOnlyDirective;
}());
exports.NumbersOnlyDirective = NumbersOnlyDirective;
//# sourceMappingURL=customdirectives.js.map