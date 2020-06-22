import { ENTREPRISE } from '../6_actions';

import { extendReducer } from './common_reducer';

const DEFAULT = {
got: {data:[]},
		seted:{},
		controle:{
		nom:"",
		telephone:"",
		courriel:"",
		adresse:"",
		site_internet:"",
		siret:"",
		tva_intracom:""
	}
};

export default (state = DEFAULT, action) => {

	   let Action = typeof action !== undefined && action !== null && typeof action === "object"&& Object.keys(action).length === 2?action:{}
    let payload = typeof Action.payload !== undefined && Action.payload !==null && typeof Action.payload === "object"?Action.payload:false;
    let type = typeof Action.type !== undefined && Action.type !==null && typeof Action.type === "string"?Action.type:"ERROR"
    type = payload === false?"Error":type;
    let {data, instate} = payload;
    instate = typeof instate !== undefined && instate !== null && typeof instate === "string"?instate:"data";

	switch (action.type) {

		case ENTREPRISE.POST:

            return {
                ...state,
                controle: { ...state.controle,
                     _id:data._id,
                },
                got: {
                    ...state.got,
                    [instate]: [...state.got[instate], data],
                    [instate + '_add_loading']: false
                },
                seted:{active_entreprise:data._id}
            };

		default:
			return { ...state, ...extendReducer(state, action, ENTREPRISE) };
	}
};
