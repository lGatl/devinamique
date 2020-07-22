// Reducer for custom Action
//imported in .index
import { CONTROLE } from '../6_actions';
const DEFAULTS = {resize:0,set:{}};

export default function (  state = DEFAULTS, action ) {
	
	switch ( action.type ) {
		
	case CONTROLE.CHANGE_PAGE:
		return { ...state, page: action.payload  };

	case CONTROLE.RESIZE:
		return { ...state, resize: action.payload  };

	case CONTROLE.SET:
		return { ...state,  set:{...state.set,...action.payload} };
	
	}
	return state;
}
