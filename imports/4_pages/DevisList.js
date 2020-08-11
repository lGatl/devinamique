import React, {Component} from 'react';

import { bindActionCreators }	from 'redux';
import { connect } from 'react-redux';

import { devis, choice, entreprise, element, logique } from '../6_actions';

import { 
	DevisCard,
	Logique,
	Button
} from '../_common/4_dumbComponent';

import history from "../../history";


class DevisList extends Component {
	constructor(){
		super()
		this.state = {
		/*PASSER DANS LES CONTROLE POUR ACTIVER L4EDITION LORS DE L'AJOUT => ajout dans reducer => _id dans active_*/
		/*ici change la route sur devis/_id*/
			active_devis:-1,
			copy:false
		}
		this._devisControle = this._devisControle.bind(this)
		this._devisEdit = this._devisEdit.bind(this)
		this._devisSave = this._devisSave.bind(this)
		this._devisClose = this._devisClose.bind(this)
		this._devisDel = this._devisDel.bind(this)
		this._devisOpen = this._devisOpen.bind(this)
		this._devisCopy = this._devisCopy.bind(this)
	}

		init(){
		return{

      elements:"",
    }
	}
	componentDidMount() {

		let { user_id, devisGet, entrepriseGet } = this.props;
		if(typeof user_id === "string"){
			devisGet({data:{user_id:user_id}})
			entrepriseGet({data:{user_id:user_id}})
		}
	}

	componentDidUpdate(prevProps, prevState){
		let { elements, choice, devis, logiques, newchoice,
			devis_loading, elements_loading, logiques_loading,choice_loading, newchoice_loading,
			elementPost, elementUp, logiquePost, devisUp,choiceUp } = this.props;
		let { copy } = this.state;

		devis = devis !== undefined && typeof devis === "object" && Object.keys(devis).length > 0 ? {...devis} :false
		choice = choice !== undefined && typeof choice === "object" && Object.keys(choice).length > 0 ? {...choice} :false
		newchoice = newchoice !== undefined && typeof newchoice === "object" && Object.keys(newchoice).length > 0 ? {...newchoice} :false
		elements = elements !== undefined && typeof elements === "object" && elements instanceof Array ? [...elements]:false
		logiques = logiques !== undefined && typeof logiques === "object" && logiques instanceof Array ? [...logiques]:false

		if(devis && elements && logiques && choice && newchoice &&
			 !devis_loading && !elements_loading && !logiques_loading && !choice_loading && !newchoice_loading && copy===true){
			
			this.setState({copy:false})
			let annvelt = {}
			let annvlog = {}
			elements.forEach((element,i)=>{
				element = element !== undefined && typeof element === "object" && Object.keys(element).length > 0 ? {...element} :false
				if(element){
					let _id = element._id
					delete element._id
					delete element.created_at
					elementPost({data:{...element,devis_id:devis._id},cbk:(_nvid)=>{
						annvelt = {...annvelt,[_id]:_nvid}
						
						if(i === (elements.length-1)){
							logiques.forEach((logique,j)=>{
									logique = logique !== undefined && typeof logique === "object" && Object.keys(logique).length > 0 ? {...logique} :false
									if(logique){
										let _idlog = logique._id
										delete logique._id
										delete logique.created_at
										logiquePost({data:{...logique,devis_id:devis._id,element_id:annvelt[logique.element_id]},cbk:(_newidlog)=>{
											annvlog = {...annvlog,[_idlog]:_newidlog}
											if(j === (logiques.length-1)){

												elements.forEach((elemento,l)=>{
													let tablogiques = [...elemento.logiques]
													tablogiques = tablogiques.length>0?tablogiques.reduce((ttotal,eltt,k)=>[...ttotal,annvlog[eltt]],[]):tablogiques;
													elementUp({data:{...elemento,_id:annvelt[elemento._id],devis_id:devis._id,logiques:[...tablogiques]}})
												})
											}
										}})
									}
							})		
							let delts = devis.elements !== undefined && typeof devis.elements === "object" && devis.elements instanceof Array ? [...devis.elements]:false
							if(delts){
								delts = delts.map(delt=>annvelt[delt])
								devisUp({data:{...devis, elements:[...delts]}})
							}

							let celts = choice.elements !== undefined && typeof choice.elements === "object" && Object.keys(choice.elements).length > 0 ? {...choice.elements}:false
							if(celts){
								celts = Object.keys(celts).reduce((total,celtkey)=>{return annvelt[celtkey]?{...total,[annvelt[celtkey]]:celts[celtkey]}:{...total}},{})

								choiceUp({data:{ ...newchoice, elements:{...celts}}})
							}
						}
					}})
				}
			})

		}
	}

	_devisControle(obj) {
		
			let { devisControle } = this.props;

			devisControle(obj);
	}
	_devisEdit({_id}){
			
			this.setState({active_devis:_id})
	}
	

	_devisOpen({_id}){
		
		history.push("/devis/"+_id+"/edit")
						
	}

	_devisSave(){
		let { active_user } = this.props;
		let { devisUp } = this.props;
		let { controle } = this.props;
		devisUp({data:{...controle}});
		this.setState({active_devis:-1})
	}
	_devisClose(){

		this.setState({active_devis:-1})
	}
	_devisAdd(){

		let { active_user, deviss } = this.props;
		let { devisPost, devisControle, choicePost } = this.props;
		let { controle } = this.props;
		devisPost({data:{...this.init(),user_id:active_user._id,contractuel:false},cbk:(_id)=>{
			choicePost({data:{user_id:active_user._id,devis_id:_id}})
			history.push("/devis/"+_id+"/edit")
		}});
		//devisControle(this.init());
	}
	_devisDel({_id}){

		let { devisDel, elementDel,logiqueDel, choiceDel } = this.props;
		devisDel({data:{_id}});
		elementDel({data:{devis_id:_id}})
		logiqueDel({data:{devis_id:_id}})
		choiceDel({data:{devis_id:_id}})
	}
	_devisCopy({_id}){
		let { active_user, deviss } = this.props;
		let { devisPost, devisControle, elementGet, logiqueGet, choiceGet1, devisGet1, choicePost } = this.props;

		let { controle } = this.props;

		let devis = deviss.find(devis=>devis._id === _id)

		devis = devis !== undefined && typeof devis === "object" && Object.keys(devis).length > 0 ?{...devis}:false
		let did = devis._id
		if(devis){
			delete devis._id
			delete devis.created_at
			this.setState({copy:true})

			devisPost({data:{...devis},cbk:(_id)=>{
				devisGet1({data:{_id}})
				choicePost({data:{user_id:active_user._id,devis_id:_id,elements:{}},cbk:(_idc)=>{
					choiceGet1({data:{_id:_idc},instate:"newchoice"})
				}})
			}})
			elementGet({data:{devis_id:did}})
			logiqueGet({data:{devis_id:did}})
			choiceGet1({data:{devis_id:did}})
		}

	}
	render(){
		let { active_user, deviss, entreprises } = this.props;
		let { devis_controle } = this.props;
		let { logique_controle } = this.props;
	
		let { libelle,prix,num } = devis_controle;
		
		return (
			<div style={{ display:"flex", flexDirection:"column",justifyContent:"flex-start", width:"100%",height:"100%", backgroundColor:"white"}}>
					Devis
					
					<Button style={{marginBottom:"45px"}} onClick={this._devisAdd.bind(this)}>Ajouter un devis</Button>
				<div style={{width:"100%",display:"flex",flexDirection:"column" }}>
					<div style={{display:"flex",flexDirection:"row"}}>
						<div style={{flex:1}}>ID</div>
						<div style={{flex:1}}>Date</div>
						<div style={{flex:4}}>Libellé</div>
						<div style={{flex:1}}>Entreprise</div>
						<div style={{flex:1}}>Client</div>
						<div style={{width:"30px"}}></div>
					</div>
					{
						deviss.map(
							(devis,i)=>{
								let active = this.state.active_devis === devis._id?true:false
								
								return <DevisCard 
									onOpen = {this._devisOpen}
									onDel = {this._devisDel}
									onClose = {this._devisClose}
									onCopy = {this._devisCopy}
									onEdit={this._devisEdit}
									active = {active}
									titre={devis.titre}
									entreprise={entreprises.find(ent=>ent._id === devis.entreprise)?entreprises.find(ent=>ent._id === devis.entreprise).nom:""}
									client={entreprises.find(ent=>ent._id === devis.client)?entreprises.find(ent=>ent._id === devis.client).nom:""}
									created_at={devis.created_at}
									key={i}
									_id={devis._id}
									/>}
						).reverse()
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
			devis_controle: state.devis.controle,
			deviss: state.devis.got.data,
			devis: state.devis.got1.data,
			devis_loading: state.devis.got1.data_loading,
			entreprises: state.entreprise.got.data,
			entreprises_loading: state.entreprise.got.data_loading,
			elements: state.element.got.data,
			elements_loading: state.element.got.data_loading,
			logiques: state.logique.got.data,
			logiques_loading: state.logique.got.data_loading,
			choice: state.choice.got1.data,
			choice_loading: state.choice.got1.data_loading,
			newchoice: state.choice.got1.newchoice,
			newchoice_loading: state.choice.got1.newchoice_loading,
		}
	);

}

function mapDispatchToProps(dispatch){
	return bindActionCreators({
			devisControle: devis.controle,
			devisPost: devis.post,
			devisGet: devis.get,
			devisGet1: devis.get1,
			devisUp: devis.up,
			devisDel: devis.del,

			elementGet:element.get,
			elementUp:element.up,
			elementDel:element.del,
			elementPost:element.post,
			logiqueGet:logique.get,
			logiqueDel:logique.del,
			logiquePost:logique.post,
			entrepriseGet:entreprise.get,

			choicePost: choice.post,
			choiceDel: choice.del,
			choiceUp: choice.up,

			choiceGet1: choice.get1

	}, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( DevisList );
