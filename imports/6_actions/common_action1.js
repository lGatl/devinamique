//CMRR declare set of actinos for each collection by maping CONST_NAMES constant
//Constant for action types are create as well.
export function extendAction(CONST_NAME) {

	let CONSTANTE = { 
		ADD : CONST_NAME+'_ADD',
		GET : CONST_NAME+'_GET',
		GETADD : CONST_NAME+'_GETADD',
		GET1 : CONST_NAME+ '_GET1',
		COUNT : CONST_NAME+'_COUNT',
		RM : CONST_NAME+'_RM',
		RM_ALL : CONST_NAME+'_RM_ALL',
		UP : CONST_NAME+'_UP',
		UPM : CONST_NAME+'_UPM',
		UPS : CONST_NAME+'_UPS',
		CONTROLE : CONST_NAME+'_CONTROLE',

	};
	/*For each Action :
	 *With _state suffix: state parameter into payload.state: string or object - to presize where store in state
	 *With _SSL suffix: ssl parameter put in the Meteor Method to use sort skip & limit. Use like mongo. {sort:{created_at:-1},skip:10,limit:20}
	 *Last parameter is a callback witch return the same thing as payload.data
	*/
	
	/*
	 *Add new element
	 *first parameter: obj - object to add
	 *payload.data: object - new object with _id
	 */
	let add = (obj, cbk=()=>{})=>{
		let p = new Promise( ( resolve, reject ) => {
			Meteor.call('add' + CONST_NAME, obj ,(err,res)=>{
				if(err){
					reject(err);
				}else{
					cbk( res );
					resolve( { data:{ ...obj, _id:res }, state:null } );
				}
			});
		});
		return {
			type: CONSTANTE.ADD,
			payload: 	p,
		};
	}
	let add_state = (obj,state, cbk=()=>{})=>{
		let p = new Promise( ( resolve, reject ) => {
			Meteor.call('add' + CONST_NAME, obj ,(err,res)=>{
				if(err){
					reject(err);
				}else{
					cbk( { ...obj, _id:res } );
					resolve( { data:{ ...obj, _id:res }, state } );
				}
			});
		});
		return {
			type: CONSTANTE.ADD,
			payload: 	p,
		};
	}
	/*
	 *Get elements
	 *first parameter: obj - object to filter
	 *payload.data: array - found objects
	 */

	let get = (obj = {}, cbk = ()=>{})=>{
		let p = new Promise( ( resolve, reject ) =>{
			Meteor.call('get' + CONST_NAME,obj,null,(err,res)=>{
				if(err){
					//console.log(err)
					reject( err );
				}else{
					//console.log(res)
					cbk( res );
					
					resolve( { data:res, state:null} );
				}
			});
		});
		return {
			type: CONSTANTE.GET,
			payload: 	p,
		};
	}
	let get_SSL = (obj = {}, ssl = null, cbk = ()=>{})=>{
		let p = new Promise( ( resolve, reject ) =>{
			Meteor.call('get' + CONST_NAME,obj,ssl,(err,res)=>{
				if(err){
					//console.log(err)
					reject( err );
				}else{
					cbk( res );
					
					resolve( { data:res, state:null} );
				}
			});
		});
		return {
			type: CONSTANTE.GET,
			payload: 	p,
		};
	}
	let get_state = (obj = {}, state =  null, cbk = ()=>{})=>{
		let p = new Promise( ( resolve, reject ) =>{
			Meteor.call('get' + CONST_NAME,obj,null,(err,res)=>{
				if(err){
					//console.log(err)
					reject( err );
				}else{
					//console.log(res)
					cbk( res );
					
					resolve( { data:res, state} );
				}
			});
		});
		return {
			type: CONSTANTE.GET,
			payload: 	p,
		};
	}
	let get_SSL_state = (obj = {}, ssl = null, state =  null, cbk = ()=>{})=>{
		let p = new Promise( ( resolve, reject ) =>{
			Meteor.call('get' + CONST_NAME,obj,ssl,(err,res)=>{
				if(err){
					//console.log(err)
					reject( err );
				}else{
					//console.log(res)
					cbk( res );
					
					resolve( { data:res, state} );
				}
			});
		});
		return {
			type: CONSTANTE.GET,
			payload: 	p,
		};
	}
	let get_state_SSL = (obj = {}, state =  null, ssl = null, cbk = ()=>{})=>{
		let p = new Promise( ( resolve, reject ) =>{
			Meteor.call('get' + CONST_NAME,obj,ssl,(err,res)=>{
				if(err){
					//console.log(err)
					reject( err );
				}else{
					//console.log(res)
					cbk( res );
					
					resolve( { data:res, state} );
				}
			});
		});
		return {
			type: CONSTANTE.GET,
			payload: 	p,
		};
	}
	//________________________________-
	/*
	 *Get elements But in the reducer, result will note replace the state, it will be add on the state
	 *first parameter: obj - object to filter
	 *payload.data: array - found objects
	 */
	let getAdd = (obj = {}, cbk = ()=>{})=>{
		let p = new Promise( ( resolve, reject ) =>{
			Meteor.call('get' + CONST_NAME,obj,null,(err,res)=>{
				if(err){
					//console.log(err)
					reject( err );
				}else{
					//console.log(res)
					cbk( res );
					
					resolve( { data:res, state:null} );
				}
			});
		});
		return {
			type: CONSTANTE.GETADD,
			payload: 	p,
		};
	}
	let getAdd_SSL = (obj = {}, ssl = null, cbk = ()=>{})=>{
		let p = new Promise( ( resolve, reject ) =>{
			Meteor.call('get' + CONST_NAME,obj,ssl,(err,res)=>{
				if(err){
					//console.log(err)
					reject( err );
				}else{
					//console.log(res)
					cbk( res );
					
					resolve( { data:res, state:null} );
				}
			});
		});
		return {
			type: CONSTANTE.GETADD,
			payload: 	p,
		};
	}
	let getAdd_state = (obj = {}, state =  null, cbk = ()=>{})=>{
		let p = new Promise( ( resolve, reject ) =>{
			Meteor.call('get' + CONST_NAME,obj,null,(err,res)=>{
				if(err){
					//console.log(err)
					reject( err );
				}else{
					//console.log(res)
					cbk( res );
					
					resolve( { data:res, state} );
				}
			});
		});
		return {
			type: CONSTANTE.GETADD,
			payload: 	p,
		};
	}
	let getAdd_SSL_state = (obj = {}, ssl = null, state =  null, cbk = ()=>{})=>{
		let p = new Promise( ( resolve, reject ) =>{
			Meteor.call('get' + CONST_NAME,obj,ssl,(err,res)=>{
				if(err){
					//console.log(err)
					reject( err );
				}else{
					//console.log(res)
					cbk( res );
					
					resolve( { data:res, state} );
				}
			});
		});
		return {
			type: CONSTANTE.GETADD,
			payload: 	p,
		};
	}
	let getAdd_state_SSL = (obj = {}, state =  null, ssl = null, cbk = ()=>{})=>{
		let p = new Promise( ( resolve, reject ) =>{
			Meteor.call('get' + CONST_NAME,obj,ssl,(err,res)=>{
				if(err){
					//console.log(err)
					reject( err );
				}else{
					//console.log(res)
					cbk( res );
					
					resolve( { data:res, state} );
				}
			});
		});
		return {
			type: CONSTANTE.GETADD,
			payload: 	p,
		};
	}
	//_____________
	/*
	 *Get one element
	 *first parameter: obj - object to filter
	 *payload.data: object - found object
	 */

	let get1 = (obj, cbk = () => {}) => {
		let p = new Promise( ( resolve, reject ) => {
			Meteor.call('get1' + CONST_NAME,obj,(err,res)=>{
				if(err){
					reject(err);
				}else{
					cbk( res );
					resolve( { data:res, state:null} );
				}
			});
		});
		return {
			type: CONSTANTE.GET1,
			payload: 	p,
		};
	}
	let get1_state = (obj, state, cbk = () => {})=>{
		let p = new Promise( ( resolve, reject ) => {
			Meteor.call('get1' + CONST_NAME,obj,(err,res)=>{
				if(err){
					reject(err);
				}else{
					cbk( res );
					resolve( { data:res, state} );
				}
			});
		});
		return {
			type: CONSTANTE.GET1,
			payload: 	p,
		};
	}
	/*
	 *Count elements respectiong filter
	 *first parameter: obj - object to filter
	 *payload.data: array - nb of found Objects
	 */
	let count = (obj={}, cbk = ()=>{})=>{
		let p = new Promise( ( resolve, reject ) =>{
			Meteor.call('count' + CONST_NAME,obj,(err,res)=>{
				if(err){
					//console.log(err)
					reject( err );
				}else{
					//console.log(res)
					cbk( res );
					
					resolve( { data:res, state:null} );
				}
			});
		});
		return {
			type: CONSTANTE.COUNT,
			payload: 	p,
		};
	}
	let count_state = (obj={}, state, cbk = ()=>{})=>{
		let p = new Promise( ( resolve, reject ) =>{
			Meteor.call('count' + CONST_NAME,obj,(err,res)=>{
				if(err){
					//console.log(err)
					reject( err );
				}else{
					//console.log(res)
					cbk( res );
					
					resolve( { data:res, state} );
				}
			});
		});
		return {
			type: CONSTANTE.COUNT,
			payload: 	p,
		};
	}
	/*
	 *Remove one element
	 *first parameter: obj - object to find element to remove (must be {_id:}) else dispatch to an ERROR reducer
	 *payload.data: object - object to find element to remove
	 */
	let rm = (obj, cbk = ()=>{}) =>{
		obj = typeof obj == 'object' && Object.keys(obj).length>0 && Object.keys(obj)[0]=='_id'?obj:false;
		if(obj){
			let p = new Promise( ( resolve, reject ) => {
				Meteor.call('rm' + CONST_NAME, obj ,(err)=>{
					if(err){
						reject(err);
					}else{
						cbk(obj);
						resolve( { data:obj, state:null} );
					}
				});
			});
			return {
				type: CONSTANTE.RM,
				payload: 	p,
			};
		}else{
			return {
				type: CONSTANTS.Error.ERROR_ARGUMENT,
				payload:{
					action_type:CONSTANTE.RM,
					action:'RM'
				}
			};
		}
		
	}
	let rm_state = (obj, state, cbk = ()=>{}) => {
		obj = typeof obj == 'object' && Object.keys(obj).length>0 && Object.keys(obj)[0]=='_id'?obj:false;
		if(obj){
			let p = new Promise( ( resolve, reject ) => {
				Meteor.call('rm' + CONST_NAME, obj ,(err,res)=>{
					if(err){
						reject(err);
					}else{
						cbk(obj);
						resolve( { data:obj, state:null} );
					}
				});
			});
			return {
				type: CONSTANTE.RM,
				payload: 	p,
			};
		}else{
			return {
				type: CONSTANTS.Error.ERROR_ARGUMENT,
				payload:{
					action_type:CONSTANTE.RM,
					action:'RM'
				}
			};
		}
	}
	/*
	 *Remove All elements of collection
	 *first parameter: obj - object to find element to remove (must be {_id:}) else dispatch to an ERROR reducer
	 *payload.data: object - object to find element to remove
	 */
		let rmAll = ( cbk = ()=>{}) =>{
		let p = new Promise( ( resolve, reject ) => {
			Meteor.call('rm' + CONST_NAME, {} ,(err,res)=>{
				if(err){
					reject(err);
				}else{
					cbk();
					resolve( { state:null} );
				}
			});
		});
		return {
			type: CONSTANTE.RM_ALL,
			payload: 	p,
		};
	}
	let rmAll_state = ( state, cbk = ()=>{})=>{
		let p = new Promise( ( resolve, reject ) => {
			Meteor.call('rm' + CONST_NAME, {} ,(err,res)=>{
				if(err){
					reject(err);
				}else{
					cbk();
					resolve( { state } );
				}
			});
		});
		return {
			type: CONSTANTE.RM_ALL,
			payload: 	p,
		};
	}
	/*
	 *Update element of collection
	 *first parameter: obj - object to find element to update
	 *second parameter: obj - update to apply at the found element
	 *payload.data: object -  update to apply at the found element with _id
	 */
	let up = (reco,modif, cbk = ()=>{}) =>{
		let p = new Promise( ( resolve, reject ) => {
			Meteor.call('up' + CONST_NAME,reco,modif,(err,res)=>{
				if(err){
					reject(err);
				}else{

					cbk( {...modif,_id:res} );
					resolve( { data:{...modif,_id:res},state:null} );
				}
			});
		});
		return {
			type: CONSTANTE.UP,
			payload: 	p,
		};
	}
	let up_state = (reco,modif,state, cbk = ()=>{}) => {
		let p = new Promise( ( resolve, reject ) => {
			Meteor.call('up' + CONST_NAME,reco,modif,(err,res)=>{
				if(err){
					reject(err);
				}else{

					cbk( {...modif,_id:res} );
					resolve( { data:{...modif,_id:res},state} );
				}
			});
		});
		return {
			type: CONSTANTE.UP,
			payload: 	p,
		};
	}
	/* !!!!!!!DON'T USE FOR THE MOMENT!!!!!!!!
	 *Update elements of collection
	 *first parameter: obj - object to find elements to update
	 *second parameter: obj - update to apply at found elements
	 *payload.data: object -  update to apply at the found element with _id
	 */
	let upm = (reco, modif, cbk = ()=>{}) =>{
		let p = new Promise( ( resolve, reject ) => {
			Meteor.call('upm' + CONST_NAME,reco,modif,(err,res)=>{
				if(err){
					reject(err);
				}else{
					cbk( {...modif,_id:res} );
					//console.log('res', res);
					resolve( { data:{...modif,_id:res}, state:null} );
				}
			});
		});
		return {
			type: CONSTANTE.UPM,
			payload: 	p,
		};
	}
		/*!!!!!!!DON'T USE FOR THE MOMENT!!!!!!!!
	 *Upsert element of collection
	 *first parameter: obj - object to find element to upsert
	 *second parameter: obj - upsert to apply at the found element
	 *payload.data: object -  upsert to apply at the found element with _id
	 */
	let ups = (reco,obj, cbk = ()=>{}) =>{
		let p = new Promise( ( resolve, reject ) => {
			Meteor.call('ups' + CONST_NAME,reco,obj,(err,res)=>{
				if(err){
					reject(err);
				}else{
					cbk( res );
					resolve( { data:{ ...obj, _id:res }, state:null } );
				}
			});
		});
		return {
			type: CONSTANTE.UPS,
			payload: 	p,
		};
	}
	//=========================================================
	let controle = (data) =>{
		return {
			type: CONSTANTE.CONTROLE,
			payload: 	data
		};
	}
//Prepare ACTION object
	return {
    action: {
		add,
		add_state,
		rm,
		rm_state,
		rmAll,
		rmAll_state,
		get,
		get_SSL,
		get_state,
		get_SSL_state,
		get_state_SSL,
		getAdd,
		getAdd_SSL,
		getAdd_state,
		getAdd_SSL_state,
		getAdd_state_SSL,
		get1,
		get1_state,
		count,
		count_state,
		up,
		up_state,
		//upm,
		ups,	
		controle,
	},CONSTANTE
};
}

