import React, { Component } from 'react';

import './shortButton.css'

export default class Button extends Component {
   
	onClick(e) {
		this.props.onClick(
		//{...this.props,}
			);
	}
	render() {
		let {active, value, label} = this.props;
		return (
			<button className="shortButton" style={this.props.style} onClick = {this.onClick.bind(this)}>
				{this.props.children}
			</button>
		);
	}
}
	
