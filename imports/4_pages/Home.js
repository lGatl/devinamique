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
			<div style={{marginTop:0, width:"100%",display:"flex", alignItems:"center",flexDirection:"column", flex:1}}>
				
				{active_user?<div style={{marginTop:0, width:"100%",display:"flex", alignItems:"center",flexDirection:"column", flex:1}}>
					<div onClick={()=>{this.props.logOut()}} style={{ cursor:"pointer"}}>Deconnexion</div>

					Salut {active_user !== undefined && active_user.profile !== undefined &&
						typeof active_user.profile === "object" && active_user.profile.firstname !== undefined &&
					 typeof active_user.profile.firstname === "string" &&  active_user.profile.firstname.length >0 ? active_user.profile.firstname : active_user.username }
				</div> : 
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
				<div style={{flex:1}}></div>
				<div>Cette application est encore en phase de test, nous ne garentissons pas encore le maintient des données, toute remarque sera la bienvenue <a href="https://lgatl.fr/contact">lgatl.fr/contact</a></div>
				<div>This application is still in the testing phase, we do not yet guarantee the maintenance of data, any comments will be welcome <a href="https://lgatl.fr/contact">lgatl.fr/contact</a></div>
				<div style = {{height: "30%", width:"50%", background:"url('/image/icon-textsup200.png')no-repeat center", backgroundSize: "contain"}}>developed by</div>
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
