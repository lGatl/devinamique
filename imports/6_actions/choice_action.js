import { extendAction } from './common_action';

export const CHOICE = {
	...extendAction('CHOICE').CONSTANTE
};

export const choice = {
	...extendAction('CHOICE').action
};
