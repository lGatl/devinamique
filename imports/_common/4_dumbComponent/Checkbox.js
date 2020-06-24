import React, {Component} from "react";

export default class Checkbox extends Component {
	style(){
		return{

			s_container:{
				display:"flex",
				alignItems:"center",
				fontSize:20,
			},
			s_label:{
				marginLeft:5,
				display:"flex",
			},
		};
	}
	change(e){
		let {label, name, onChange} = this.props;

console.log("e,{label, name, checked:e.target.checked}", e,{label, name, checked:e.target.checked});
		onChange({label, name, checked:!e.target.checked});
	}
	render(){
		
		let {s_container, s_label} = this.style();
		let {style} = this.props;
		return (
			<div style={{...s_container, ...style}}>
				<input type="checkbox" disabled={!this.props.active} name={this.props.name} checked={this.props.checked} onChange={this.change.bind(this)} style={!this.props.active?{pointerEvents:"none"}:{cursor:"pointer"}}/>
				<label style={{...s_label}}>{this.props.label}</label>
			</div>
		);
	}
}

