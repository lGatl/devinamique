import React, {Component} from 'react';

import { bindActionCreators }	from 'redux';
import { connect } from 'react-redux';

import { devis, element, logique, entreprise } from '../../6_actions';

import { 
	Element,
	Logique,
	Button,
	DevisForm,
	Dropable
} from '../4_dumbComponent';

class ElementDisplay extends Component {

	render(){
		let { elements } = this.props;

		return (
				<div style={{ 
					display:"flex", 
				flexDirection:"column", 
				flex:1,
				boxShadow: "1px 1px 12px #555",
				zIndex:100, 
				backgroundColor:"white", 
				minHeight:"100%"}}>
					
					<div style={{
						width:"100%",
						display:"flex",
						flexDirection:"column" }}>
						<div style={{display:"flex",flexDirection:"row"}}>
							<div style={{flex:1}}>ID</div>
							<div style={{flex:4}}>Libellé</div>
							<div style={{flex:1}}>Prix</div>
							<div style={{flex:1}}>numerique</div>
							<div style={{flex:1}}></div>
							<div style={{width:"50px"}}></div>
						</div>
						<Dropable 
								id={0} 
								active = {draged}
								onMouseUp={this.props.dropableMouseUp}
								/>
						{
							elements_F.map(
								(element,i)=>{
									element.logiques = typeof element.logiques !== undefined && typeof element.logiques === "object" && element.logiques instanceof Array && element.logiques.length>0 ? 
									element.logiques.reduce((total,elo)=>logiques.find(logq=>logq._id===elo)?[...total,logiques.find(logq=>logq._id===elo)]:total,[]):[]

									return <div key = {i} style={{display:"flex",  flexDirection:"column" }}>
									<Element 
										active = {element._id===active_element}
										id = {i}
										_id = {element._id}
										libelle = {element._id===active_element ? libelle: element.libelle}
										prix = {element._id===active_element ? prix: element.prix}
										numerique = {element._id===active_element ? numerique:element.numerique}
										onShowLogq = {this.props.onShowLogq}
										show_logq ={element._id===this.props.show_logq}
										dragDrop = {this.props.dragDrop}
										onClose = {this.props.elementClose}
										onEdit = {this.props.elementEdit}
										onSave = {this.props.elementSave}
										onDel = {this.props.elementDel}
										onCopy = {this.props.elementCopy}
										onChange = {this.props.elementChange} 
										onLogique = {this.props.logiqueAdd}
										logiques = {logiques.reduce((total,logique,j)=>{
											return element._id===logique.element_id?[...total,<Logique 
												error1={logique.error1}
												error2={logique.error2}
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
								/>
								<Dropable 
								id={i+1} 
								active = {draged}
								onMouseUp={this.props.dropableMouseUp}
								/>
								</div>
							}
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

export default connect( mapStateToProps, mapDispatchToProps )( ElementDisplay );
