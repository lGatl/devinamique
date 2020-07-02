import { styleLog } from '../8_libs';

let stylelog = 'color: #5440FF;' + styleLog;
let stylerejlog = 'color: #B8B0FF;' + styleLog;

const DEFAULT = {
  got: {data:[]}, 
  got1:{data:{}} 
};

export const extendReducer = (state = DEFAULT, action, TYPES) => {

    let Action = typeof action !== undefined && action !== null && typeof action === "object"&& Object.keys(action).length === 2?action:{}

    let payload = typeof Action.payload !== undefined && Action.payload !==null && typeof Action.payload === "object"?Action.payload:false;
    
    let type = typeof Action.type !== undefined && Action.type !==null && typeof Action.type === "string"?Action.type:"ERROR"
    type = payload === false?"Error":type;
    
    let {data, instate} = payload;

    instate = typeof instate !== undefined && instate !== null && typeof instate === "string"?instate:"data";
    let newstate = {};
    switch (type) {
        case TYPES.CONTROLE:
            return {
                ...state,
                controle: { ...state.controle, ...action.payload }
            };
        case TYPES.SET:
        return {
            ...state,
           seted: { ...state.set, ...action.payload }
        };

        case TYPES.GET:
        
                return {
                    ...state,
                    got: {
                        ...state.got,
                        [instate]: data,
                        [instate + '_loading']: false
                    }
                };
        case TYPES.GET1:
                return {
                    ...state,
                    got1: {
                        ...state.got,
                        [instate]: data,
                        [instate + '_loading']: false
                    }
                };
            
            case TYPES.CLEAN:
                return {
                    ...state,
                    got: {
                        ...state.got,
                        [instate]: [],
                        [instate + '_loading' ]: false
                    }
                };
           
        case TYPES.GET_START:
            return {
                ...state,
                got: {
                    ...state.got,
                    [instate + '_loading']: true
                }
            };
        case TYPES.POST:

            return {
                ...state,
                controle: { ...state.controle,
                     _id:data._id,
                    date:Date(Date.now()) },
                got: {
                    ...state.got,
                    [instate]: [...state.got[instate], data],
                    [instate + '_add_loading']: false
                }
            };
        case TYPES.UP:

              newstate = state.got[instate].reduce((total,elt)=>elt._id===data._id?[...total,data]:[...total,elt],[])
            return {
                ...state,
                got: {
                    ...state.got,
                    [instate]: [...newstate],
                    [instate + '_add_loading']: false
                },
                got1: {
                    ...state.got1,
                    [instate]: data,
                    [instate + '_add_loading']: false
                }
            };
            case TYPES.DEL:

              newstate = state.got[instate].reduce((total,elt)=>elt._id===data._id?total:[...total,elt],[])
            return {
                ...state,
                got: {
                    ...state.got,
                    [instate]: [...newstate],
                    [instate + '_add_loading']: false
                }
            };
        case TYPES.UPS:
            return {
                ...state,
                got: {
                    ...state.got,
                    [instate]: [...state.got[instate], data],
                    [instate + '_add_loading']: false
                }
            };

        case "ERROR":
            console.log("ERROR-------",TYPES)
            console.log(action)
            return state;

        default:
            return state;
    }
};
