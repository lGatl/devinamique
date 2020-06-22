import { extendAction } from './common_action';

export const DEVIS = {
	...extendAction('DEVIS').CONSTANTE
};

export const devis = {
	...extendAction('DEVIS').action
};
