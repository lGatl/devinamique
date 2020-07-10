import React, { Component } from 'react';



import { 
	Input, 
	TextArea,
	ShortButton,
	Button,
	Dropdown,
	Checkbox
} from '../../_common/4_dumbComponent';

import { dateToFormat } from '../../8_libs';

export default class DevisCard extends Component {

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
				? !checked
				: value;

			onChange({ [name]: value });
	}
	render() {
			let {titre,entreprise,client,date,_id, onChange, active} = this.props;
			client = typeof client === "string"?client:"";
			entreprise = typeof entreprise === "string"?entreprise:"",
			client = typeof client === "string"?client:"";

			onChange = typeof onChange === "function" ? onChange : false ;


		return (
			<div style={{
				 
				display:"flex", 
				flexDirection:"column", 
				backgroundColor:"rgba(14,243,55,0.5)",
				margin:5,
				borderRadius:10,
				overflow:"hidden"
			}}
			>
				<div  style={{flex:1, display:"flex", flexDirection:"row"}}>
						<div onClick = {this._onEdit} style={{flex:1, display:"flex", justifyContent:"center",alignItems:"center",cursor:active?"default":"pointer",height:"50px"}}>
							
							
						<div style={{flex:1, display:"flex", justifyContent:"center",alignItems:"center"}}>
							
								ID
							
						</div>
						<div style={{flex:1, display:"flex", justifyContent:"center",alignItems:"center"}}>
							
								{dateToFormat(new Date(date))}
							
						</div>
						
						<div style={{flex:4, display:"flex", justifyContent:"center",alignItems:"center",padding:"0px 5px"}}>
								{titre}
						</div>
						<div style={{flex:1, display:"flex", justifyContent:"center",alignItems:"center",padding:"0px 5px"}}>
								{entreprise}
						</div>
						
						
					
					<div style={{flex:1, display:"flex", justifyContent:"center", alignItems:"center", padding:"0px 5px"}}>
						{client}
					</div>
					</div>
					<div style={{width:"30px", display:"flex", flexDirection:"column", justifyContent:"space-between"}}>
						{active?<ShortButton
							style={{backgroundColor:"red"}}
							onClick={this._onClose}
						>x
						</ShortButton>: <div style={{flex:1}}></div>
						}
						<ShortButton
							style={{backgroundColor:"blue"}}
							onClick={()=>{}}
						>+
						</ShortButton>
					</div>

				</div>
				<div style={{flex:1, display:"flex", justifyContent:"center",alignItems:"center"}}>
								
						{active?
							<ShortButton
								style={{backgroundColor:"red"}}
								onClick={this._onDel}
							>U
							</ShortButton>:""}
							
							{active?
								<ShortButton
								style={{backgroundColor:"blue"}}
								onClick={this._onOpen}
							>Editer
							</ShortButton>:""
						}
						</div>
		</div>
			
		);
	}
}
	
