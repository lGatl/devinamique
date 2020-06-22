import { USER } from '../../6_actions/';


import { extendReducer } from '../../7_reducers/common_reducer';

const DEFAULT = {
	got: {},
	controle:{
		email:"",
		password:"",
		surname:"",
		firstname:"", 
		agreement:""
	}
};
export default ( state = DEFAULT , action ) =>{

	switch ( action.type ) {

	case USER.GET_ACTIVE_USER:
		
		return { ...state, active_user: action.payload.data  };
	case USER.LOG_IN:
		return { ...state};
	case USER.LOG_OUT:
		return { ...state, active_user: null  };
	}
		return { ...state, ...extendReducer(state, action, USER) };

};
