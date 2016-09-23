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
var TextEditorComponent = (function () {
    function TextEditorComponent() {
        this.initializeFloraEditor();
    }
    TextEditorComponent.prototype.ngOnInit = function () {
        this.editorContent = '<p>This is my awesome content</p>';
    };
    TextEditorComponent.prototype.initializeFloraEditor = function () {
        this.editorContent = '<p>This is my awesome content</p>';
        this.titleOptions = {
            placeholderText: 'Edit Your Content Here!',
            charCounterCount: false
        };
    };
    TextEditorComponent = __decorate([
        core_1.Component({
            selector: 'text-editor',
            template: "\n  ",
            // directives: [FroalaEditorDirective, FroalaViewDirective],
            providers: [],
            styleUrls: []
        }), 
        __metadata('design:paramtypes', [])
    ], TextEditorComponent);
    return TextEditorComponent;
}());
exports.TextEditorComponent = TextEditorComponent;
//# sourceMappingURL=texteditor.component.js.map