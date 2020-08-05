import React, {Component} from 'react';

import { bindActionCreators }	from 'redux';
import { connect } from 'react-redux';

import { devis, choice, entreprise } from '../6_actions';

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
			active_devis:-1
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
		//
	}
	_devisDel({_id}){

		let { devisDel } = this.props;
		devisDel({data:{_id}});
	}
	_devisCopy({_id,libelle,prix,num}){
		/*let { active_user, deviss } = this.props;
		let { devisPost, devisControle } = this.props;
		let { controle } = this.props;
		devisPost({data:{libelle,prix,num,date:Date.now(),user:active_user._id}});*/
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
									onEdit={this._devisEdit}
									active = {active}
									titre={devis.titre}
									entreprise={entreprises.find(ent=>ent._id === devis.entreprise)?entreprises.find(ent=>ent._id === devis.entreprise).nom:""}
									client={entreprises.find(ent=>ent._id === devis.client)?entreprises.find(ent=>ent._id === devis.client).nom:""}
									date={devis.date}
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
			entreprises: state.entreprise.got.data,
		}
	);

}

function mapDispatchToProps(dispatch){
	return bindActionCreators({
			devisControle: devis.controle,
			devisPost: devis.post,
			devisGet: devis.get,
			devisUp: devis.up,
			devisDel: devis.del,

			entrepriseGet:entreprise.get,

			choicePost: choice.post,

	}, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( DevisList );
