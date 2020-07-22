import React, { Component } from 'react';

import './dropable.css'

export default class Dropable extends Component {
   constructor(){
   	super()
   	this.state = {
   		hover:false
   	}
   	this._onMouseUp = this._onMouseUp.bind(this)
   }
	_onMouseUp(e) {
		let { onMouseUp }=this.props;
		let { hover }=this.state;
		
		if(hover){
			this.props.onMouseUp({
							...this.props,
							element_id:hover
						});
			this.setState({hover:false})
		}
	}
	render() {
			let {active}=this.props;
			let {hover}=this.state;

		return (
			<div  
			onMouseEnter={()=>this.setState({hover:true&&active})} 
			onMouseLeave={()=>this.setState({hover:false&&active})}
			onMouseUp = {this._onMouseUp}
			style={{height:hover?25:10, backgroundColor:hover?"rgba(150,150,250,1)":"white"}}>
				
			</div>
		);
	}
}
	
