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
require('../script/froala_editor.pkgd.min');
var FroalaEditorDirective = (function () {
    function FroalaEditorDirective(el) {
        // editor options
        this._opts = {
            immediateAngularModelUpdate: false
        };
        // flag to tell if _initContent is populated
        this._gotContent = false;
        this._listeningEvents = [];
        //blur--froalaInit directive as output:send texteditor component in textchanged 
        this.froalaEditorTextUpdate = new core_1.EventEmitter();
        // froalaModel directive as output: update model if editor contentChanged
        this.froalaModelChange = new core_1.EventEmitter();
        // froalaInit directive as output: send manual editor initialization
        this.froalaInit = new core_1.EventEmitter();
        // jquery wrap and store element 
        this._$element = $(el.nativeElement);
        this.froalaEditorTextUpdate = new core_1.EventEmitter();
    }
    Object.defineProperty(FroalaEditorDirective.prototype, "froalaEditor", {
        // froalaEditor directive as input: store the editor options
        set: function (opts) {
            this._opts = opts || this._opts;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FroalaEditorDirective.prototype, "froalaModel", {
        // froalaModel directive as input: store initial editor content
        set: function (content) {
            if (!this._gotContent) {
                this._initContent = content;
                this._gotContent = true;
            }
        },
        enumerable: true,
        configurable: true
    });
    // update model if editor contentChanged
    FroalaEditorDirective.prototype.updateModel = function () {
        var returnedHtml = this._$element.froalaEditor('html.get');
        if (typeof returnedHtml === 'string') {
            this.froalaModelChange.emit(returnedHtml);
        }
    };
    // register event on jquery element
    FroalaEditorDirective.prototype.registerEvent = function (element, eventName, callback) {
        if (!element || !eventName || !callback) {
            return;
        }
        this._listeningEvents.push(eventName);
        element.on(eventName, callback);
    };
    FroalaEditorDirective.prototype.initListeners = function () {
        var self = this;
        // bind contentChange and keyup event to froalaModel
        this.registerEvent(this._$element, 'froalaEditor.contentChanged', function (ed) {
            self.updateModel();
        });
        if (this._opts.immediateAngularModelUpdate) {
            this.registerEvent(this._editor, 'keyup', function () {
                self.updateModel();
            });
        }
    };
    // register events from editor options
    FroalaEditorDirective.prototype.registerFroalaEvents = function () {
        if (!this._opts.events) {
            return;
        }
        for (var eventName in this._opts.events) {
            if (this._opts.events.hasOwnProperty(eventName)) {
                this.registerEvent(this._$element, eventName, this._opts.events[eventName]);
            }
        }
    };
    FroalaEditorDirective.prototype.createEditor = function () {
        var self = this;
        this._editor = this._$element.froalaEditor(this._opts).data('froala.editor').$el;
        // set initial content
        if (this._initContent) {
            this.registerEvent(this._$element, 'froalaEditor.initialized', function () {
                self._$element.froalaEditor('html.set', self._initContent || '', true);
                //This will reset the undo stack everytime the model changes externally. Can we fix this?
                self._$element.froalaEditor('undo.reset');
                self._$element.froalaEditor('undo.saveStep');
            });
        }
        // Registering events before initializing the editor will bind the initialized event correctly.
        this.registerFroalaEvents();
        // init editor
        this._editor = this._$element.froalaEditor(this._opts).data('froala.editor').$el;
        this.initListeners();
    };
    FroalaEditorDirective.prototype.destroyEditor = function () {
        if (this._$element) {
            this._$element.off(this._listeningEvents.join(" "));
            this._editor.off('keyup');
            this._$element.froalaEditor('destroy');
            this._listeningEvents.length = 0;
        }
    };
    FroalaEditorDirective.prototype.getEditor = function () {
        if (this._$element) {
            return this._$element.froalaEditor.bind(this._$element);
        }
        return null;
    };
    // send manual editor initialization
    FroalaEditorDirective.prototype.generateManualController = function () {
        var self = this;
        var controls = {
            initialize: this.createEditor.bind(this),
            destroy: this.destroyEditor.bind(this),
            getEditor: this.getEditor.bind(this),
        };
        this.froalaInit.emit(controls);
    };
    // TODO not sure if ngOnInit is executed after @inputs
    FroalaEditorDirective.prototype.ngOnInit = function () {
        // check if output froalaInit is present. Maybe observers is private and should not be used?? TODO how to better test that an output directive is present. 
        if (!this.froalaInit.observers.length) {
            this.createEditor();
        }
        else {
            this.generateManualController();
        }
    };
    FroalaEditorDirective.prototype.ngOnDestroy = function () {
        this.destroyEditor();
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], FroalaEditorDirective.prototype, "froalaEditorTextUpdate", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object), 
        __metadata('design:paramtypes', [Object])
    ], FroalaEditorDirective.prototype, "froalaEditor", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String), 
        __metadata('design:paramtypes', [String])
    ], FroalaEditorDirective.prototype, "froalaModel", null);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], FroalaEditorDirective.prototype, "froalaModelChange", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], FroalaEditorDirective.prototype, "froalaInit", void 0);
    FroalaEditorDirective = __decorate([
        core_1.Directive({
            selector: '[froalaEditor]'
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], FroalaEditorDirective);
    return FroalaEditorDirective;
}());
exports.FroalaEditorDirective = FroalaEditorDirective;
var FroalaViewDirective = (function () {
    function FroalaViewDirective(renderer, element) {
        this.renderer = renderer;
        this._element = element.nativeElement;
    }
    Object.defineProperty(FroalaViewDirective.prototype, "froalaView", {
        // update content model as it comes
        set: function (content) {
            this._element.innerHTML = content;
        },
        enumerable: true,
        configurable: true
    });
    FroalaViewDirective.prototype.ngAfterViewInit = function () {
        this.renderer.setElementClass(this._element, "fr-view", true);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String), 
        __metadata('design:paramtypes', [String])
    ], FroalaViewDirective.prototype, "froalaView", null);
    FroalaViewDirective = __decorate([
        core_1.Directive({
            selector: '[froalaView]'
        }), 
        __metadata('design:paramtypes', [core_1.Renderer, core_1.ElementRef])
    ], FroalaViewDirective);
    return FroalaViewDirective;
}());
exports.FroalaViewDirective = FroalaViewDirective;
//# sourceMappingURL=froala.directives.js.map