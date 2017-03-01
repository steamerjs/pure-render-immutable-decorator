import React from 'react';
import { shallow } from 'enzyme';
import Wrapper, { List, Scroll, ele } from '../example/src/index3';
import { deepCompare } from "../src";
import Immutable from 'immutable';


function makeInstance(state, props) {
	return {
		props,
		state
	};
}

const list = shallow(
    <List />
);

const scroll = shallow(
  	<Scroll />
);


const wrapper = shallow(
  	<Wrapper />
);

var listEle = list.instance()._reactInternalInstance._currentElement,
	scrollEle = scroll.instance()._reactInternalInstance._currentElement,
	newEle = <p></p>;

var instance = makeInstance(scroll.state(), {children: Immutable.fromJS(listEle)});

test('all data is the same', () => {

	let result = deepCompare(instance, {
		children: Immutable.fromJS(listEle)
	}, {
		ele: Immutable.fromJS(ele)
	});

	expect(result).toBe(false);

});

test('props.children is different', () => {

	let result = deepCompare(instance, {
		children: Immutable.fromJS(scrollEle)
	}, {
		ele: Immutable.fromJS(ele)
	});

	expect(result).toBe(true);

});

test('state.ele is different', () => {

	let result = deepCompare(instance, {
		children: Immutable.fromJS(listEle)
	}, {
		ele: Immutable.fromJS(newEle)
	});

	expect(result).toBe(true);

});