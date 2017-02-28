/**
 * [immutable version]
 * https://github.com/SteamerTeam/pure-render-immutable-decorator
 */

/**
 * pure render decorator immutable版
 */
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.deepCompare = deepCompare;

var _immutable = require('immutable');

// let hasOwnProperty = Object.prototype.hasOwnProperty;

/**
 * Performs equality by iterating through keys on an object and returning false
 * when any key has values which are not strictly equal between the arguments.
 * Returns true when the values of all keys are strictly equal.
 */
function deepEqual(objA, objB) {
    if (objA === objB || (0, _immutable.is)(objA, objB)) {
        return true;
    }

    if ((typeof objA === 'undefined' ? 'undefined' : _typeof(objA)) !== 'object' || objA === null || (typeof objB === 'undefined' ? 'undefined' : _typeof(objB)) !== 'object' || objB === null) {
        return false;
    }

    var keysA = Object.keys(objA || {});
    var keysB = Object.keys(objB || {});

    if (keysA.length !== keysB.length) {
        return false;
    }

    // Test for A's keys different from B.
    var bHasOwnProperty = Object.prototype.hasOwnProperty.bind(objB);
    for (var i = 0; i < keysA.length; i++) {
        if (!bHasOwnProperty(keysA[i]) || !(0, _immutable.is)(objA[keysA[i]], objB[keysA[i]])) {
            return false;
        }
    }

    return true;
}

/**
 * Does a deep comparison for props and state.
 * See ReactComponentWithPureRenderMixin
 */
function deepCompare(instance, nextProps, nextState) {
    return !deepEqual(instance.props, nextProps) || !deepEqual(instance.state, nextState);
}

/**
 * Tells if a component should update given it's next props
 * and state.
 *
 * @param object nextProps Next props.
 * @param object nextState Next state.
 */
function shouldComponentUpdate(nextProps, nextState) {
    return deepCompare(this, nextProps, nextState);
}

/**
 * Makes the given component "pure".
 *
 * @param object component Component.
 */
function pureRenderDecorator(component) {
    component.prototype.shouldComponentUpdate = shouldComponentUpdate;
}

exports.default = pureRenderDecorator;