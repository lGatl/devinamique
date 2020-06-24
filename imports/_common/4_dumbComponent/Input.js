import React, { Component } from 'react';


export default class Input extends Component {
   
	onChange(e) {
		this.props.onChange({
			...this.props,
			value: e.target.value
		});
	}
	render() {
		let {active, value, label} = this.props;
		return (
			<div style={{ 
				display: 'flex', flexDirection:"column",flex:1
				
			}}>
				{label?<label >{label}</label>:""}
				{active?
				<input
					style={{flex:1,padding:0,...this.props.style}}
					type={this.props.type}
					min={this.props.min}
					placeholder={this.props.placeholder}
					onChange={this.onChange.bind(this)}
					value={value||""}
				/>: <label style={{lineHeight:"21px",cursor:"inherit"}} htmlFor="">{value}</label>||""}
			</div>
		);
	}
}
