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
		this._dragDrop = this._dragDrop.bind(this)
		this._onShowLogq = this._onShowLogq.bind(this)
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
	_dragDrop(event) {
		let {  dragDrop  } = this.props;
			dragDrop({
			...this.props
		,event})
	}
	_onEdit(e) {
		let {  onEdit  } = this.props;
			onEdit({
			...this.props
		})
	
	}
	_onShowLogq(e) {
		let {  onShowLogq  } = this.props;
			onShowLogq({
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
			let {libelle,prix, logiques, numerique, sans_interaction, titre_lvl, onChange, active,id, show_logq} = this.props;
			logiques = typeof logiques === "object" && logiques instanceof Array?logiques:[];
			onChange = typeof onChange === "function" ? onChange : false ;
			
		return (
			<div style={{
				flex:1, 
				display:"flex", 
				flexDirection:"column", 
				backgroundColor:"rgba(14,243,55,0.5)",
				margin:"0px 5px",
				padding:5,
				borderRadius:10,
				


			}}
			>
				<div style={{flex:1, display:"flex", flexDirection:"row", margin:5}} >
					<div style={{flex:8, display:"flex", flexDirection:"row", cursor:active?"default":"pointer"}}>
							<div 
							onMouseDown = {this._dragDrop} 
							onTouchStart ={this._dragDrop} 
							style={{flex:1, display:"flex", alignItems:"center",justifyContent:"center",cursor:"grab"}}>
							<div>
								{id}
							</div>
							
						</div>
						<div onClick= {this._onEdit} style={{flex:8, display:"flex", alignItems:"center"}}>
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
										step="0.01"
										type="number"
										min="0"
										label=""
										placeholder="1"
										name="prix"
										onChange={this._onChange}
										value={prix}
										active = {active}
									/>
							</div>
							<div style={{flex:1, display:"flex", alignItems:"center",padding:"0px 5px"}}>
									<Input
										type="number"
										min="0"
										label=""
										placeholder="1"
										name="titre_lvl"
										onChange={this._onChange}
										value={titre_lvl}
										active = {active}
									/>
							</div>
							<div style={{flex:1,display:"flex", justifyContent:"center",padding:"0px 5px"}}>
								<Checkbox
										label = ""
										name = "sans_interaction"
										checked = { sans_interaction }
										onChange = {this._onChange }
										active = {active}
									/>
						</div>
							<div style={{flex:1,display:"flex", justifyContent:"center",padding:"0px 5px"}}>
								<Checkbox
										label = ""
										name = "numerique"
										checked = { numerique }
										onChange = {this._onChange }
										active = {active}
									/>
						</div>
						</div>
					</div>
						<div style={{width:"50px",display:"flex",justifyContent:"center",alignItems:"center"}}>
							<ShortButton
								style={{ minHeight:40, color:"black",backgroundColor:"rgb(150,200,150)"}}
								onClick={this._onLogique}
							> <span>?</span>
							</ShortButton>

					</div>
					<div style={{width:"50px", display:"flex", flexDirection:"column", justifyContent:"space-between", marginLeft:5}}>
						{active?<ShortButton
							style={{backgroundColor:"gray",height:50}}
							onClick={this._onClose}
						>x
						</ShortButton>: ""}
						
						{!active?<ShortButton
							style={{backgroundColor:"rgb(100,100,255)",height:50}}
							onClick={this._onCopy}
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
				{logiques.length?<div style={{flex:1, display:"flex", flexDirection:"row"}}>
					<div onClick={this._onShowLogq} style={{flex:1,display:"flex", justifyContent:"center", cursor:"pointer"}}>
						<div>{show_logq?"v":">"}</div>
					</div>
					<div style={{
							flex:7,
							overflowY:show_logq?"hidden": "auto",
							maxHeight:show_logq?"100%": "95px",
							boxShadow: show_logq?"none":"-1px 2px 10px 3px rgba(0, 0, 0, 0.3) inset"}}>
							{logiques.map((logique)=>logique)}
						</div>
				
				</div>:""}
				
		</div>
			
		);
	}
}
	
