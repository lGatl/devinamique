import React, { Component }	from 'react';
import { bindActionCreators }	from 'redux';
import { connect } from 'react-redux';

import { user } from '../../6_actions/';

import { Input, TextArea, Button, Checkbox, } from '../../_common/4_dumbComponent/';

import { debounce } from '../../8_libs/debounce';

//There is an exemple of Inscription Form
class FormulaireDInscription extends Component {
//Initialisation
	constructor(){
		super();
	}
	init(){
		return {
			email: '',
			password: '',
			surname: '',
			firstname: '',
			agreement:true,
		};
	}
	
	componentDidMount(){
		this.props.userControle(this.init());

	}
	//Controle
	change({ value, name, checked }){
		checked?this.props.userControle({ [name]:checked }):this.props.userControle({ [name]:value });
	}
	//Action
	_creeCompte(e){
		
		let {email,password,surname,firstname,agreement} = this.props.user_controle;

		email = typeof email=='string'&&email.length>0?email:false;
		password = typeof password=='string'&&password.length>0?password:false;

		if(email&&password&&agreement){
			this.props.creeCompte({
				email,
				username:email,
				password,
				roles:[],
				profile:{
					surname,
					firstname,
					agreement
				}
			}, ()=>{
				this.props.userLogIn( email, password, ()=>{
					this.props.getActiveUser();
					this.props.userControle(this.init());
				})
			});
		}else{
			//Trigger alert thanks to Bert meteor package
			console.log({
				title:'Error data for login',
				message:'give at least email, password & check agreement' ,
				type:'info',
				icon:'fa-info'
			});
		}
	}
	
	//Preparation du rendu
	render() {
		let {email,password,surname,firstname, agreement} = this.props.user_controle;

		return (

				<div style={{flex:2}}>
				{/*We need to declare defalut here because email has just been created*/}
					<Input
						label = 'E mail'
						name = 'email'
						value = { email || '' }
						onChange = { this.change.bind( this ) } 
						active
					/>
					<Input
						label = 'Password'
						name = 'password'
						type = 'password'
						autoComplete=''
						value = { password || '' }
						onChange = { this.change.bind( this ) }
						active
					/>
					<Input
						label = 'Surname'
						name = 'surname'
						value = { surname || '' }
						onChange = { this.change.bind( this ) } 
						active
					/>
					<Input
						label = 'Firstname'
						name = 'firstname'
						value = { firstname || '' }
						onChange = { this.change.bind( this ) }
						active
					/>
					<Checkbox
						label = 'Agreement'
						name = 'agreement'
						checked = {agreement||false}
						onChange = { this.change.bind( this ) }
						active
					/>

					<Button
						onClick = { this._creeCompte.bind( this ) }

					>
					Create
					</Button>
				</div>
		);
	}
}

function mapStateToProps( state ){
	return (
		{
			user_controle: state.user.controle
		}
	);
}

function mapDispatchToProps( dispatch ){
	return bindActionCreators({
		//We use control of user collection
		userControle: user.controle,
		creeCompte: user.creeCompte,
		getActiveUser: user.getActiveUser,
		userLogIn: user.logIn
	}, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( FormulaireDInscription );


