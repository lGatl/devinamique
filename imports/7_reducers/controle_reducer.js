// Reducer for custom Action
//imported in .index
import { CONTROLE } from '../6_actions';
const DEFAULTS = {};

export default function (  state = DEFAULTS, action ) {
	
	switch ( action.type ) {
		
	case CONTROLE.CHANGE_PAGE:
		return { ...state, page: action.payload  };

	case CONTROLE.SET:
		return { ...state,  ...action.payload };
	
	}
	return state;
}
