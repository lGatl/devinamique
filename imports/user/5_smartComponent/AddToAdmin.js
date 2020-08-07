import React, {Component} from 'react';

import { bindActionCreators }	from 'redux';
import { connect } from 'react-redux';

import { user } from '../../6_actions';

import history from "../../../history";

class AddToAdmin extends Component {

	componentDidUpdate(prevProps, prevState){

		let {active_user, userUp} = this.props;
		active_user = active_user !== undefined && typeof active_user === "object" && Object.keys(active_user).length>0?active_user:false

		if(active_user){
			let roles = active_user.roles !== undefined && typeof active_user.roles === "object" && active_user.roles instanceof Array?
			[...active_user.roles]:[]
			
			if(roles.indexOf("admin")<0){
				userUp({data:{...active_user,roles:[...roles,'admin']},cbk:()=>{
					history.push("/admin")
				}}) 
			}else{
				history.push("/admin")
			}
		}
	}

	render(){
		return (
			<div>AddToAdmin</div>
			)
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
		userUp: user.up,
	}, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( AddToAdmin );
