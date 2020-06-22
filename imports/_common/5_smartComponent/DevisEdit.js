import React, {Component} from 'react';

import { bindActionCreators }	from 'redux';
import { connect } from 'react-redux';

import { devis, element, logique, entreprise } from '../../6_actions';

import { 
	Element,
	Logique,
	Button,
	DevisForm
} from '../4_dumbComponent';

class Devis extends Component {
	constructor(){
		super()
		/*PASSER DANS LES CONTROLE POUR ACTIVER L4EDITION LORS DE L'AJOUT => ajout dans reducer => _id dans active_*/

		this.state = {
			active_devis:false,
			active_element:-1,
			active_logique:-1
		}
		this._devisControle = this._devisControle.bind(this)
		this._devisEdit = this._devisEdit.bind(this)
		this._devisSave = this._devisSave.bind(this)
		this._devisClose = this._devisClose.bind(this)
		this._devisDel = this._devisDel.bind(this)
		this._devisCopy = this._devisCopy.bind(this)

		this._elementControle = this._elementControle.bind(this)
		this._elementEdit = this._elementEdit.bind(this)
		this._elementSave = this._elementSave.bind(this)
		this._elementClose = this._elementClose.bind(this)
		this._elementDel = this._elementDel.bind(this)
		this._elementCopy = this._elementCopy.bind(this)
				this._elementAdd = this._elementAdd.bind(this)

		this._logiqueControle = this._logiqueControle.bind(this)
		this._logiqueEdit = this._logiqueEdit.bind(this)
		this._logiqueSave = this._logiqueSave.bind(this)
		this._logiqueClose = this._logiqueClose.bind(this)
		this._logiqueDel = this._logiqueDel.bind(this)
		this._logiqueCopy = this._logiqueCopy.bind(this)
		this._logiqueAdd = this._logiqueAdd.bind(this)
	}
		init(){
		return{
			libelle:"",
			prix:"",
			numerique:false
		}
	}
	componentDidMount() {
		let { devis_id, devisGet1, entrepriseGet, elementGet,logiqueGet } = this.props;
		devisGet1({data:{_id:devis_id}})
		entrepriseGet()
		elementGet({data:{devis_id}})
		logiqueGet()
	}
	//•••••••••••••••••••••••••••••••••••••••••••••••
	_devisControle(obj) {
		
			let { devisControle } = this.props;
			devisControle(obj);
	}

	_devisEdit({_id,titre,entreprise,client}){
		let { devisControle } = this.props;

			devisControle({_id,titre,entreprise,client});
			this.setState({active_devis:true,active_element:-1,active_logique:-1})
	}
	_devisSave({_id}){
		let { active_user } = this.props;
		let { devisUp } = this.props;
		let { devis_controle } = this.props;
		devisUp({data:{...devis_controle,_id}});
		this.setState({active_devis:false})
	}
	_devisClose(){
		this.setState({active_devis:false})
	}
	_devisDel({_id}){

		let { devisDel } = this.props;
		devisDel({_id});
	}
	_devisCopy({_id,libelle,prix,num,id}){
		/*let { active_user, deviss } = this.props;
		let { devisPost } = this.props;
	
		devisPost({data:{libelle,prix,num,date:Date.now(),user:active_user._id}});*/
	}
	//••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••
	_elementControle(obj) {
		
			let { elementControle } = this.props;

			elementControle(obj);
	}
	_elementEdit({_id,libelle,prix,numerique,id}){
		let { elementControle } = this.props;
			if(this.state.active_element!==_id){
				elementControle({_id,libelle,prix,numerique});
				this.setState({active_element:_id,active_devis:false,active_logique:-1})
			}
	}
	_elementSave({_id}){
		let { active_user } = this.props;
		let { elementUp } = this.props;
		let { element_controle } = this.props;

		elementUp({data:{_id,...element_controle}});
		this.setState({active_element:-1})
	}
	_elementClose(){
		this.setState({active_element:-1})
	}
	_elementAdd(){
		let { active_user, elements, devis_id } = this.props;
		let { elementPost, elementControle } = this.props;
		let { controle } = this.props;
		elementPost({data:{...this.init(),devis_id,date:Date.now(),user:active_user._id},cbk:(_id)=>{this.setState({active_element:_id})}});
		//elementControle(this.init());
		
	}
	_elementDel({_id}){

		let { elementDel } = this.props;
		elementDel({_id});
	}
	_elementCopy({_id,libelle,prix,numerique,id}){
		/*let { active_user, elements } = this.props;
		let { elementPost, elementControle } = this.props;
		let { controle } = this.props;
		elementPost({data:{libelle,prix,numerique,date:Date.now(),user:active_user._id}});*/
	}
	//•••••••••••••••••••••••••••••••••••••••••••••••••••••••••
	_logiqueControle(obj) {
		console.log("obj", obj);
		
			let { logiqueControle } = this.props;

			logiqueControle(obj);
	}
	_logiqueEdit({_id,libelle_log,prix_log,numerique_log}){

		let { logiqueControle } = this.props;
			if(this.state.active_logique!==_id){
				logiqueControle({_id,libelle_log,prix_log,numerique_log});
				this.setState({active_logique:_id,active_devis:false,active_element:-1})
			}
	}
	_logiqueSave({_id}){
		let { active_user } = this.props;
		let { logiqueUp } = this.props;
		let { logique_controle,logiques } = this.props;
		let logique = logiques.find((logi)=>logi._id===_id)
		
console.log("{data:{_id,...logique,...logique_controle}}", {data:{_id,...logique,...logique_controle}});
		logiqueUp({data:{_id,...logique,...logique_controle}});
		this.setState({active_logique:-1})
	}
	_logiqueClose(){
		this.setState({active_logique:-1})
	}
	_logiqueAdd({_id}){

		let { active_user, logiques, devis_id } = this.props;
		let { logiquePost, logiqueControle } = this.props;
		let { controle } = this.props;
		logiquePost({data:{...this.init(),devis_id,element_id:_id,date:Date.now(),user:active_user._id},cbk:(_id)=>{
			this.setState({active_logique:_id})
		}});
		//logiqueControle(this.init());
		
	}
	_logiqueDel({_id}){

		let { logiqueDel } = this.props;
		logiqueDel({_id});
	}
	_logiqueCopy({_id,libelle,prix,numerique,id}){
		/*let { active_user, logiques } = this.props;
		let { logiquePost, logiqueControle } = this.props;
		let { controle } = this.props;
		logiquePost({data:{libelle,prix,numerique,date:Date.now(),user:active_user._id}});*/
	}
	render(){
		let { active_user, devis,
			devis_controle,element_controle,logique_controle, 
			elements, logiques,entreprises } = this.props;

			logiques = typeof logiques !== undefined && typeof logiques === "object" && logiques instanceof Array ? logiques:[]
	
			let { libelle,prix,numerique } = element_controle;
			let { titre,entreprise,client } = devis_controle;
			let { libelle_log,prix_log,numerique_log } = logique_controle;

		return (
			<div style={{ display:"flex", flexDirection:"column", width:"100%",height:"100%"}}>
					Creez un devis dynamique
					<DevisForm
									active = {this.state.active_devis}
									_id={devis._id}
									onClose = {this._devisClose}
									onEdit = {this._devisEdit}
									onSave = {this._devisSave}
									onDel = {this._devisDel}
									onCopy = {this._devisCopy}
									onChange = {this._devisControle} 
									titre={this.state.active_devis ? titre: devis.titre}
									entreprise={this.state.active_devis ? entreprise: devis.entreprise}
									options={entreprises.reduce((total,ent)=>[...total,{value:ent._id,text:ent.nom}],[])}
									client={this.state.active_devis ? client: devis.client}
									/>

					<Button onClick={this._elementAdd}>Ajouter une élément</Button>
				<br/>
				Nouvel élément:
				<div style={{width:"100%",display:"flex",flexDirection:"column" }}>
					<div style={{display:"flex",flexDirection:"row"}}>
						<div style={{flex:1}}>ID</div>
						<div style={{flex:4}}>Libellé</div>
						<div style={{flex:1}}>Prix</div>
						<div style={{flex:1}}>numerique</div>
						<div style={{flex:1}}></div>
						<div style={{width:"30px"}}></div>
					</div>
					{
						elements.map(
							(element,i)=>{
								let active_element = element._id===this.state.active_element
								return <Element 
										active = {active_element}
										key = {i}
										_id = {element._id}
										libelle = {active_element ? libelle: element.libelle}
										prix = {active_element ? prix: element.prix}
										numerique = {active_element ? numerique:element.numerique}
											onClose = {this._elementClose}
											onEdit = {this._elementEdit}
											onSave = {this._elementSave}
											onDel = {this._elementDel}
											onCopy = {this._elementCopy}
											onChange = {this._elementControle} 
											onLogique = {this._logiqueAdd}
										logiques = {logiques.reduce((total,logique,j)=>{
											let active_logique = logique._id===this.state.active_logique
											return element._id===logique.element_id?[...total,<Logique 
																prix_log={active_logique?prix_log:logique.prix_log}
																libelle_log={active_logique?libelle_log:logique.libelle_log}
																numerique_log={active_logique?numerique_log:logique.numerique_log}
																key={j} 
																active={active_logique}
																_id = {logique._id}
																element_id = {logique.element_id}
																onClose = {this._logiqueClose}
																onEdit = {this._logiqueEdit}
																onSave = {this._logiqueSave}
																onDel = {this._logiqueDel}
																onCopy = {this._logiqueCopy}
																onChange = {this._logiqueControle} 
																/>]:total},[])}
									/>}
						)
					}
				</div>
				
			</div>
		);
	}
}

function mapStateToProps( state ){
	return (
		{
			active_user: state.user.active_user,
			element_controle: state.element.controle,
			elements: state.element.got.data,
			devis_controle: state.devis.controle,
			devis: state.devis.got1.data,
			deviss: state.devis.got.data,
			logiques: state.logique.got.data,
			logique_controle: state.logique.controle,
			entreprises: state.entreprise.got.data,
		}
	);

}

function mapDispatchToProps(dispatch){
	return bindActionCreators({
			devisGet1: devis.get1,
			devisControle: devis.controle,
			devisPost: devis.post,
			devisGet: devis.get,
			devisUp: devis.up,
			devisDel: devis.del,

			elementControle: element.controle,
			elementPost: element.post,
			elementGet: element.get,
			elementUp: element.up,
			elementDel: element.del,

			logiqueControle: logique.controle,
			logiquePost: logique.post,
			logiqueGet: logique.get,
			logiqueUp: logique.up,
			logiqueDel: logique.del,
			
			entrepriseGet: entreprise.get,

	}, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( Devis );
