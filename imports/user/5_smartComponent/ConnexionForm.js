import React, { Component }	from 'react';
import { bindActionCreators }	from 'redux';
import { connect } from 'react-redux';

import { user } from '../../6_actions/';

import { Input, Button } from '../../_common/4_dumbComponent/';

//Exemple of Connexion form

class ConnexionForm extends Component {
	//Initialisation

	init(){
		return { 
			email: '',
			password: ''
		};
	}
	componentDidMount(){
		this.props.userControle(this.init());
	}
	//Controle inputs
	change({ value, name }){

		this.props.userControle({ [name]:value });
	}
	//Action of log in
	_userLogIn(e){
		e?e.preventDefault():'';
		let {email, password} = this.props.user_controle;
		if(email&&password){
			console.log("email&&password", email,password);
			this.props.userLogIn( email, password, ()=>{
				console.log("email, password", email, password);
				this.props.getActiveUser();
				this.props.userControle(this.init());
			} );
		}else{
			//Trigger alert thanks to Bert meteor package
			Bert.alert({
				title:'Error data for login',
				message:'give at least email & password ' ,
				type:'info',
				icon:'fa-info'
			});
		}
		
	}
	//Preparation du rendu
	
	render() {
		let {email, password} = this.props.user_controle;

		return (
			
			<form onSubmit = { this._userLogIn.bind( this ) }>
				{/*We need to declare defalut here because email has just been created*/}
				<Input
					label = 'E mail'
					name = 'email'
					autoComplete = "username"
					value = { email||'' }
					onChange = { this.change.bind( this ) } 
					active
				/>
				<Input
					label = 'Mot de passe'
					name = 'password'
					type = 'password'
					autoComplete = "current-password"
					value = { password||'' }
					onChange = { this.change.bind( this ) }
					active
				/>
				<Button type = "submit">
				Se Connecter
				</Button>
			</form>
		);
	}
}

function mapStateToProps( state ){
	return (
		{
			user_controle:state.user.controle
		}
	);
}

function mapDispatchToProps( dispatch ){
	return bindActionCreators({
		//We use control of user collection
		userControle: user.controle,
		//Additional actions
		userLogIn: user.logIn,
		getActiveUser:	user.getActiveUser,
	}, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( ConnexionForm );
