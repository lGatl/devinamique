import React, { Component } from 'react';

import './element.css';

import { 
	Input, 
	TextArea,
	Button,
	ShortButton,
	Dropdown
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
				titre,entreprise,client,options,
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
						DEVIS
						<div style={{display:"flex", justifyContent:"center", alignItems:"center",marginTop:30}}>
							<Input
							label="Titre"
							placeholder="Titre"
							name="titre"
							onChange={this._onChange}
							value={titre||""}
							active={active}
						/>
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
						</div>
						
				
						
					</div>
					{active?<Button
							onClick={this._onSave}
							>Sauvegarder</Button>:""}
					</div>
			
		);
	}
}
	
