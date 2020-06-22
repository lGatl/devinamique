
import { combineReducers } from 'redux';

import devis from './devis_reducer';
import entreprise from './entreprise_reducer';
import element from './element_reducer';
import logique from './logique_reducer';
import user from '../user/3_reducer/user_reducer';
import controle from './controle_reducer';

//Join ALL Reducers
export default ROOT_REDUCER = combineReducers({
	
	devis,
	entreprise,
	element,
	logique,
	user,
	controle
});
