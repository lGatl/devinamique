// Take a date and return J/M/AAAA
export const dateToFormat = date => {
	if(date instanceof Date && !isNaN(date.valueOf())){
		let jour = date.getDate();
		let mois = date.getMonth()+1;
		let annee = date.getFullYear();
		return jour +'/'+mois+'/'+annee;
}else{
		return '';
}
};
