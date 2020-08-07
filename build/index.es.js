import React, { createRef } from 'react';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var classnames = createCommonjsModule(function (module) {
/*!
  Copyright (c) 2017 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
/* global define */

(function () {

	var hasOwn = {}.hasOwnProperty;

	function classNames () {
		var classes = [];

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (!arg) continue;

			var argType = typeof arg;

			if (argType === 'string' || argType === 'number') {
				classes.push(arg);
			} else if (Array.isArray(arg) && arg.length) {
				var inner = classNames.apply(null, arg);
				if (inner) {
					classes.push(inner);
				}
			} else if (argType === 'object') {
				for (var key in arg) {
					if (hasOwn.call(arg, key) && arg[key]) {
						classes.push(key);
					}
				}
			}
		}

		return classes.join(' ');
	}

	if ( module.exports) {
		classNames.default = classNames;
		module.exports = classNames;
	} else {
		window.classNames = classNames;
	}
}());
});

var WheelPicker = /** @class */ (function (_super) {
    __extends(WheelPicker, _super);
    function WheelPicker(props) {
        var _this = _super.call(this, props) || this;
        _this.criticalPoints = { min: 0, max: 0 };
        _this.startTouchY = 0;
        _this.currentTanslateY = 0;
        _this.isTouchStart = false;
        _this.isMoving = false;
        _this.containerRef = createRef();
        _this.itemRefs = _this.props.items.map(function () { return createRef(); });
        _this.onStart = function (event) {
            if (!_this.isTouchStart) {
                _this.isTouchStart = true;
            }
            _this.startTouchY = event.pageY || event.targetTouches[0].pageY;
        };
        _this.onMove = function (event) {
            if (!_this.isTouchStart) {
                return;
            }
            if (!_this.isMoving) {
                _this.isMoving = true;
            }
            var touchY = event.pageY || event.targetTouches[0].pageY;
            var nextScrollerTranslate = (_this.currentTanslateY + touchY) - _this.startTouchY;
            if (nextScrollerTranslate < _this.criticalPoints.min) {
                nextScrollerTranslate = _this.criticalPoints.min - (Math.pow((_this.criticalPoints.min - nextScrollerTranslate), 0.8));
            }
            else if (nextScrollerTranslate > _this.criticalPoints.max) {
                nextScrollerTranslate = _this.criticalPoints.max + (Math.pow((nextScrollerTranslate - _this.criticalPoints.max), 0.8));
            }
            _this.setState(__assign(__assign({}, _this.state), { translateY: nextScrollerTranslate }));
        };
        _this.onEnd = function () {
            if (_this.isTouchStart) {
                _this.isTouchStart = false;
            }
            if (_this.isMoving) {
                _this.isMoving = false;
            }
            _this.startTouchY = 0;
            var activeIndex;
            if (_this.state.translateY > _this.criticalPoints.max) {
                activeIndex = 0;
            }
            else if (_this.state.translateY < _this.criticalPoints.min) {
                activeIndex = (_this.props.items.length - 1);
            }
            else {
                activeIndex = Math.round(Math.abs((_this.state.translateY - _this.criticalPoints.max) / _this.itemRefs[0].current.offsetHeight));
            }
            _this.onSelectedValue(activeIndex);
        };
        _this.state = {
            activeIndex: 0,
            translateY: 0
        };
        return _this;
    }
    WheelPicker.prototype.componentDidMount = function () {
        this.onSelectedValue(this.props.selectedIndex);
    };
    WheelPicker.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: "picker-container" },
            React.createElement("div", { className: "picker-wrapper", ref: this.containerRef },
                React.createElement("div", { className: "picker-scroller", onTouchStart: this.onStart, onTouchMove: this.onMove, onTouchEnd: this.onEnd, onMouseDown: this.onStart, onMouseMove: this.onMove, onMouseLeave: this.onEnd, onMouseUp: this.onEnd, style: {
                        transform: "translate3d(0, " + this.state.translateY + "px, 0)",
                        transitionDuration: this.isMoving ? '0ms' : ''
                    } }, this.props.items.map(function (item, index) {
                    return (React.createElement("div", { key: index, ref: _this.itemRefs[index], className: classnames('picker-item', { 'selected': !_this.isMoving && _this.state.activeIndex === index }), "data-index": index, onClick: function () { return _this.onClickItem(index); } }, React.createElement('div', { dangerouslySetInnerHTML: { __html: item.display } })));
                })))));
    };
    WheelPicker.prototype.onSelectedValue = function (index) {
        var containerHeight = this.containerRef.current.offsetHeight;
        var itemHeight = this.itemRefs.length > 0 ? this.itemRefs[0].current.offsetHeight : 0;
        this.criticalPoints = {
            min: (containerHeight / 2) - (itemHeight * (this.props.items.length - 1)) + (itemHeight / 2),
            max: (containerHeight / 2) - (itemHeight / 2)
        };
        this.currentTanslateY = (containerHeight / 2) - (itemHeight / 2) - (index * itemHeight);
        this.setState(__assign(__assign({}, this.state), { activeIndex: index, translateY: (containerHeight / 2) - (itemHeight / 2) - (index * itemHeight) }));
    };
    WheelPicker.prototype.onClickItem = function (index) {
        this.onSelectedValue(index);
    };
    WheelPicker.defaultProps = {
        selectedIndex: 0
    };
    return WheelPicker;
}(React.Component));

export default WheelPicker;
//# sourceMappingURL=index.es.js.map
