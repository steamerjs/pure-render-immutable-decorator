/**
 * [immutable version]
 * https://github.com/SteamerTeam/pure-render-immutable-decorator
 */

/**
 * pure render decorator immutable版
 */
'use strict';

import { is } from 'immutable';

// let hasOwnProperty = Object.prototype.hasOwnProperty;

/**
 * Performs equality by iterating through keys on an object and returning false
 * when any key has values which are not strictly equal between the arguments.
 * Returns true when the values of all keys are strictly equal.
 */
function deepEqual(objA, objB) {

    if (objA === objB || is(objA, objB)) {
        return true;
    }

    if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) {
        return false;
    }

    let keysA = Object.keys(objA || {});
    let keysB = Object.keys(objB || {});

    if (keysA.length !== keysB.length) {
        return false;
    }

    // Test for A's keys different from B.
    let bHasOwnProperty = Object.prototype.hasOwnProperty.bind(objB);
    for (let i = 0; i < keysA.length; i++) {
        if (!bHasOwnProperty(keysA[i]) || !is(objA[keysA[i]], objB[keysA[i]])) {
            return false;
        }
    }

    return true;
}

/**
 * Does a deep comparison for props and state.
 * See ReactComponentWithPureRenderMixin
 */
export function deepCompare(instance, nextProps, nextState) {
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


export default pureRenderDecorator;
