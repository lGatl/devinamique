import React, { Component } from 'react';

import './logique.css';

import { 
	Input, 
	TextArea,
	Button,
	ShortButton,
	Dropdown,
	Checkbox
} from '../../_common/4_dumbComponent';


export default class Logique extends Component {

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
		let {libelle_log,prix_log, logiques, numerique_log, onChange, active, error1,error2} = this.props;
		
		return (
			<div style={{
				flex:1,
				display:"flex", 
				flexDirection:"row", 
				alignItems:"center",
				margin:"5px 5px",
				borderRadius:10
			}}>
						<div style={{display:"flex", flexDirection:"column",flex:1}}>
						<div style={{display:"flex", flexDirection:"row",flex:1, backgroundColor:"rgb(150,200,150)"}}>
							<div onClick = {this._onEdit} style={{flex:1, display:"flex", flexDirection:"row", cursor:active?"default":"pointer"}}>
							<div style={{flex:4, display:"flex", alignItems:"center",padding:"0px 5px"}}>
							si
							<Input
								style={{backgroundColor:error2?"red":error1?"orange":"rgba(0,0,0,0)"}}
								label=""
								placeholder="Libellé"
								name="libelle_log"
								onChange={this._onChange}
								value={libelle_log}
								active = {active}
							/>
						</div>
						<div style={{flex:1, display:"flex", alignItems:"center",padding:"0px 5px"}}>
							<Input
								type="number"
								min="0"
								label=""
								placeholder="Prix"
								name="prix_log"
								onChange={this._onChange}
								value={prix_log}
								active = {active}
							/>
						</div>
						
						<div style={{flex:1,display:"flex", alignItems:"center",padding:"0px 5px"}}>
							<Input
									type="number"
									min="0"
									label=""
									placeholder="nb"
									name="numerique_log"
									onChange={this._onChange}
									value={numerique_log}
									active = {active}
								/>
						</div>
						<div style={{flex:1}}>
								 
						</div>
						</div>
						<div style={{width:"50px", display:"flex", flexDirection:"column", justifyContent:"space-between"}}>
						{active?<ShortButton
							style={{backgroundColor:"gray",height:50}}
							onClick={this._onClose}
						>x
						</ShortButton>:""}
						
						{!active?<ShortButton
							style={{backgroundColor:"rgb(100,100,255)",height:50}}
							onClick={()=>{}}
						>+
						</ShortButton>: ""}
						
					</div>
					
					
					
				</div>
					{active?<div style={{display:"flex"}}><Button
							style={{backgroundColor:"red"}}
							onClick={this._onDel}
							>
								<img src="/image/trash.png" style={{width:30, height:30}} alt=""/>
							</Button><Button
							style={{backgroundColor:"aqua"}}
							onClick={this._onSave}
							>
								<img src="/image/floppy.png" style={{width:30, height:30}} alt=""/>
							</Button></div>:"" }	
					
					
			
				

			</div>
			</div>
		);
	}
}
	
