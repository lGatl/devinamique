import React, { Component } from 'react';

import './element.css';

import { 
	Input, 
	TextArea,
	ShortButton,
	Button,
	Dropdown,
	Checkbox
} from '../../_common/4_dumbComponent';


export default class Element extends Component {

	constructor(props){
		super(props)
		this._onEdit = this._onEdit.bind(this)
		this._onSave = this._onSave.bind(this)
		this._onClose = this._onClose.bind(this)
		this._onDel = this._onDel.bind(this)
		this._onCopy = this._onCopy.bind(this)
		this._onChange = this._onChange.bind(this)
		this._onLogique = this._onLogique.bind(this)
	}
	_onLogique(e) {
		let {  onLogique  } = this.props;
			onLogique({
			...this.props
		})
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
				? !checked
				: value;
			onChange({ [name]: value });
	}
	
	render() {
			let {libelle,prix, logiques, numerique, onChange, active,id} = this.props;
			logiques = typeof logiques === "object" && logiques instanceof Array?logiques:[];
			onChange = typeof onChange === "function" ? onChange : false ;
			
		return (
			<div style={{
				flex:1, 
				display:"flex", 
				flexDirection:"column", 
				backgroundColor:"rgba(14,243,55,0.5)",
				margin:5,
				borderRadius:10,
				


			}}
			>
				<div style={{flex:1, display:"flex", flexDirection:"row"}}>
					<div onClick = {this._onEdit} style={{flex:7, display:"flex", flexDirection:"row", cursor:active?"default":"pointer"}}>
							<div style={{flex:1, display:"flex", alignItems:"center",justifyContent:"center"}}>
							<div>
								{id}
							</div>
							
						</div>
						
						<div style={{flex:4, display:"flex", alignItems:"center",padding:"0px 5px"}}>
								<Input
									label=""
									placeholder="Libellé"
									name="libelle"
									onChange={this._onChange}
									value={libelle}
									active = {active}
								/>
						</div>
						<div style={{flex:1, display:"flex", alignItems:"center",padding:"0px 5px"}}>
								<Input
									type="number"
									min="0"
									label=""
									placeholder="Prix"
									name="prix"
									onChange={this._onChange}
									value={prix}
									active = {active}
								/>
						</div>
						
						<div style={{flex:1,display:"flex", justifyContent:"center"}}>
							<Checkbox
									label = ""
									name = "numerique"
									checked = { numerique }
									onChange = {this._onChange }
									active = {active}
								/>
						</div>
					
					</div>
						<div style={{flex: 1,display:"flex",justifyContent:"center",alignItems:"center"}}>
							<ShortButton
								style={{ minHeight:40}}
								onClick={this._onLogique}
							> <span> + logique</span>
							</ShortButton>

					</div>
					<div style={{width:"50px", display:"flex", flexDirection:"column", justifyContent:"space-between", marginLeft:5}}>
						{active?<ShortButton
							style={{backgroundColor:"red",height:50}}
							onClick={this._onClose}
						>x
						</ShortButton>: <div style={{height:"50px"}}></div>}
						
						{!active?<ShortButton
							style={{backgroundColor:"blue",height:50}}
							onClick={()=>{}}
						>+
						</ShortButton>: <div style={{height:"50px"}}></div>}
						
					</div>

				</div>
				{active?<div style={{display:"flex"}}><Button
							onClick={this._onDel}
							>U</Button><Button
							onClick={this._onSave}
							>Sauvegarder</Button></div>:"" }
				<div style={{flex:1, display:"flex", flexDirection:"row"}}>
					<div style={{flex:1}}>
						
					</div>

					<div style={{flex:7}}>
						{logiques.map((logique)=>logique)}
					</div>
				
				</div>
				
		</div>
			
		);
	}
}
	
