import React, { Component } from 'react';
import { render } from 'react-dom';
import pureRender from '../../src/';
import Immutable from 'immutable';

export const ele = <div></div>;


@pureRender
export class Scroll extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			ele: Immutable.fromJS(ele)
		}
	}

	render() {

		return (
			<div>
				{this.props.children}
			</div>
		)
	}
}

export class List extends Component {
	constructor(props, context) {
		super(props, context);

		this.state = {

		};

	}

	componentDidMount() {
		
	}

	render() {

		return (
			<div></div>
		);
	}
}


export default class Wrapper extends Component {

	constructor(props, context) {
		super(props, context);
		this.state = {

		};
	}

	componentDidMount() {
		
	}

	render() {

		return (
	        <div>
	        	<Scroll>
		        	<List />
		        </Scroll>
	        </div>
		);
	}
}