(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('@angular2-material/core')) :
    typeof define === 'function' && define.amd ? define(['exports', '@angular/core', '@angular/common', '@angular2-material/core'], factory) :
    (factory((global.md = global.md || {}, global.md.sidenav = global.md.sidenav || {}),global.ng.core,global.ng.common,global.md.core));
}(this, (function (exports,_angular_core,_angular_common,_angular2Material_core) { 'use strict';

var __extends = (window && window.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (window && window.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (window && window.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (window && window.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
/** Exception thrown when two MdSidenav are matching the same side. */
var MdDuplicatedSidenavError = (function (_super) {
    __extends(MdDuplicatedSidenavError, _super);
    function MdDuplicatedSidenavError(align) {
        _super.call(this, "A sidenav was already declared for 'align=\"" + align + "\"'");
    }
    return MdDuplicatedSidenavError;
}(_angular2Material_core.MdError));
/**
 * <md-sidenav> component.
 *
 * This component corresponds to the drawer of the sidenav.
 *
 * Please refer to README.md for examples on how to use it.
 */
var MdSidenav = (function () {
    /**
     * @param _elementRef The DOM element reference. Used for transition and width calculation.
     *     If not available we do not hook on transitions.
     */
    function MdSidenav(_elementRef) {
        this._elementRef = _elementRef;
        /** Alignment of the sidenav (direction neutral); whether 'start' or 'end'. */
        this.align = 'start';
        /** Mode of the sidenav; whether 'over' or 'side'. */
        this.mode = 'over';
        /** Whether the sidenav is opened. */
        this._opened = false;
        /** Event emitted when the sidenav is being opened. Use this to synchronize animations. */
        this.onOpenStart = new _angular_core.EventEmitter();
        /** Event emitted when the sidenav is fully opened. */
        this.onOpen = new _angular_core.EventEmitter();
        /** Event emitted when the sidenav is being closed. Use this to synchronize animations. */
        this.onCloseStart = new _angular_core.EventEmitter();
        /** Event emitted when the sidenav is fully closed. */
        this.onClose = new _angular_core.EventEmitter();
        this._transition = false;
    }
    Object.defineProperty(MdSidenav.prototype, "opened", {
        /**
         * Whether the sidenav is opened. We overload this because we trigger an event when it
         * starts or end.
         */
        get: function () { return this._opened; },
        set: function (v) {
            this.toggle(v);
        },
        enumerable: true,
        configurable: true
    });
    /** Open this sidenav, and return a Promise that will resolve when it's fully opened (or get
     * rejected if it didn't). */
    MdSidenav.prototype.open = function () {
        return this.toggle(true);
    };
    /**
     * Close this sidenav, and return a Promise that will resolve when it's fully closed (or get
     * rejected if it didn't).
     */
    MdSidenav.prototype.close = function () {
        return this.toggle(false);
    };
    /**
     * Toggle this sidenav. This is equivalent to calling open() when it's already opened, or
     * close() when it's closed.
     * @param isOpen
     */
    MdSidenav.prototype.toggle = function (isOpen) {
        var _this = this;
        if (isOpen === void 0) { isOpen = !this.opened; }
        // Shortcut it if we're already opened.
        if (isOpen === this.opened) {
            if (!this._transition) {
                return Promise.resolve(null);
            }
            else {
                return isOpen ? this._openPromise : this._closePromise;
            }
        }
        this._opened = isOpen;
        this._transition = true;
        if (isOpen) {
            this.onOpenStart.emit(null);
        }
        else {
            this.onCloseStart.emit(null);
        }
        if (isOpen) {
            if (this._openPromise == null) {
                this._openPromise = new Promise(function (resolve, reject) {
                    _this._openPromiseResolve = resolve;
                    _this._openPromiseReject = reject;
                });
            }
            return this._openPromise;
        }
        else {
            if (this._closePromise == null) {
                this._closePromise = new Promise(function (resolve, reject) {
                    _this._closePromiseResolve = resolve;
                    _this._closePromiseReject = reject;
                });
            }
            return this._closePromise;
        }
    };
    /**
     * When transition has finished, set the internal state for classes and emit the proper event.
     * The event passed is actually of type TransitionEvent, but that type is not available in
     * Android so we use any.
     */
    MdSidenav.prototype._onTransitionEnd = function (transitionEvent) {
        if (transitionEvent.target == this._elementRef.nativeElement
            && transitionEvent.propertyName.endsWith('transform')) {
            this._transition = false;
            if (this._opened) {
                if (this._openPromise != null) {
                    this._openPromiseResolve();
                }
                if (this._closePromise != null) {
                    this._closePromiseReject();
                }
                this.onOpen.emit(null);
            }
            else {
                if (this._closePromise != null) {
                    this._closePromiseResolve();
                }
                if (this._openPromise != null) {
                    this._openPromiseReject();
                }
                this.onClose.emit(null);
            }
            this._openPromise = null;
            this._closePromise = null;
        }
    };
    Object.defineProperty(MdSidenav.prototype, "_isClosing", {
        get: function () {
            return !this._opened && this._transition;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdSidenav.prototype, "_isOpening", {
        get: function () {
            return this._opened && this._transition;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdSidenav.prototype, "_isClosed", {
        get: function () {
            return !this._opened && !this._transition;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdSidenav.prototype, "_isOpened", {
        get: function () {
            return this._opened && !this._transition;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdSidenav.prototype, "_isEnd", {
        get: function () {
            return this.align == 'end';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdSidenav.prototype, "_modeSide", {
        get: function () {
            return this.mode == 'side';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdSidenav.prototype, "_modeOver", {
        get: function () {
            return this.mode == 'over';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdSidenav.prototype, "_modePush", {
        get: function () {
            return this.mode == 'push';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdSidenav.prototype, "_width", {
        /** TODO: internal (needed by MdSidenavLayout). */
        get: function () {
            if (this._elementRef.nativeElement) {
                return this._elementRef.nativeElement.offsetWidth;
            }
            return 0;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        _angular_core.Input(), 
        __metadata('design:type', Object)
    ], MdSidenav.prototype, "align", void 0);
    __decorate([
        _angular_core.Input(), 
        __metadata('design:type', Object)
    ], MdSidenav.prototype, "mode", void 0);
    __decorate([
        _angular_core.Input('opened'),
        _angular2Material_core.BooleanFieldValue(), 
        __metadata('design:type', Boolean)
    ], MdSidenav.prototype, "_opened", void 0);
    __decorate([
        _angular_core.Output('open-start'), 
        __metadata('design:type', Object)
    ], MdSidenav.prototype, "onOpenStart", void 0);
    __decorate([
        _angular_core.Output('open'), 
        __metadata('design:type', Object)
    ], MdSidenav.prototype, "onOpen", void 0);
    __decorate([
        _angular_core.Output('close-start'), 
        __metadata('design:type', Object)
    ], MdSidenav.prototype, "onCloseStart", void 0);
    __decorate([
        _angular_core.Output('close'), 
        __metadata('design:type', Object)
    ], MdSidenav.prototype, "onClose", void 0);
    __decorate([
        _angular_core.HostBinding('class.md-sidenav-closing'), 
        __metadata('design:type', Object)
    ], MdSidenav.prototype, "_isClosing", null);
    __decorate([
        _angular_core.HostBinding('class.md-sidenav-opening'), 
        __metadata('design:type', Object)
    ], MdSidenav.prototype, "_isOpening", null);
    __decorate([
        _angular_core.HostBinding('class.md-sidenav-closed'), 
        __metadata('design:type', Object)
    ], MdSidenav.prototype, "_isClosed", null);
    __decorate([
        _angular_core.HostBinding('class.md-sidenav-opened'), 
        __metadata('design:type', Object)
    ], MdSidenav.prototype, "_isOpened", null);
    __decorate([
        _angular_core.HostBinding('class.md-sidenav-end'), 
        __metadata('design:type', Object)
    ], MdSidenav.prototype, "_isEnd", null);
    __decorate([
        _angular_core.HostBinding('class.md-sidenav-side'), 
        __metadata('design:type', Object)
    ], MdSidenav.prototype, "_modeSide", null);
    __decorate([
        _angular_core.HostBinding('class.md-sidenav-over'), 
        __metadata('design:type', Object)
    ], MdSidenav.prototype, "_modeOver", null);
    __decorate([
        _angular_core.HostBinding('class.md-sidenav-push'), 
        __metadata('design:type', Object)
    ], MdSidenav.prototype, "_modePush", null);
    MdSidenav = __decorate([
        _angular_core.Component({selector: 'md-sidenav',
            template: '<ng-content></ng-content>',
            host: {
                '(transitionend)': '_onTransitionEnd($event)',
            },
            changeDetection: _angular_core.ChangeDetectionStrategy.OnPush,
            encapsulation: _angular_core.ViewEncapsulation.None,
        }), 
        __metadata('design:paramtypes', [_angular_core.ElementRef])
    ], MdSidenav);
    return MdSidenav;
}());
/**
 * <md-sidenav-layout> component.
 *
 * This is the parent component to one or two <md-sidenav>s that validates the state internally
 * and coordinate the backdrop and content styling.
 */
var MdSidenavLayout = (function () {
    function MdSidenavLayout(_dir, _element, _renderer) {
        var _this = this;
        this._dir = _dir;
        this._element = _element;
        this._renderer = _renderer;
        // If a `Dir` directive exists up the tree, listen direction changes and update the left/right
        // properties to point to the proper start/end.
        if (_dir != null) {
            _dir.dirChange.subscribe(function () { return _this._validateDrawers(); });
        }
    }
    Object.defineProperty(MdSidenavLayout.prototype, "start", {
        get: function () { return this._start; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdSidenavLayout.prototype, "end", {
        get: function () { return this._end; },
        enumerable: true,
        configurable: true
    });
    /** TODO: internal */
    MdSidenavLayout.prototype.ngAfterContentInit = function () {
        var _this = this;
        // On changes, assert on consistency.
        this._sidenavs.changes.subscribe(function () { return _this._validateDrawers(); });
        this._sidenavs.forEach(function (sidenav) { return _this._watchSidenavToggle(sidenav); });
        this._validateDrawers();
    };
    /*
    * Subscribes to sidenav events in order to set a class on the main layout element when the sidenav
    * is open and the backdrop is visible. This ensures any overflow on the layout element is properly
    * hidden.
    */
    MdSidenavLayout.prototype._watchSidenavToggle = function (sidenav) {
        var _this = this;
        if (!sidenav || sidenav.mode === 'side') {
            return;
        }
        sidenav.onOpen.subscribe(function () { return _this._setLayoutClass(sidenav, true); });
        sidenav.onClose.subscribe(function () { return _this._setLayoutClass(sidenav, false); });
    };
    /* Toggles the 'md-sidenav-opened' class on the main 'md-sidenav-layout' element. */
    MdSidenavLayout.prototype._setLayoutClass = function (sidenav, bool) {
        this._renderer.setElementClass(this._element.nativeElement, 'md-sidenav-opened', bool);
    };
    /** Validate the state of the sidenav children components. */
    MdSidenavLayout.prototype._validateDrawers = function () {
        var _this = this;
        this._start = this._end = null;
        // Ensure that we have at most one start and one end sidenav.
        this._sidenavs.forEach(function (sidenav) {
            if (sidenav.align == 'end') {
                if (_this._end != null) {
                    throw new MdDuplicatedSidenavError('end');
                }
                _this._end = sidenav;
            }
            else {
                if (_this._start != null) {
                    throw new MdDuplicatedSidenavError('start');
                }
                _this._start = sidenav;
            }
        });
        this._right = this._left = null;
        // Detect if we're LTR or RTL.
        if (this._dir == null || this._dir.value == 'ltr') {
            this._left = this._start;
            this._right = this._end;
        }
        else {
            this._left = this._end;
            this._right = this._start;
        }
    };
    MdSidenavLayout.prototype._closeModalSidenav = function () {
        if (this._start != null && this._start.mode != 'side') {
            this._start.close();
        }
        if (this._end != null && this._end.mode != 'side') {
            this._end.close();
        }
    };
    MdSidenavLayout.prototype._isShowingBackdrop = function () {
        return (this._isSidenavOpen(this._start) && this._start.mode != 'side')
            || (this._isSidenavOpen(this._end) && this._end.mode != 'side');
    };
    MdSidenavLayout.prototype._isSidenavOpen = function (side) {
        return side != null && side.opened;
    };
    /**
     * Return the width of the sidenav, if it's in the proper mode and opened.
     * This may relayout the view, so do not call this often.
     * @param sidenav
     * @param mode
     */
    MdSidenavLayout.prototype._getSidenavEffectiveWidth = function (sidenav, mode) {
        return (this._isSidenavOpen(sidenav) && sidenav.mode == mode) ? sidenav._width : 0;
    };
    MdSidenavLayout.prototype._getMarginLeft = function () {
        return this._getSidenavEffectiveWidth(this._left, 'side');
    };
    MdSidenavLayout.prototype._getMarginRight = function () {
        return this._getSidenavEffectiveWidth(this._right, 'side');
    };
    MdSidenavLayout.prototype._getPositionLeft = function () {
        return this._getSidenavEffectiveWidth(this._left, 'push');
    };
    MdSidenavLayout.prototype._getPositionRight = function () {
        return this._getSidenavEffectiveWidth(this._right, 'push');
    };
    /**
     * Returns the horizontal offset for the content area.  There should never be a value for both
     * left and right, so by subtracting the right value from the left value, we should always get
     * the appropriate offset.
     */
    MdSidenavLayout.prototype._getPositionOffset = function () {
        return this._getPositionLeft() - this._getPositionRight();
    };
    /**
     * This is using [ngStyle] rather than separate [style...] properties because [style.transform]
     * doesn't seem to work right now.
     */
    MdSidenavLayout.prototype._getStyles = function () {
        return {
            marginLeft: this._getMarginLeft() + "px",
            marginRight: this._getMarginRight() + "px",
            transform: "translate3d(" + this._getPositionOffset() + "px, 0, 0)"
        };
    };
    __decorate([
        _angular_core.ContentChildren(MdSidenav), 
        __metadata('design:type', _angular_core.QueryList)
    ], MdSidenavLayout.prototype, "_sidenavs", void 0);
    MdSidenavLayout = __decorate([
        _angular_core.Component({selector: 'md-sidenav-layout',
            // Do not use ChangeDetectionStrategy.OnPush. It does not work for this component because
            // technically it is a sibling of MdSidenav (on the content tree) and isn't updated when MdSidenav
            // changes its state.
            template: "<div class=\"md-sidenav-backdrop\" (click)=\"_closeModalSidenav()\" [class.md-sidenav-shown]=\"_isShowingBackdrop()\"></div> <ng-content select=\"md-sidenav\"></ng-content> <div class=\"md-sidenav-content\" [ngStyle]=\"_getStyles()\"> <ng-content></ng-content> </div> ",
            styles: ["/** * Mixin that creates a new stacking context. * see https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Positioning/Understanding_z_index/The_stacking_context */ /** * This mixin hides an element visually. * That means it's still accessible for screen-readers but not visible in view. */ /** * Forces an element to grow to fit floated contents; used as as an alternative to * `overflow: hidden;` because it doesn't cut off contents. */ /** * A mixin, which generates temporary ink ripple on a given component. * When $bindToParent is set to true, it will check for the focused class on the same selector as you included * that mixin. * It is also possible to specify the color palette of the temporary ripple. By default it uses the * accent palette for its background. */ /** * A collection of mixins and CSS classes that can be used to apply elevation to a material * element. * See: https://www.google.com/design/spec/what-is-material/elevation-shadows.html * Examples: * * * .md-foo { *   @include $md-elevation(2); * *   &:active { *     @include $md-elevation(8); *   } * } * * <div id=\"external-card\" class=\"md-elevation-z2\"><p>Some content</p></div> * * For an explanation of the design behind how elevation is implemented, see the design doc at * https://goo.gl/Kq0k9Z. */ /** * The css property used for elevation. In most cases this should not be changed. It is exposed * as a variable for abstraction / easy use when needing to reference the property directly, for * example in a will-change rule. */ /** The default duration value for elevation transitions. */ /** The default easing value for elevation transitions. */ /** * Applies the correct css rules to an element to give it the elevation specified by $zValue. * The $zValue must be between 0 and 24. */ /** * Returns a string that can be used as the value for a transition property for elevation. * Calling this function directly is useful in situations where a component needs to transition * more than one property. * * .foo { *   transition: md-elevation-transition-property-value(), opacity 100ms ease; *   will-change: $md-elevation-property, opacity; * } */ /** * Applies the correct css rules needed to have an element transition between elevations. * This mixin should be applied to elements whose elevation values will change depending on their * context (e.g. when active or disabled). */ /* This mixin ensures an element spans the whole viewport.*/ /** * Mixin to help with defining LTR/RTL 'transform: translate3d()' values. * @param $open The translation value when the sidenav is opened. * @param $close The translation value when the sidenav is closed. */ md-sidenav-layout { position: relative; transform: translate3d(0, 0, 0); box-sizing: border-box; -webkit-overflow-scrolling: touch; display: block; overflow: hidden; } md-sidenav-layout[fullscreen] { position: fixed; top: 0; left: 0; right: 0; bottom: 0; } md-sidenav-layout[fullscreen].md-sidenav-opened { overflow: hidden; } .md-sidenav-backdrop { position: fixed; top: 0; left: 0; right: 0; bottom: 0; display: block; z-index: 2; visibility: hidden; } .md-sidenav-backdrop.md-sidenav-shown { visibility: visible; background-color: rgba(0, 0, 0, 0.6); } .md-sidenav-content { position: relative; transform: translate3d(0, 0, 0); display: block; height: 100%; overflow: auto; } md-sidenav { position: relative; transform: translate3d(0, 0, 0); display: block; position: absolute; top: 0; bottom: 0; z-index: 3; min-width: 5%; overflow-y: auto; background-color: white; transform: translate3d(-100%, 0, 0); } md-sidenav.md-sidenav-closed { visibility: hidden; } md-sidenav.md-sidenav-closing { transform: translate3d(-100%, 0, 0); will-change: transform; } md-sidenav.md-sidenav-opening { box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12); visibility: visible; transform: translate3d(0, 0, 0); will-change: transform; } md-sidenav.md-sidenav-opened { box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12); transform: translate3d(0, 0, 0); } md-sidenav.md-sidenav-push { background-color: white; } md-sidenav.md-sidenav-side { z-index: 1; } md-sidenav.md-sidenav-end { right: 0; transform: translate3d(100%, 0, 0); } md-sidenav.md-sidenav-end.md-sidenav-closed { visibility: hidden; } md-sidenav.md-sidenav-end.md-sidenav-closing { transform: translate3d(100%, 0, 0); will-change: transform; } md-sidenav.md-sidenav-end.md-sidenav-opening { box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12); visibility: visible; transform: translate3d(0, 0, 0); will-change: transform; } md-sidenav.md-sidenav-end.md-sidenav-opened { box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12); transform: translate3d(0, 0, 0); } [dir='rtl'] md-sidenav { transform: translate3d(100%, 0, 0); } [dir='rtl'] md-sidenav.md-sidenav-closed { visibility: hidden; } [dir='rtl'] md-sidenav.md-sidenav-closing { transform: translate3d(100%, 0, 0); will-change: transform; } [dir='rtl'] md-sidenav.md-sidenav-opening { box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12); visibility: visible; transform: translate3d(0, 0, 0); will-change: transform; } [dir='rtl'] md-sidenav.md-sidenav-opened { box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12); transform: translate3d(0, 0, 0); } [dir='rtl'] md-sidenav.md-sidenav-end { left: 0; right: auto; transform: translate3d(-100%, 0, 0); } [dir='rtl'] md-sidenav.md-sidenav-end.md-sidenav-closed { visibility: hidden; } [dir='rtl'] md-sidenav.md-sidenav-end.md-sidenav-closing { transform: translate3d(-100%, 0, 0); will-change: transform; } [dir='rtl'] md-sidenav.md-sidenav-end.md-sidenav-opening { box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12); visibility: visible; transform: translate3d(0, 0, 0); will-change: transform; } [dir='rtl'] md-sidenav.md-sidenav-end.md-sidenav-opened { box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12); transform: translate3d(0, 0, 0); } /*# sourceMappingURL=sidenav.css.map */ ",
"/** * We separate transitions to be able to disable them in unit tests, by simply not loading this file. */ md-sidenav { transition: transform 400ms cubic-bezier(0.25, 0.8, 0.25, 1); } .md-sidenav-content { transition: transform 400ms cubic-bezier(0.25, 0.8, 0.25, 1); } .md-sidenav-backdrop.md-sidenav-shown { transition: background-color 400ms cubic-bezier(0.25, 0.8, 0.25, 1); } /*# sourceMappingURL=sidenav-transitions.css.map */ "],
            encapsulation: _angular_core.ViewEncapsulation.None,
        }),
        __param(0, _angular_core.Optional()), 
        __metadata('design:paramtypes', [_angular2Material_core.Dir, _angular_core.ElementRef, _angular_core.Renderer])
    ], MdSidenavLayout);
    return MdSidenavLayout;
}());
var MdSidenavModule = (function () {
    function MdSidenavModule() {
    }
    MdSidenavModule.forRoot = function () {
        return {
            ngModule: MdSidenavModule,
            providers: []
        };
    };
    MdSidenavModule = __decorate([
        _angular_core.NgModule({
            imports: [_angular_common.CommonModule],
            exports: [MdSidenavLayout, MdSidenav],
            declarations: [MdSidenavLayout, MdSidenav],
        }), 
        __metadata('design:paramtypes', [])
    ], MdSidenavModule);
    return MdSidenavModule;
}());

exports.MdDuplicatedSidenavError = MdDuplicatedSidenavError;
exports.MdSidenav = MdSidenav;
exports.MdSidenavLayout = MdSidenavLayout;
exports.MdSidenavModule = MdSidenavModule;

Object.defineProperty(exports, '__esModule', { value: true });

})));