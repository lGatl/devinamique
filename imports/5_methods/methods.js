import SimpleSchema from 'simpl-schema';
export const COLLECTIONS = ['USERS','ENTREPRISE','ELEMENT','LOGIQUE','DEVIS'];
//You can attached Schema to collection using simpl-schema

/*const SCHEMA = {
	//COLLECTION: new SimpleSchema({})
	Test: new SimpleSchema({
		title: { type: String },
		created_at: { type: Date }
	})
};*/

//CMRR declare set of methods for each collection by maping COLLECTIONS constant
var BD = {};
COLLECTIONS.forEach((COLLECTION) =>{

	COLLECTION == 'USERS' ? BD[COLLECTION.toLowerCase()] = Meteor[COLLECTION.toLowerCase()] : BD[COLLECTION.toLowerCase()] = new Mongo.Collection(COLLECTION.toLowerCase());
		
	Meteor.methods({
		[ 'add' + COLLECTION ]:(obj)=>{ 

			return BD[COLLECTION.toLowerCase()].insert({created_at: Date.now(),...obj}); // return id of new object
		},
		[ 'get' + COLLECTION ]:(obj,ssl)=>{
			obj = typeof obj ==="object" && obj!== null && obj !== undefined ? obj : {}
			ssl = typeof (ssl) == 'object' && ssl !=null && Object.keys(ssl).length > 0 ?ssl:false;
			if(ssl){
				return BD[COLLECTION.toLowerCase()].find(obj, ssl).fetch();
				
			}else{

				return BD[COLLECTION.toLowerCase()].find(obj).fetch();
				
			}
		// return array of found objects
		},
		[ 'get1' + COLLECTION ]: (obj)=>{
			console.log("----------------------------------------------------------------------obj", obj);

			return BD[COLLECTION.toLowerCase()].findOne(obj); // return found object
		},
		[ 'count' + COLLECTION ]:(obj)=>{
			return BD[COLLECTION.toLowerCase()].find(obj).count(); // return number of total found elements
		},
		[ 'rm' + COLLECTION ]:(obj)=>{
			return BD[COLLECTION.toLowerCase()].remove(obj); // return number of return elements
		},
		[ 'up' + COLLECTION ]:(obj)=>{	

			obj = typeof obj !== undefined && obj !== null && typeof obj === "object" ? obj : {};
			let { _id } = obj	;
			_id = typeof _id === "string" && typeof _id !== undefined && _id.length >0 ? _id :false
			if(_id){
				let succed = BD[COLLECTION.toLowerCase()].update(_id,{$set:obj}); 
				return succed == 1 ? BD[COLLECTION.toLowerCase()].findOne(_id)._id:null;//return id of updated object
			}else{
				console.log("ERROR !!!!!!! Attempt update without _id")
			}
		},
		[ 'upm' + COLLECTION ]:(reco,modif)=>{
			let succed = BD[COLLECTION.toLowerCase()].update(reco,{$set:modif},{multi:true});
			return succed != 0 ? BD[COLLECTION.toLowerCase()].find(reco).fetch().reduce((total,upd)=>[...total,upd._id],[]):[]; //return array of updating object
		},
		[ 'ups'+COLLECTION ]:(reco,obj)=>{		
			return BD[COLLECTION.toLowerCase()].upsert(reco,obj); //return id of upserted object
		},
	});
	//Attach Schemas
/*	SCHEMA[COLLECTION]?BD[COLLECTION.toLowerCase()].attachSchema(SCHEMA[COLLECTION]):'';
*/
});


export {BD};
