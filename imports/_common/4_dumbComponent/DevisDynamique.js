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
		this._onChange = this._onChange.bind(this)
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
			let {entreprise, client,devis, elements, choice_controle, dsactif, prix_total, edit} = this.props;
			entreprise=typeof entreprise !== "undefined" && typeof entreprise === "object"?entreprise:{};
			let {nom,telephone,courriel,adresse,site_internet,siret,tva_intracom}=entreprise;

			
		return (
			<div style={{
				transition:"0.5s",
				display:"flex", 
				flexDirection:"column", 
				alignItems:"center",
				minHeight:"100%",
				...this.props.style
			}}
			>
				<div style={{display:"flex", flexDirection:"column",alignItems:"center", width:"100%",maxWidth:800,flex:1}}>
					<div style={{alignItems:"center",width:"100%"}}>
						<span style={{fontSize:"18px",fontWeight:"bold"}}>
										{devis.titre}
						</span>
					</div>
					<div style={{width:"100%"}}>
						<div style={{display:"flex",flex:"1 1 auto",padding:"5px",border:"1px solid black",margin:"10px 10px 0px 10px"}}>
							{dsactif?<div style={{flex:"1 1 auto"}}><span style={{color:"rgb(200,200,200)"}}>ID</span></div>:""}
							<span style={{flex:"5 1 auto"}}>prestation</span>
							<div style={{flex:"1 1 auto"}}><span>choix</span></div>
						</div>
					</div>
			<div style={{width:"100%",flex:1}}>
				<div style={{border:"1px solid black",borderTop:"none",margin:"0px 10px 0px 10px"}}>
				{elements.map((element,i)=><div key={i} style={{fontSize:element.titre_lvl?((5*element.titre_lvl+14)+"px"):"14px",fontWeight:element.titre_lvl?(50*element.titre_lvl+400):"normal",display:"flex",padding:"2px 5px",borderTop:"none" }}>
					{dsactif?<div style={{flex:"1 1 auto"}}><span style={{color:"rgb(200,200,200)"}}>{i}</span></div>:""}
					<span style={{flex:5}}>{element.libelle}</span>
					<div style={{flex:"1 1 auto",display:"flex",alignItems:"center",justifyContent:"center"}}>	
						{!element.sans_interaction?!element.numerique?<Checkbox
									label = ""
									name = {element._id}
									checked = { choice_controle[element._id]||false }
									onChange = {this._onChange }
									active
								/>: <Input
											style={{width:40}}
											min="0"
											type="number"
											label=""
											placeholder=""
											name={element._id}
											onChange={this._onChange}
											value={choice_controle[element._id]}
											active
										/>:""}
					</div>
				</div>)}
				</div>
			</div>
				
			<div style={{width:"100%"}}>
				<div style={{display:"flex", padding:10,paddingBottom:0}}>
					<div style={{display:"flex",flex:1, flexDirection:"column",alignItems:"flex-start",border:"1px solid black",padding:"5px"}}>
						<span>Prix</span>
					</div>
					<div style={{display:"flex",flex:1, flexDirection:"column",alignItems:"flex-end",border:"1px solid black",padding:"5px",borderLeft:"none"}}>
						<span>{prix_total} HT</span>
						<span>{prix_total+prix_total*20/100} TTC</span>
					</div>
				</div>
				<div style={{display:"flex", padding:10,paddingTop:0}}>
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
					
		</div>
			
		);
	}
}
	
