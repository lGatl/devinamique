import React, {Component} from 'react';

import { bindActionCreators }	from 'redux';
import { connect } from 'react-redux';

import { 
	Button, Entreprise
} from '../_common/4_dumbComponent';

import { entreprise,controle } from '../6_actions';

class MonEntreprise extends Component {
	constructor(props){
		super(props)
		/*PASSER DANS LES CONTROLE POUR ACTIVER L4EDITION LORS DE L'AJOUT => ajout dans reducer => _id dans active_*/
		
		this._entrepriseControle = this._entrepriseControle.bind(this)
		this._onEdit = this._onEdit.bind(this)
		this._onSave = this._onSave.bind(this)
		this._onClose = this._onClose.bind(this)
		this._onDel = this._onDel.bind(this)
		this._onCopy = this._onCopy.bind(this)
		
	}
	init(){
		return{
			adresse:"",
			courriel:"",
			nom:"",
			siret:"",
			site_internet:"",
			telephone:"",
			tva_intracom:""

		}
	}
	componentDidMount() {
		let { user_id } = this.props;

		this.props.entrepriseGet({data:{user_id:user_id}})
	}
	_entrepriseControle(obj) {
		
			let { entrepriseControle } = this.props;

			entrepriseControle(obj);
	}

	_onEdit({_id,adresse,courriel,nom,siret,site_internet,telephone,tva_intracom}){
		let { entrepriseControle, set } = this.props;

			entrepriseControle({_id,adresse,courriel,nom,siret,site_internet,telephone,tva_intracom});
			set({active_entreprise:_id})
	}
	_onSave(){

		let { active_user } = this.props;
		let { entrepriseUp } = this.props;
		let { controle,set } = this.props;
		entrepriseUp({data:{...controle}});
		set({active_entreprise:-1})
	}
	_onClose(){
		let { set } = this.props;
		set({active_entreprise:-1})
	}
	_onAdd(){
		let { active_user, entreprises } = this.props;
		let { entreprisePost, entrepriseControle, set } = this.props;
		let { controle } = this.props;
		entreprisePost({data:{...this.init(),user_id:active_user._id},cbk:(_id)=>{
			console.log(_id)
			set({active_entreprise:_id})
		}});
		entrepriseControle(this.init());
	}
	_onDel({_id}){

		let { entrepriseDel } = this.props;
		entrepriseDel({data:{_id}});
	}
	_onCopy({_id,adresse,courriel,nom,siret,site_internet,telephone,tva_intracom}){
		let { active_user, entreprises } = this.props;
		let { entreprisePost, entrepriseControle,set } = this.props;
		let { controle } = this.props;
		let data = {adresse,courriel,nom,siret,site_internet,telephone,tva_intracom,user_id:active_user._id}
		
		entreprisePost({data,cbk:(_id)=>{
			entrepriseControle({...data})
			set({active_entreprise:_id})}});
		
	}

	render(){
		let { controle,set, entreprises,active_entreprise, seted} = this.props;
		entreprises = typeof entreprises !== undefined && entreprises !== null && typeof entreprises === "object" && entreprises instanceof Array?entreprises:[];
	
			let {adresse,courriel,nom,siret,site_internet,telephone,tva_intracom} = controle;
		
			return (
				<div style={{ display:"flex", flexDirection:"column", width:"100%",height:"100%"}}>
					<Button onClick={this._onAdd.bind(this)}>Ajouter une entreprise</Button>
					<div style={{ display:"flex", flexDirection:"row", flexWrap:"wrap", overflowY:"auto", justifyContent:"center"}}>
						{
							entreprises.map((entreprise,i)=>{
								let active = seted.active_entreprise === entreprise._id?true:false
								return <Entreprise
									active = {active}
									key={i}
									_id={entreprise._id}
									onClose = {this._onClose}
									onEdit = {this._onEdit}
									onSave = {this._onSave}
									onDel = {this._onDel}
									onCopy = {this._onCopy}
									onChange = {this._entrepriseControle} 
									adresse ={active ? adresse: entreprise.adresse}
									courriel={active ? courriel: entreprise.courriel}
									nom={active ? nom: entreprise.nom}
									siret={active ? siret: entreprise.siret}
									site_internet={active ? site_internet: entreprise.site_internet}
									telephone={active ? telephone: entreprise.telephone}
									tva_intracom={active ? tva_intracom: entreprise.tva_intracom}/>}).reverse()
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
			controle: state.entreprise.controle,
			entreprises: state.entreprise.got.data,
			seted: state.entreprise.seted
		}
	);

}

function mapDispatchToProps(dispatch){
	return bindActionCreators(
		{

			entrepriseControle: entreprise.controle,
			entreprisePost: entreprise.post,
			entrepriseGet: entreprise.get,
			entrepriseUp: entreprise.up,
			entrepriseDel: entreprise.del,
			set: entreprise.set,
		 
		},
		dispatch
	);
}

export default connect( mapStateToProps, mapDispatchToProps )( MonEntreprise );
