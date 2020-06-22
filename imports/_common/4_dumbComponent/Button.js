import React, { Component } from 'react';

import './button.css'

export default class Button extends Component {
   
	onClick(e) {
		this.props.onClick(
		//{...this.props,}
			);
	}
	render() {
		let {active, value, label} = this.props;
		return (
			<button style={this.props.style} onClick = {this.onClick.bind(this)}>
				{this.props.children}
			</button>
		);
	}
}
	
