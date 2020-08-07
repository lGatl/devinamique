import React, {Component} from 'react';

import { bindActionCreators }	from 'redux';
import { connect } from 'react-redux';

import { user } from '../../6_actions';

import history from "../../../history";

class RemoveFromAdmin extends Component {

	componentDidUpdate(prevProps, prevState){

		let {active_user, userUp} = this.props;
		active_user = active_user !== undefined && typeof active_user === "object" && Object.keys(active_user).length>0?active_user:false

		if(active_user){
			let roles = active_user.roles !== undefined && typeof active_user.roles === "object" && active_user.roles instanceof Array?
			[...active_user.roles]:[]
			let ind = roles.indexOf("admin")
			if(ind > -1){
				roles.splice(ind,1)
				userUp({data:{...active_user,roles},cbk:()=>{
					history.push("/")
				}}) 
			}else{
				history.push("/")
			}
		}
	}

	render(){
		return (
			<div>RemoveFromAdmin</div>
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

export default connect( mapStateToProps, mapDispatchToProps )( RemoveFromAdmin );
