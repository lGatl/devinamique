import React, {Component} from 'react';

import { bindActionCreators }	from 'redux';
import { connect } from 'react-redux';

import { user } from '../6_actions';

import { ConnexionForm, InscriptionForm } from '../user/5_smartComponent/';

class Home extends Component {
	
	constructor(){
		super()
		this.state = {menu:1}
	}
	componentDidMount() {
	
	}
	render(){
		let { active_user } = this.props;
		return (
			<div style={{marginTop:0, width:"100%",display:"flex", alignItems:"center",flexDirection:"column"}}>
				
				{active_user?<div onClick={()=>{this.props.logOut()}} style={{flex:1, cursor:"pointer"}}>Deconnexion</div> : 
					<div style={{ width:"100%", display:"flex"}}>
						<div onClick={()=>{this.setState({menu:0})}} style={{flex:1, cursor:"pointer"}}>Inscription</div>
						<div onClick={()=>{this.setState({menu:1})}} style={{flex:1, cursor:"pointer"}}>Connexion</div>
					</div>
					}
					
				{ active_user?"":
					<div style={{width:400}}>
						{this.state.menu?<ConnexionForm/>:<InscriptionForm/>}
					</div>
				}
				

			</div>
		);
	}
}

function mapStateToProps( state ){
	return (
		{
			active_user: state.user.active_user
		}
	);

}

function mapDispatchToProps(dispatch){
	return bindActionCreators({
		logOut: user.logOut,
	}, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( Home );
