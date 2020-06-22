import { CONSTANTS } from '../6_actions';
const DEFAULTS = {};

//This is the Error reducer
export default function (  state = DEFAULTS, action ) {
	let message ='';
	switch ( action.type ) {
	
	case CONSTANTS.Error.ERROR_ARGUMENT:
		message =  action.payload.action == 'RM'? 'Need object with "_id" key as argument.':'';
		console.log('Error with argument(s)!!!! action :"'+action.payload.action_type+'" '+ message);
		break;	
	}
	return state;
}
