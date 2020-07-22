import React, {Component} from "react";

import './textarea.css'

export default class TextArea extends Component {
	
	onChange(e) {
        this.props.onChange({
            ...this.props,
            value: e.target.value
        });
    }
	render(){
		let {label, name, value, placeholder, active} = this.props;
		return (
				<div style={{ 
						display: 'flex', flexDirection:"column",flex:1, alignItems:"center", justifyContent:"center"
        }}>
        	{label?<label>{label}</label>:""}
					{
						active?<textarea 
						placeholder={placeholder}
						name={name}
						value={value||""}
						onChange={this.onChange.bind(this)}
						className="textarea"
					/>: <span>{value}</span>
					}
				</div>
				
		);
	}
}

