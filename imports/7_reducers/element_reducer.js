import { ELEMENT } from '../6_actions';

import { extendReducer } from './common_reducer';

const DEFAULT = {
	got: {data:[]},
	got1:{data:{}},
	controle:{
		libelle:"",
		numerique:"",
		prix:"",
		titre_lvl:0,
		sans_interaction:false,
		dynamique:false
	}
};

export default (state = DEFAULT, action) => {
	switch (action.type) {
		default:
			return { ...state, ...extendReducer(state, action, ELEMENT) };
	}
};
