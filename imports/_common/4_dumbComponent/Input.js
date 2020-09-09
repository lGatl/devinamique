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
				justifyContent:"center",alignItems:"center"
				,...this.props.style
				
			}}>
				{label?<label >{label}</label>:""}
				{active?
				<input
					style={{width:"100%",padding:0}}
					type={this.props.type}
					min={this.props.min}
					placeholder={this.props.placeholder}
					onChange={this.onChange.bind(this)}
					value={value||""}
				/>: <div style={{width:"100%",overflow:"hidden" }} htmlFor=""> <label style={{width:"100%",lineHeight:"21px",cursor:"inherit",textAlign:"center",wordWrap:"break-word",wordBreak:"break-word", }}> {value===""?"-":value}</label></div>||""}
			</div>
		);
	}
}
