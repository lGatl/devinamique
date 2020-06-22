import { extendAction } from './common_action';

export const ELEMENT = {
	...extendAction('ELEMENT').CONSTANTE
};

export const element = {
	...extendAction('ELEMENT').action
};
