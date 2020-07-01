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

class DevisEdit extends Component {

	render(){
		let { active_user, active_devis, active_element,active_logique, 
			devis,
			devis_controle,element_controle,logique_controle, 
			elements, logiques,entreprises } = this.props;

			logiques = typeof logiques !== undefined && typeof logiques === "object" && logiques instanceof Array ? logiques:[]
	
			let { libelle,prix,numerique } = element_controle;
			let { titre,entreprise,client } = devis_controle;
			let { libelle_log,prix_log,numerique_log } = logique_controle;

		return (
				<div style={{ display:"flex", flexDirection:"column", flex:1,boxShadow: "1px 1px 12px #555",zIndex:100, backgroundColor:"white", minHeight:"100%"}}>
						Creez un devis dynamique
						<DevisForm
										active = {active_devis}
										_id = {devis._id}
										onClose = {this.props.devisClose}
										onEdit = {this.props.devisEdit}
										onSave = {this.props.devisSave}
										onDel = {this.props.devisDel}
										onCopy = {this.props.devisCopy}
										onChange = {this.props.devisChange} 
										titre = {active_devis ? titre: devis.titre}
										entreprise = {active_devis ? entreprise: devis.entreprise}
										options = {entreprises.reduce((total,ent)=>[...total,{value:ent._id,text:ent.nom}],[])}
										client = {active_devis ? client: devis.client}
										/>

						<Button onClick={this.props.elementAdd}>Ajouter une élément</Button>
					<br/>
					Nouvel élément:
					<div style={{width:"100%",display:"flex",flexDirection:"column" }}>
						<div style={{display:"flex",flexDirection:"row"}}>
							<div style={{flex:1}}>ID</div>
							<div style={{flex:4}}>Libellé</div>
							<div style={{flex:1}}>Prix</div>
							<div style={{flex:1}}>numerique</div>
							<div style={{flex:1}}></div>
							<div style={{width:"50px"}}></div>
						</div>
						{
							elements.map(
								(element,i)=>{
									
									return <Element 
										active = {element._id===active_element}
										key = {i}
										id = {i}
										_id = {element._id}
										libelle = {element._id===active_element ? libelle: element.libelle}
										prix = {element._id===active_element ? prix: element.prix}
										numerique = {element._id===active_element ? numerique:element.numerique}
										onClose = {this.props.elementClose}
										onEdit = {this.props.elementEdit}
										onSave = {this.props.elementSave}
										onDel = {this.props.elementDel}
										onCopy = {this.props.elementCopy}
										onChange = {this.props.elementChange} 
										onLogique = {this.props.logiqueAdd}
										logiques = {logiques.reduce((total,logique,j)=>{
											return element._id===logique.element_id?[...total,<Logique 
												prix_log={logique._id===active_logique?prix_log:logique.prix_log}
												libelle_log={logique._id===active_logique?libelle_log:logique.libelle_log}
												numerique_log={logique._id===active_logique?numerique_log:logique.numerique_log}
												key={j} 
												active={logique._id===active_logique}
												_id = {logique._id}
												element_id = {logique.element_id}
												onClose = {this.props.logiqueClose}
												onEdit = {this.props.logiqueEdit}
												onSave = {this.props.logiqueSave}
												onDel = {this.props.logiqueDel}
												onCopy = {this.props.logiqueCopy}
												onChange = {this.props.logiqueChange} 
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
		}
	);

}

function mapDispatchToProps(dispatch){
	return bindActionCreators({

	}, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( DevisEdit );
