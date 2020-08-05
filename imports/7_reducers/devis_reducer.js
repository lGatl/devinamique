import { DEVIS } from '../6_actions';

import { extendReducer } from './common_reducer';

const DEFAULT = {
	got: {data:[]}, 
  got1:{data:{}},
	controle:{ 
    libelle:"",
    entreprise:"",
    client:"",
    contractuel:false,
    tjm:""
     }
};

export default (state = DEFAULT, action) => {
	switch (action.type) {
		default:
			return { ...state, ...extendReducer(state, action, DEVIS) };
	}
};
