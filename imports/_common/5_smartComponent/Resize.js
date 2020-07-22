import React, { Component }	from 'react';
import { bindActionCreators }	from 'redux';
import { connect } from 'react-redux';

import { controle } from '../../6_actions/';

import { throttle } from '../../8_libs/throttle';
//This Component is called in the layout to put window width everywhere in the app 
class Resize extends Component {
	constructor(){
		super();
		this.resize = throttle(this.resize.bind(this),40);
	}
	componentDidMount() {
		this.props.controleResize({windowheight:window.innerHeight,windowwidth:window.innerWidth});
		window.addEventListener('resize', this.resize);
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.resize);
	}
	//==============CONTROLE====================
	resize(){
		this.props.controleResize({windowheight:window.innerHeight,windowwidth:window.innerWidth});
	}
	
	//Additional function to modify strings according to window width
	static ellipsis = (texte,ww,lengt,force,toend)=>{

		let text = texte?toend?texte.substr(0, texte.length-lengt):texte.substr(0, lengt):''
		
		return window.innerWidth<ww&&texte&&texte.length>lengt?force?(text+force):(text):texte;
	}
	//Additional function to return a variable according to a comparison between vqriable comp and window width
	static comp = (comp,True,False)=>{
		return window.innerWidth<comp?True:False
	};
	//========================Preparation du rendu========================
	render(){
		return (
			<div style={{}}>	
			</div>
		);
	}
}

function mapDispatchToProps( dispatch ){
	return bindActionCreators({
		controleResize: controle.resize,
	}, dispatch );
}

export default connect( null, mapDispatchToProps )( Resize );
