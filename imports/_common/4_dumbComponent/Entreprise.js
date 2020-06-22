import React, { Component } from 'react';

import './element.css';

import { 
	Input, 
	TextArea,
	Button,
	ShortButton
} from '../../_common/4_dumbComponent';


export default class Entreprise extends Component {
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
				adresse,courriel,nom,siret,site_internet,telephone,tva_intracom,
				onChange,
				active
			} = this.props;
		return (
			<div 
			style={{
				border:"solid 1px black",
				cursor:active?"default":"pointer",
				overflow:"hidden",
				margin: 5, 
				borderRadius:"5px", 
				width:"400px",
				height:"400px",
				display:"flex", 
				flexDirection:"column"
			}}>
				<div onClick={!active?this._onEdit:()=>{}}
				style={{
					width:"100%",
					flex:1,
					display:"flex", 
					flexDirection:"column"
				}}>
						<div 
						 style={{display:"flex", justifyContent:"flex-end", height: "40px" }}>
							{active?<ShortButton onClick={this._onClose}
							style={{width:"40px",height:"100%"}}>x</ShortButton>:""}
						</div>
						<Input
							label="Nom"
							placeholder="Nom"
							name="nom"
							onChange={this._onChange}
							value={nom||""}
							active={active}
						/>
						<Input
							label="Téléphone"
							placeholder="Téléphone"
							name="telephone"
							onChange={this._onChange}
							value={telephone||""}
							active={active}
						/>
						<Input
							label="Courriel"
							placeholder="Courriel"
							name="courriel"
							onChange={this._onChange}
							value={courriel||""}
							active={active}
						/>
						<TextArea
							label="Adresse"
							placeholder="Adresse"
							name="adresse"
							onChange={this._onChange}
							value={adresse||""}
							active={active}
						/>
						<Input
							label="Site Internet"
							placeholder="Site internet"
							name="site_internet"
							onChange={this._onChange}
							value={site_internet||""}
							active={active}
						/>
						<Input
							label="Siret"
							placeholder="Siret"
							name="siret"
							onChange={this._onChange}
							value={siret||""}
							active={active}
						/>
						<Input
							label="Tva intracom"
							placeholder="Tva intracom"
							name="tva_intracom"
							onChange={this._onChange}
							value={tva_intracom||""}
							active={active}
						/>
						
					</div>
					{active?<Button
							onClick={this._onSave}
							>Sauvegarder</Button>: <div style={{display:"flex"}}><Button
							onClick={this._onDel}
							>U</Button><Button
							onClick={this._onCopy}
							>+</Button></div>}
					</div>
			
		);
	}
}
	
