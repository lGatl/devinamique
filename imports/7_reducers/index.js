
import { combineReducers } from 'redux';

import choice from './choice_reducer';
import devis from './devis_reducer';
import entreprise from './entreprise_reducer';
import element from './element_reducer';
import logique from './logique_reducer';
import user from '../user/3_reducer/user_reducer';
import controle from './controle_reducer';

//Join ALL Reducers
export default ROOT_REDUCER = combineReducers({
	
	choice,
	devis,
	entreprise,
	element,
	logique,
	user,
	controle
});
