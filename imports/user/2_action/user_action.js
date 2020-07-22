import {
	Accounts
} from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';


import { extendAction } from '../../6_actions/common_action';

//Export constant, types of actions
export const USER = { 
	CREE_COMPTE: 'USER_CREE_COMPTE',
	GET_ACTIVE_USER: 'USER_GET_ACTIVE_USER',
	LOG_IN: 'USER_LOG_IN',
	LOG_OUT: 'USER_LOG_OUT',
	...extendAction('USER').CONSTANTE
};

//Meteor Methods for account system have to be called by client
//We prepare actions with them

	/*
	 *Create Account
	 *second parameter: user - object of user to add
	 *payload.val: user coming from parameters
	*/
let creeCompteT = p => {
    return {
		type: 		USER.CREE_COMPTE,
		payload: 	p
	};
}

function creeCompte(data, cbk = ()=>{}){

	return (dispatch, getState) => {
		data = typeof data !== undefined && data !== null && typeof data === "object" ? data : {};
  	cbk = typeof cbk !== undefined && cbk !== null && typeof cbk === "function" ? cbk : ()=>{};
		Accounts.createUser(data, (err)=>{
			if(err){
					console.log(USER.CREE_COMPTE, " - ACTION ERROR",err)
					
				}else{
					console.log(USER.CREE_COMPTE," : ")
					
					dispatch(
          creeCompteT({ data })
        );
				cbk()
			}
		});
	}
}
	/*
	 *Login
	 *first parameter: user - string - username of the user
	 *second parameter: user - string - password of the user
	*/
	let logInT = p => {
	    return {
			type: 		USER.LOG_IN,
			payload: 	p
		};
	}
function logIn(user, password, cbk = ()=>{}){
	return (dispatch, getState) => {
		Meteor.loginWithPassword(user, password, (err)=>{
			if(err){
					console.log(USER.LOG_IN, " - ACTION ERROR",err)
					
				}else{
					console.log(USER.LOG_IN)
					
					dispatch(
          logInT()
        );
				cbk()
			}
		});
	};
}
	/*
	 *LogOut
	 * reducer put null in active_user
	*/
let logOutT = p => {
	    return {
			type: 		USER.LOG_OUT,
			payload: 	p
		};
}	
function logOut( cbk = ()=>{}){
	return (dispatch, getState) => {
		Meteor.logout( (err)=>{
			if(err){
					console.log(USER.LOG_OUT, " - ACTION ERROR",err)
					
				}else{
					console.log(USER.LOG_OUT)
					
					dispatch(
          logOutT()
        );
				cbk()
			}
		});
	};
}
	/*
	 *Get the user connected here
	 *payload.val: object - user connected => user put in active_user
	*/
	let getActiveUserT = p => {
	    return {
				type: USER.GET_ACTIVE_USER,
				payload: 	p
			};
	}
export function getActiveUser( cbk = ()=>{} ){ 
	return (dispatch, getState) => {
		Meteor.call('get1USERS', Meteor.userId(), ( err, res ) => {
				if(err){
					console.log(USER.GET_ACTIVE_USER, " - ACTION ERROR",err)
					
				}else{
					console.log(USER.GET_ACTIVE_USER)
					
					dispatch(
          getActiveUserT({ data:res})
        );
				cbk()
			}
		});
	};
}
//Export Actions
export const user = { 
	creeCompte,
	logIn,
	logOut,
	getActiveUser,
	...extendAction('USER').action
};
