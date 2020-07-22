import React, { Component } from 'react';

import { 
	Dropdown,
	Checkbox,
	Input,
	Button
} from '../../_common/4_dumbComponent';

import { dateToFormat } from '../../8_libs';

export default class DevisDynamique extends Component {

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
			let {entreprise, client,devis, elements, choice_controle, dsactif, prix_total} = this.props;
			entreprise=typeof entreprise !== "undefined" && typeof entreprise === "object"?entreprise:{};
			let {nom,telephone,courriel,adresse,site_internet,siret,tva_intracom}=entreprise;

			
		return (
			<div style={{
				transition:"0.5s",
				display:"flex", 
				flexDirection:"column", 
				flex:1,
				alignItems:this.props.menu===2?"center":"start",
				overflow:"scroll",
				position: this.props.menu===2?"default":"relative",
				zIndex:50,
				...this.props.style
			}}
			>
				{/*adresse de l'entreprise*/}
				<div style={{display:"flex",width:"100%",flexDirection:"row"}}>
				<div style={{display:"flex",flex:1,justifyContent:"space-between",marginTop:10}}>
					<div style={{display:"flex", flexDirection:"column",alignItems:"center", flex:1}}>
							<span style={{fontSize:"26px"}}>
								Composez votre devis :
							</span>
							<span style={{fontSize:"18px"}}>
								{devis.titre}
							</span>
						</div>
				</div>
				</div>
				<div style={{display:"flex",width:"100%",flexDirection:"row"}}>
				<div style={{display:"flex",flex:1,padding:"5px",border:"1px solid black",marginTop:20}}>
					<span style={{flex:5}}>prestation</span>
					<span style={{flex:1}}>choix</span>
				</div>
				</div>
				<div style={{display:"flex",width:"100%",flexDirection:"row"}}>
				<div style={{border:"1px solid black",width:"100%",borderTop:"none"}}>
				{elements.map((element,i)=><div key={i} style={{display:"flex",padding:"2px 5px",borderTop:"none" }}>
					<span style={{flex:5}}>{element.libelle}</span>
					
					<div style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center"}}>	
						{!element.numerique?<Checkbox
									label = ""
									name = {element._id}
									checked = { choice_controle[element._id]||false }
									onChange = {this._onChange }
									active = {dsactif}
								/>: <Input
											style={{width:40}}
											min="0"
											type="number"
											label=""
											placeholder=""
											name={element._id}
											onChange={this._onChange}
											value={choice_controle[element._id]}
											active={dsactif}
										/>}
					</div>
				</div>)}
				</div>
				</div>
				
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
				
					
		</div>
			
		);
	}
}
	
