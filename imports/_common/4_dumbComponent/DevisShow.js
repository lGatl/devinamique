import React, { Component } from 'react';

import { 
	Dropdown,
	Checkbox,
	Input,
	Button
} from '../../_common/4_dumbComponent';

import { dateToFormat } from '../../8_libs';

export default class DevisShow extends Component {

	componentDidUpdate(prevProps, prevState) {
		
	}
	constructor(props){
		super(props)
		this._onEdit = this._onEdit.bind(this)
		this._onOpen = this._onOpen.bind(this)
		this._onSave = this._onSave.bind(this)
		this._onClose = this._onClose.bind(this)
		this._onDel = this._onDel.bind(this)
		this._onCopy = this._onCopy.bind(this)
		this._onChange = this._onChange.bind(this)
		
	}
	_onEdit(e) {
		let {  onEdit  } = this.props;
			onEdit({
			...this.props
		})
	}
	_onClose(e) {
		let { onClose  } = this.props;
			onClose({
			...this.props
		})
	}
	_onOpen(e) {
		let { onOpen  } = this.props;
			onOpen({
			...this.props
		})
	}
	_onSave(e) {
		let { onSave  } = this.props;
			onSave({
				...this.props
			})
	}
	_onDel(e) {
		let { onDel  } = this.props;
			onDel({
				...this.props
			})
	}
	_onCopy(e) {
		let { onCopy  } = this.props;
			onCopy({
				...this.props
			})
	}

	_onChange({ name, value, checked }) {

			let { onChange } = this.props;
		value =
			value === undefined && checked === undefined
				? !this.props[name]
				: value === undefined
				? !checked?1:0
				: value;

			onChange({ [name]: value });
	}
	render() {
			let {entreprise, client,devis, elements, choice_controle} = this.props;
			entreprise=typeof entreprise !== "undefined" && typeof entreprise === "object"?entreprise:{};
			let {nom,telephone,courriel,adresse,site_internet,siret,tva_intracom}=entreprise;

			let prix_total = elements.reduce((total,element,i)=>{
				let choice = choice_controle[element._id]
					
				 choice = typeof choice !== "undefined" && typeof choice === "boolean" && choice===true?1:
				 	typeof choice!== "undefined" && typeof choice === "boolean"&&choice===false?0:
					typeof choice!== "undefined" && typeof (choice*1) === "number"?choice:0;

				return total+choice* element.prix
						},0)
		return (
			<div style={{
				transition:"0.5s",
				boxShadow: "-1px 2px 10px 3px rgba(0, 0, 0, 0.3) inset",
				display:"flex", 
				flexDirection:"column", 
				flex:1,
				alignItems:this.props.menu===2?"center":"start",
				overflow:"scroll",
				position: this.props.menu===2?"default":"relative",
				zIndex:50,
			}}
			>

			<div style={{
			  height:120+1169+"px",
			  width:100+826+"px",
			  position: "absolute",
			
			}}>

			<div id="divToPrint">
				{/*adresse de l'entreprise*/}
				<div style={{display:"flex",width:"100%",justifyContent:"space-between"}}>
					<div style={{display:"flex", flexDirection:"column",alignItems:"flex-start"}}>
						<span>
							{nom}
						</span>
						<span>
							{telephone}
						</span>
						<a href={courriel}>
							{courriel}
						</a>
						{adresse?adresse.split(/\n/).map((str,i)=><span key={i}>{str}</span>):""}
					</div>
					<div style={{display:"flex", flexDirection:"column",alignItems:"flex-end"}}>
						<span>siret : {typeof siret === "string"?siret.slice(0,3)+" "+siret.slice(3,6)+" "+siret.slice(6,9)+" "+siret.slice(9):""}</span>
						<span>TVA intracomm : {typeof tva_intracom === "string"? tva_intracom.slice(0,2)+" "+tva_intracom.slice(2,4)+" "+tva_intracom.slice(4):""}</span>
					</div>
				</div>
				<div style={{display:"flex",width:"100%",justifyContent:"space-between",marginTop:40}}>
					<div style={{display:"flex", flexDirection:"column",alignItems:"center", flex:1}}>
							<span style={{fontSize:"26px"}}>
								DEVIS
							</span>
							<span style={{fontSize:"18px"}}>
								{devis.titre}
							</span>
						</div>
					<div style={{display:"flex", flexDirection:"column",alignItems:"flex-start", flex:1, border:"1px solid black",padding:5}}>
							<span style={{marginBottom:"10px",fontSize:"16px"}}>
								le {"12/23/2334"}
							</span>
							<span>
								{client?client.nom:""}
							</span>
								{client?client.adresse.split(/\n/).map((str,i)=><span key={i}>{str}</span>):""}
					</div>
				</div>
				<div style={{display:"flex",padding:"5px",border:"1px solid black",marginTop:20}}>
					<span style={{flex:5}}>prestation</span>
					<span style={{flex:1}}>prix</span>
					<span style={{flex:1}}>choix</span>

				</div>
				{elements.map((element,i)=><div key={i} style={{display:"flex",padding:"5px",border:"1px solid black",borderTop:"none" }}>
					<span style={{flex:5}}>{element.libelle}</span>
					<span style={{flex:1}}>{element.prix}</span>
					<div style={{flex:1,display:"flex"}}>	
						{!element.numerique?<Checkbox
									label = ""
									name = {element._id}
									checked = { choice_controle[element._id]||false }
									onChange = {this._onChange }
									active = {true}
								/>: <Input
											style={{width:40}}
											min="0"
											type="number"
											label=""
											placeholder=""
											name={element._id}
											onChange={this._onChange}
											value={choice_controle[element._id]}
											active={true}
										/>}
					</div>
				</div>)}
				
			<div style={{display:"flex",width:"100%",justifyContent:"flex-end", marginTop:"10px"}}>
				<div style={{display:"flex",justifyContent:"space-between", flex:1}}>
					<div style={{display:"flex",flex:1, flexDirection:"column",alignItems:"flex-start",border:"1px solid black",padding:"5px"}}>
						<span>Prix</span>
					</div>
					<div style={{display:"flex",flex:1, flexDirection:"column",alignItems:"flex-end",border:"1px solid black",padding:"5px",borderLeft:"none"}}>
						<span>{prix_total} HT</span>
						<span>{prix_total} TTC</span>
					</div>
				</div>
				<div style={{display:"flex",flex:1,justifyContent:"space-between",marginLeft:"10px"}}>
					<div style={{display:"flex",flex:1, flexDirection:"column",alignItems:"flex-start",border:"1px solid black",padding:"5px"}}>
						<span>TVA</span>
					</div>
					<div style={{display:"flex",flex:1, flexDirection:"column",alignItems:"flex-end",border:"1px solid black",padding:"5px",borderLeft:"none"}}>
						<span>20% HT</span>
						<span>{prix_total*20/100} TTC</span>
					</div>
				</div>
			</div>

			<div style={{display:"flex",width:"100%",justifyContent:"space-between",flex:1}}>
			
			</div>
			<div style={{display:"flex",justifyContent:"space-between"}}>
					<div style={{display:"flex",flex:1, flexDirection:"column",alignItems:"flex-start",border:"1px solid black",padding:"5px"}}>
						<span>Coordonnées Bancaires</span>
					</div>
					<div style={{display:"flex",flex:1, flexDirection:"column",alignItems:"flex-end",border:"1px solid black",padding:"5px",borderLeft:"none"}}>
						<span>lkmk</span>
						<span>lkml</span>
					</div>
				</div>
			</div>
				
			</div>		
		</div>
			
		);
	}
}
	
