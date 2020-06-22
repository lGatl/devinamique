import React, { Component }	from 'react';
import { bindActionCreators }	from 'redux';
import { connect } 				from 'react-redux';

import { user } from '../../6_actions';

import { Link } from 'react-router-dom';

// preparation of Menu at the top
class User extends Component {

	componentDidMount() {

		if(Meteor.userId()||this.props.active_user){
			this.props.getActiveUser()
		}
	}

	render() {
		

		return (
		<div></div>
		);
	}
}

function mapStateToProps(state){
	return (
		{
			active_user: state.user.active_user
		}
	);
}

function mapDispatchToProps( dispatch ){
	return bindActionCreators({

		getActiveUser:	user.getActiveUser,

	}, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( User );
