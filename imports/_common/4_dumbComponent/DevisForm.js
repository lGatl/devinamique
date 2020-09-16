import React, { Component } from 'react';

import './element.css';

import { 
	Input, 
	TextArea,
	Button,
	ShortButton,
	Dropdown,
	Calendar,
	Checkbox
} from '../../_common/4_dumbComponent';


export default class DevisForm extends Component {
	constructor(props){
		super(props)
		this._onEdit = this._onEdit.bind(this)
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
			let {
				titre,entreprise,client,contractuel,options, tjm, unite,password, delais, unitedelais,faitle,
				onChange,
				active
			} = this.props;

		return (
			<div 
			style={{
				border:"solid 1px black",
				cursor:active?"default":"pointer",
				margin: 5, 
				borderRadius:"5px", 
				display:"flex", 
				flexDirection:"column",
				...this.props.style
			}}>
				<div onClick={!active?this._onEdit:()=>{}}
				style={{
					width:"100%"
				}}>
						<div 
						 style={{display:"flex", justifyContent:"flex-end", height: "40px" }}>
							{active?<ShortButton onClick={this._onClose}
							style={{width:"40px",height:"100%"}}>x</ShortButton>:""}
						</div>
						<div style={{display:"flex", flexDirection:"column",padding:5}}>
						<div style={{display:"flex", justifyContent:"center", alignItems:"center", flexWrap:"wrap"}}>
							<Input
							label="Titre"
							placeholder="Titre"
							name="titre"
							onChange={this._onChange}
							value={titre||""}
							active={active}
						/>
							<Calendar
							type="date"
							label="Fait le"
							name="faitle"
							onChange={this._onChange}
							value={faitle||""}
							active={active}
						/>
					
						</div>
						<div style={{display:"flex", justifyContent:"center", alignItems:"center", flexWrap:"wrap"}}>
						<Dropdown
							active={active}
			        label = "entreprise"
			        placeholder = "entreprise"
			        name = "entreprise"
			        onChange = { this._onChange } 
			        options = { options }
			        value = { entreprise||"" }
			      />
						<Dropdown
							active={active}
			        label = "client"
			        placeholder = "client"
			        name = "client"
			        onChange = { this._onChange } 
			        options = { options }
			        value = { client||"" }
			      />
			      <Checkbox
							label = "Contractuel"
							name = "contractuel"
							checked = { contractuel===undefined?false:contractuel }
							onChange = {this._onChange }
							active = {active}
						/>
						</div>
						<div style={{display:"flex", justifyContent:"space-around", alignItems:"center",marginTop:10, flexWrap:"wrap"}}>
			      

						<Input
							style={{ width:80}}
							type="number"
							min="0"
							label="prix d'une unitée"
							placeholder="480"
							name="tjm"
							onChange={this._onChange}
							value={tjm||""}
							active = {active}
						/>

						<Input
							style={{ width:80}}
							label="Unite"
							placeholder="1/2 jour"
							name="unite"
							onChange={this._onChange}
							value={unite||""}
							active={active}
						/>
						<Input
							style={{ width:80}}
							step="0.01"
							type="number"
							min="0"
							label="Multiplicateur de delais"
							placeholder="1"
							name="delais"
							onChange={this._onChange}
							value={delais}
							active = {active}
						/>
						<Input
							style={{flex:1, maxWidth:80}}
							label="Unite du delais"
							placeholder="mois"
							name="unitedelais"
							onChange={this._onChange}
							value={unitedelais||""}
							active={active}
						/>
						
						</div>
						<div style={{display:"flex", justifyContent:"space-around", alignItems:"center",marginTop:10, flexWrap:"wrap"}}>

						
						<Input
							style={{flex:1, maxWidth:80}}
							label="Password"
							placeholder=""
							name="password"
							onChange={this._onChange}
							value={password||""}
							active={active}
						/>
						</div>
						</div>
				
						
					</div>
					{active?<Button style={{minHeight:28}}
							onClick={this._onSave}
							>Sauvegarder</Button>:""}
					</div>
			
		);
	}
}
	
