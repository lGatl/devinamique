import React, { Component } from 'react';

//import './elementcard.css';

export default class ElementCard extends Component {
	
	render() {
			let {libelle, prix, numerique, id} = this.props;
				
		return (
			<div style={{
				position:"fixed",
				pointerEvent:"none", 
				flex:1, 
				width:300,
				height:100,
				zIndex:500,
				flexDirection:"column", 
				backgroundColor:"rgba(100,249,100,0.9)",
				margin:5,
				borderRadius:10,
				...this.props.style


			}}
			>
				<div style={{flex:1, display:"flex", flexDirection:"row"}} >
					<div style={{flex:7, display:"flex", flexDirection:"row"}}>
							<div  style={{flex:1, display:"flex", alignItems:"center",justifyContent:"center"}}>
							<div>{id}</div>
						</div>
						<div  style={{flex:4, display:"flex", alignItems:"center",padding:"0px 5px"}}>
								<label htmlFor="">{libelle}</label>
						</div>

						<div  style={{flex:1, display:"flex", alignItems:"center",padding:"0px 5px"}}>
								<label htmlFor="">{prix}</label>
						</div>
					</div>
				</div>
		</div>
			
		);
	}
}
	
