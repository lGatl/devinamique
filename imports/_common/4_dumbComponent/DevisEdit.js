import React, {Component} from 'react';

import { bindActionCreators }	from 'redux';
import { connect } from 'react-redux';

import { devis, element, logique, entreprise } from '../../6_actions';

import { 
	Element,
	ElementDyn,
	Logique,
	LogiqueDD,
	Button,
	DevisForm,
	Dropable
} from '../4_dumbComponent';

class DevisEdit extends Component {
	
	render(){
		let { active_user, active_devis, active_element,active_logique,draged, 
			devis,devis_controle,element_controle,logique_controle, 
			elements, logiques,entreprises } = this.props;
		let {controleSet,view1,view2} = this.props

			logiques = typeof logiques !== undefined && typeof logiques === "object" && logiques instanceof Array ? logiques:[]
	
			let { libelle,prix,numerique, dynamique,sans_interaction,titre_lvl } = element_controle;
			let { titre,entreprise,client,contractuel, tjm, unite, unitedelais,faitle, password, delais} = devis_controle;
			let { libelle_log,prix_log,numerique_log } = logique_controle;

			let D_elements = elements.filter(elt=>elt.dynamique===true)
			let F_elements = elements.filter(elt=>elt.dynamique!==true)

		return (
				<div style={{ 
					display:"flex", 
				flexDirection:"column", 
				flex:1,
				boxShadow: "1px 1px 12px #555",
				zIndex:100, 
				backgroundColor:"rgba(230,230,230)",
				height:"100%",
				alignItems:"center"
				}}>
						<span style={{fontWeight:"bold",fontSize:"20px"}}>Informations :</span>
						<DevisForm
							style={{
								width:"100%",
								boxSizing: "border-box",
								height:"auto",
								flex:view1 ===0? 0:1,
								transition: "0.3s",
								overflowY:"scroll",
								backgroundColor:"white"
							}}
							active = {active_devis}
							_id = {devis?devis._id:""}
							onClose = {this.props.devisClose}
							onEdit = {this.props.devisEdit}
							onSave = {this.props.devisSave}
							onDel = {this.props.devisDel}
							onCopy = {this.props.devisCopy}
							onChange = {this.props.devisChange} 
							titre = {active_devis ? titre : devis?devis.titre:""}
							entreprise = {active_devis ? entreprise: devis?devis.entreprise:""}
							options = {entreprises.reduce((total,ent)=>[...total,{value:ent._id,text:ent.nom}],[])}
							client = {active_devis ? client: devis?devis.client:""}
							contractuel = {active_devis ? contractuel: devis?devis.contractuel:false}
							tjm = {active_devis ? tjm : devis?devis.tjm:""}
							delais = {active_devis ? delais : devis?devis.delais:""}
							password = {active_devis ? password : devis?devis.password:""}
							unite = {active_devis ? unite : devis?devis.unite:""}
							unitedelais = {active_devis ? unitedelais : devis?devis.unitedelais:""}
							faitle = {active_devis ? faitle : devis?devis.faitle:""}
							/>

					
					<div style={{display:"flex", justifyContent:"space-between",width:"100%", alignItems:"center",backgroundColor:"rgba(230,230,230)"}}>
					<div className="imgbutt" onClick={()=>{
							view1===1?controleSet({view1:2}):controleSet({view1:1})
						}}> {"v"} 
					</div>
						<div style={{flex:1, display:"flex", justifyContent:"center"}}><span style={{fontWeight:"bold",fontSize:"20px",display:"flex"}}>Devis dynamique:</span></div>
						<div className="imgbutt" onClick={()=>{
							
							view1===1?controleSet({view1:0}):controleSet({view1:1})
						}
						}> {"^"} 
					</div>
					</div>
					<div style={{
									
						flex:view2 ===2||view1 ===2? 0:1,
						overflowY:"hidden",
						transition: "0.3s",
						width:"100%",
						display:"flex",
						flexDirection:"column" }}>
						
						<Button  onClick={this.props.elementAdd} dynamique= {true}><span>Ajouter une élément</span></Button>
						<div style={{display:"flex",flexDirection:"row", paddingLeft:12,paddingRight:17,backgroundColor:"white",minHeight:22}}>
							<div style={{flex:1,overflow:"hidden",height:26}}>ID</div>
							<div style={{flex:7,display:"flex",flexDirection:"row",height:"100%"}}>
								<div style={{height:"100%",flex:4,overflow:"hidden",padding:"0px 5px",wightSpace:"nowrap",wordWrap: "keepall-word"}}>Libellé</div>
								<div style={{height:"100%",flex:1,overflow:"hidden",padding:"0px 5px",wightSpace:"nowrap",wordWrap: "keepall-word"}}>Titre</div>
								<div style={{height:"100%",flex:1,overflow:"hidden",padding:"0px 5px",wightSpace:"nowrap",wordWrap: "keepall-word",textDecoration: "line-through"}}>Interaction</div>
								<div style={{height:"100%",flex:1,overflow:"visible",padding:"0px 5px",wightSpace:"nowrap",wordWrap: "keepall-word"}}>  Numerique</div>		
							</div>
							<div style={{width:"50px"}}></div>
							<div style={{width:"50px"}}></div>
						</div>
						<div ref={this.props.scroll1Ref} style={{height:"100%",overflowY:"scroll",paddingBottom:50,backgroundColor:"white"}} >
						<Dropable 
								id={0} 
								active = {draged}
								dynamique={true}
								onMouseUp={this.props.dropableMouseUp}
								/>
						{
							D_elements.map(
								(element,i)=>{
									element.logiques = typeof element.logiques !== undefined && typeof element.logiques === "object" && element.logiques instanceof Array && element.logiques.length>0 ? 
									element.logiques.reduce((total,elo)=>logiques.find(logq=>logq._id===elo)?[...total,logiques.find(logq=>logq._id===elo)]:total,[]):[]

									return <div key = {i} style={{
										display:"flex",  
										flexDirection:"column", 
										fontSize:element.titre_lvl?((5*element.titre_lvl+14)+"px"):"14px",
										fontWeight:element.titre_lvl?(50*element.titre_lvl+400):"normal", }}>
									<ElementDyn 
										active = {element._id===active_element}
										id = {element.id}
										_id = {element._id}
										dynamique = {element.dynamique}
										libelle = {element._id===active_element ? libelle: element.libelle}
										prix = {element._id===active_element ? prix: element.prix}
										titre_lvl = {element._id===active_element ? titre_lvl: element.titre_lvl}
										numerique = {element._id===active_element ? numerique:element.numerique}
										sans_interaction = {element._id===active_element ? sans_interaction:element.sans_interaction}
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
											return element._id===logique.element_id?[...total,<LogiqueDD
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
								dynamique={true}
								onMouseUp={this.props.dropableMouseUp}
								/>
								</div>
							}
							)
						}
					</div>
					</div>

					<div style={{display:"flex", justifyContent:"space-between",width:"100%", alignItems:"center",backgroundColor:"rgba(230,230,230)"}}>
					<div className="imgbutt" onClick={()=>{
						view2===1?controleSet({view2:0}):controleSet({view2:1})
					}}> {"v"} </div>
					<div style={{flex:1, display:"flex", justifyContent:"center"}}><span style={{fontWeight:"bold",fontSize:"20px",display:"flex"}}>Devis Final:</span></div>
						<div className="imgbutt" onClick={()=>{
						view2===1?controleSet({view2:2}):controleSet({view2:1})
					}}> {"^"} </div>
					</div>
					<div style={{
						width:"100%",
						height:"auto",
						flex:view2 ===0? 0:1,
						transition: "0.3s",
						overflowY:"hidden",
						display:"flex",
						flexDirection:"column" }}>
						<Button style={{height:26}} onClick={this.props.elementAdd}>Ajouter une élément</Button>
						<div style={{display:"flex",flexDirection:"row", paddingLeft:15,paddingRight:20,backgroundColor:"white",minHeight:22}}>
							<div style={{flex:1,overflow:"hidden"}}>ID</div>
							<div style={{flex:8,display:"flex",flexDirection:"row",height:26}}>
								<div style={{height:"100%",flex:4,overflow:"hidden",padding:"0px 5px",wightSpace:"nowrap",wordWrap: "keepall-word"}}>Libellé</div>
								<div style={{height:"100%",flex:1,overflow:"hidden",padding:"0px 5px",wightSpace:"nowrap",wordWrap: "keepall-word"}}>{devis.unite}</div>
								<div style={{height:"100%",flex:1,overflow:"hidden",padding:"0px 5px",wightSpace:"nowrap",wordWrap: "keepall-word"}}>Titre</div>
								<div style={{height:"100%",flex:1,overflow:"hidden",padding:"0px 5px",wightSpace:"nowrap",wordWrap: "keepall-word",textDecoration: "line-through"}}>Interaction</div>
								<div style={{height:"100%",flex:1,overflow:"visible",padding:"0px 5px",wightSpace:"nowrap",wordWrap: "keepall-word"}}>Numerique</div>		
							</div>
							
							<div style={{width:"50px"}}></div>
							<div style={{width:"50px"}}></div>
						</div>
						<div ref={this.props.scroll2Ref} style={{height:"100%",overflowY:"scroll",paddingBottom:50,backgroundColor:"white"}} >
						<Dropable 
								id={D_elements.length} 
								active = {draged}
								dynamique={false}
								onMouseUp={this.props.dropableMouseUp}
								/>
						{
							F_elements.filter(elt=>elt.dynamique!==true).map(
								(element,i)=>{
									element.logiques = typeof element.logiques !== undefined && typeof element.logiques === "object" && element.logiques instanceof Array && element.logiques.length>0 ? 
									element.logiques.reduce((total,elo)=>logiques.find(logq=>logq._id===elo)?[...total,logiques.find(logq=>logq._id===elo)]:total,[]):[]

									return <div key = {i} style={{
										display:"flex",  
										flexDirection:"column", 
										fontSize:element.titre_lvl?((5*element.titre_lvl+14)+"px"):"14px",
										fontWeight:element.titre_lvl?(50*element.titre_lvl+400):"normal", }}>
									<Element 
										active = {element._id===active_element}
										id = {element.id}
										_id = {element._id}
										libelle = {element._id===active_element ? libelle: element.libelle}
										prix = {element._id===active_element ? prix: element.prix}
										titre_lvl = {element._id===active_element ? titre_lvl: element.titre_lvl}
										numerique = {element._id===active_element ? numerique:element.numerique}
										sans_interaction = {element._id===active_element ? sans_interaction:element.sans_interaction}
										dynamique = {element.dynamique}
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
								id={D_elements.length+1+i} 
								active = {draged}
								dynamique={false}
								onMouseUp={this.props.dropableMouseUp}
								/>
								</div>
							}
							)
						}
					</div>
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
