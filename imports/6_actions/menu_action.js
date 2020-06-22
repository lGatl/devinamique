//You can add a new group of action as well
//in this exemple we choose to use a group of actions for Menus
export const CONSTANT_Menu = { 
	ACTIVE_MENU: 'Menu_ACTIVE_MENU',
};

function activeMenu(val){
	return {
		type: 		CONSTANT_Menu.ACTIVE_MENU,
		payload: 	val
	};
}
//export this, it will be import in ./action to be add in ACTIONS constant
export const ACTION_Menu = { 
	activeMenu,	
};
