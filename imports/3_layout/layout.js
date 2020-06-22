import React, {Component} from 'react';


export default class Layout extends Component {

	render(){

		return(
			<div style={{width:"100%",height:"100%",display:"flex", flexDirection:"column"}}>
								{this.props.children[0]}
							<div style={{display:"flex",flex:1}}>	
								{this.props.children[1]}
							</div>
						</div>

				
		);
	}
};
