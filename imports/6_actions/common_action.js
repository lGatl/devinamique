import { styleLog } from '../8_libs';



export function extendAction(CONST_NAME) {
  let CONSTANTE = {
    CONTROLE: CONST_NAME + '_CONTROLE',
    GET1_START: CONST_NAME + '_GET1_START',
    GET1: CONST_NAME + '_GET1',
    GET: CONST_NAME + '_GET',
    GET_START: CONST_NAME + '_GET_START',
    GET_ADD: CONST_NAME + '_GET_ADD',
    GET_ADD_START: CONST_NAME + '_GET_ADD_START',
    POST: CONST_NAME + '_POST',
    UP: CONST_NAME + '_UP',
    UPS: CONST_NAME + '_UPS',
    DEL: CONST_NAME + '_DEL',
    SELECT: CONST_NAME + '_SELECT',
    SET: CONST_NAME + '_SET',
    CLEAN: CONST_NAME + '_CLEAN'
  };

  let controle = function controle(object) {
    return {
      type: CONSTANTE.CONTROLE,
      payload: object
    };
  };
   let set = function set(object) {
    return {
      type: CONSTANTE.SET,
      payload: object
    };
  };
    let clean = function clean(string) {
    return {
      type: CONSTANTE.CLEAN,
      payload: {instate:string}
    };
  };
  function select(object) {
    return {
      type: CONSTANTE.SELECT,
      payload: object
    };
  }
  let get1Start = instate => {
    return {
      type: CONSTANTE.GET1_START,
      payload: { instate }
    };
  };
  let get1T = p => {
    return {
      type: CONSTANTE.GET1,
      payload: p
    };
  };
  let get1 = (obj) => {
    obj = typeof obj !== undefined && obj !== null && typeof obj === "object" ? obj : {};
    let {data, instate, ssl, cbk} = obj;
    data = typeof data !== undefined && data !== null && typeof data === "object" ? data : {};
    instate = typeof instate !== undefined && instate !== null && typeof instate === "object" ? instate : null;
    ssl = typeof ssl !== undefined && ssl !== null && typeof ssl === "object" ? ssl : null;
    cbk = typeof cbk !== undefined && cbk !== null && typeof cbk === "function" ? cbk : ()=>{};

    return (dispatch, getState) => {
      Meteor.call('get1' + CONST_NAME,data,ssl,(err,res)=>{
        if(err){
          console.log("%c"+CONSTANTE.GET1+" - ACTION ERROR!!!!!",styleLog("red"), err)
          
        }else{


          console.log("%c"+CONSTANTE.GET1+" : ",styleLog("blue"),{ data:res, instate})
          
          dispatch(
          get1T({ data:res, instate})
        );
        }
      });
    };
  };
  let getStart = instate => {
    return {
      type: CONSTANTE.GET_START,
      payload: { instate }
    };
  };
  let getT = p => {
    return {
      type: CONSTANTE.GET,
      payload: p
    };
  };
  let get = (obj) => {
  	obj = typeof obj !== undefined && obj !== null && typeof obj === "object" ? obj : {};
  	let {data, instate, ssl, cbk} = obj;
  	data = typeof data !== undefined && data !== null && typeof data === "object" ? data : {};
  	instate = typeof instate !== undefined && instate !== null && typeof instate === "object" ? instate : null;
  	ssl = typeof ssl !== undefined && ssl !== null && typeof ssl === "object" ? ssl : null;
  	cbk = typeof cbk !== undefined && cbk !== null && typeof cbk === "function" ? cbk : ()=>{};

    return (dispatch, getState) => {
    	Meteor.call('get' + CONST_NAME,data,ssl,(err,res)=>{
				if(err){
					console.log("%c"+CONSTANTE.GET+" - ACTION ERROR!!!!!",styleLog("red"), err)
					
				}else{
					console.log("%c"+CONSTANTE.GET+" : ",styleLog("#00296C"),{ data:res, instate})
					
					dispatch(
          getT({ data:res, instate})
        );
				}
			});
  	};
  };

  const getAddStart = instate => {
    return {
      type: CONSTANTE.GET_ADD_START,
      payload: { instate }
    };
  };
  const getAddT = p => {
    return {
      type: CONSTANTE.GET_ADD,
      payload: p
    };
  };
  let getAdd = (obj) => {
  			obj = typeof obj !== undefined && obj !== null && typeof obj === "object" ? obj : {};
  	 let {data, instate, ssl, cbk} = obj;
  	data = typeof data !== undefined && data !== null && typeof data === "object" ? data : {};
  	instate = typeof instate !== undefined && instate !== null && typeof instate === "object" ? instate : null;
  	ssl = typeof ssl !== undefined && ssl !== null && typeof ssl === "object" ? ssl : null;
  	cbk = typeof cbk !== undefined && cbk !== null && typeof cbk === "function" ? cbk : ()=>{};

    return (dispatch, getState) => {
    	Meteor.call('get' + CONST_NAME,data,ssl,(err,res)=>{
				if(err){
					console.log("%c"+CONSTANTE.GET_ADD+" - ACTION ERROR!!!!!",styleLog("red"), err)
					
				}else{
					console.log("%c"+CONSTANTE.GET_ADD+" : ",styleLog("#001D4D"),{ data:res, instate})
					
					dispatch(
          getAddT({ data:res, instate})
        );
				}
			});
  	};
  };

  const postT = p => {
    return {
      type: CONSTANTE.POST,
      payload: p
    };
  };
  const post = ({data, instate, body, cbk}) => {
  	data = typeof data !== undefined && data !== null && typeof data === "object" ? data : {};
  	instate = typeof instate !== undefined && instate !== null && typeof instate === "object" ? instate : null;
  	cbk = typeof cbk !== undefined && cbk !== null && typeof cbk === "function" ? cbk : ()=>{};

    return (dispatch, getState) => {
    	Meteor.call('add' + CONST_NAME, data ,(err,res)=>{
				if(err){
					console.log("%c"+CONSTANTE.POST+" - ACTION ERROR!!!!!",styleLog("red"), err)
					
				}else{
					console.log("%c"+CONSTANTE.POST+" - ",styleLog("green"),{ data:{ ...data, _id:res }, instate })
					cbk(res)
					dispatch(
          postT({ data:{ ...data, _id:res }, instate })
        );
				}
			});
  	};
  };
  const upT = p => {
    return {
      type: CONSTANTE.UP,
      payload: p
    };
  };
  let up = ({data, instate, cbk}) =>{

  	data = typeof data !== undefined && data !== null && typeof data === "object" ? data : {};
  	instate = typeof instate !== undefined && instate !== null && typeof instate === "object" ? instate : null;
  	cbk = typeof cbk !== undefined && cbk !== null && typeof cbk === "function" ? cbk : ()=>{};

    return (dispatch, getState) => {
			Meteor.call('up' + CONST_NAME,data,(err,res)=>{
				if(err){
					console.log("%c"+CONSTANTE.UP+" - ACTION ERROR!!!!!",styleLog("red"), err)
					
				}else{
					console.log("%c"+CONSTANTE.UP+" - ",styleLog("green"),{ data:{ ...data, _id:res }, instate })
					
					dispatch(
          upT({ data:{ ...data, _id:res }, instate })
        );
				}
			});
		}
	}
	const upsT = p => {
    return {
      type: CONSTANTE.UPS,
      payload: p
    };
  };
  let ups = (obj) =>{

			 obj = typeof obj !== undefined && obj !== null && typeof obj === "object" ? obj : {};
		let {data, instate, body, cbk} = obj;
  	data = typeof data !== undefined && data !== null && typeof data === "object" ? data : {};
  	instate = typeof instate !== undefined && instate !== null && typeof instate === "object" ? instate : null;
  	cbk = typeof cbk !== undefined && cbk !== null && typeof cbk === "function" ? cbk : ()=>{};

    return (dispatch, getState) => {
			Meteor.call('ups' + CONST_NAME,data,(err,res)=>{
				if(err){
					console.log("%c"+CONSTANTE.UPS+" - ACTION ERROR!!!!!",styleLog("red"), err)
					
				}else{
					console.log(CONSTANTE.UPS, " : ",{ data:{ ...obj, _id:res }, instate:null })
					
					dispatch(
          upsT({ data:{ ...obj, _id:res }, instate:null })
        );
				}
			});
		}
	}

  const delT = p => {
    return {
      type: CONSTANTE.DEL,
      payload: p
    };
  };
  const del = (obj) => {
  	 obj = typeof obj !== undefined && obj !== null && typeof obj === "object" ? obj : null;
  	let {data, instate, cbk} = obj;
  	instate = typeof instate !== undefined && instate !== null && typeof instate === "object" ? instate : null;
  	cbk = typeof cbk !== undefined && cbk !== null && typeof cbk === "function" ? cbk : ()=>{};

    return (dispatch, getState) => {
    	Meteor.call('rm' + CONST_NAME, obj ,(err)=>{
					if(err){
					console.log("%c"+CONSTANTE.DEL+" - ACTION ERROR!!!!!",styleLog("red"), err)
				}else{
					console.log("%c"+CONSTANTE.DEL+" - ",styleLog("orange"),{ data:obj, instate})
					dispatch(
          delT({ data:obj, instate})
        );
				}
  	});
    };
  };
  return {
    action: {
      clean,
      controle,
      select,
      set,
      get1,
      get,
      getT,
      getStart,
      getAdd,
      getAddStart,
      post,
      up,
      ups,
      del
    },
    CONSTANTE
  };
}
