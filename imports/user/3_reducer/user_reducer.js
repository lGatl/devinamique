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

	   let Action = typeof action !== undefined && action !== null && typeof action === "object"&& Object.keys(action).length === 2?action:{}
    let payload = typeof Action.payload !== undefined && Action.payload !==null && typeof Action.payload === "object"?Action.payload:false;
    let type = typeof Action.type !== undefined && Action.type !==null && typeof Action.type === "string"?Action.type:"ERROR"
    type = payload === false?"Error":type;
    let {data, instate} = payload;
    instate = typeof instate !== undefined && instate !== null && typeof instate === "string"?instate:"data";
    let newstate = {};

	switch ( action.type ) {

	case USER.GET_ACTIVE_USER:
		
		return { ...state, active_user: action.payload.data  };
	case USER.PUT_USER_ID:	
		return { ...state, user_id: action.payload  };
	case USER.LOG_IN:
		return { ...state};
	case USER.LOG_OUT:
		return { ...state, active_user: null  };

  case USER.UP:

      newstate = state.got!== undefined && typeof state.got ==="object" && typeof state.got[instate] === "object" && state.got[instate] instanceof Array ?
      state.got[instate].reduce((total,elt)=>elt._id===data._id?[...total,data]:[...total,elt],[]):[]

      let is_active_user = state.active_user !== undefined && typeof state.active_user === "object" && data !==undefined && 
        typeof data === "object" && data._id !== undefined && data._id === state.active_user._id

    return !is_active_user?{
        ...state,
        got: {
            ...state.got,
            [instate]: [...newstate],
            [instate + '_loading']: false
        },
        got1: {
            ...state.got1,
            [instate]: data,
            [instate + '_loading']: false
        }
    }:{
        ...state,
        active_user:{...data},
        got: {
            ...state.got,
            [instate]: [...newstate],
            [instate + '_loading']: false
        },
        got1: {
            ...state.got1,
            [instate]: data,
            [instate + '_loading']: false
        }
    }
	}
		return { ...state, ...extendReducer(state, action, USER) };

};
