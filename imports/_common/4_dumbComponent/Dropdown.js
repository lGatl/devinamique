import React, {Component} from "react";





export default class Dropdown extends Component {
	constructor(){
		super();
		this.state = {
			show:false,
			hover:null
		};
		this.setWrapperRef = this.setWrapperRef.bind(this);           
		this.handleClickOutside = this.handleClickOutside.bind(this);
	}
	style(){
		return{
			s_container:{
				margin:5,
				display:"flex",
				alignItems:"stretch",
				flexDirection:"column",
				flex:1
			},
			s_label:{
				textAlign: "center",
				margin:5,
				display:"block",
			},
			s_content:{
				position:"relative",
				cursor:"pointer",
				margin:5,
				minWidth:100,
				background:"rgba(250,250,250,1)",
			},
			s_choice:{
				color:this.props.value.length>0?"rgba(0,0,0,1)":"rgba(0,0,0,0.5)",
				padding:5,
				borderRadius:this.state.show ? "5px 5px 0 0" : 5,
				fontSize:14,
				minHeight:32,
				border: "1px solid rgba(150,150,150,0.5)",
				borderBottom:this.state.show ? "none" : "1px solid rgba(150,150,150,0.5)",
				boxShadow: "1px 1px 1px rgba(150,150,150,0.3)",
			},
			s_fleche:{
				float:"right",
				paddingLeft:5,
				paddingRight:5,
				fontSize:15,
				transition:"0.2s",
				transform: this.state.show?"rotate(-90deg)":"rotate(0deg)",
			},
			s_lignes:{
				position:"absolute",
				zIndex:9999,
				left:0,
				width:"100%",
				top:"100%",
				borderRadius:"0 0 5px 5px",
				fontSize:14,
				border: "1px solid rgba(150,150,150,0.5)",
				borderTop:"none",
				boxShadow: "1px 1px 1px rgba(150,150,150,0.3)",
				background:"rgba(250,250,250,1)",
				boxSizing: "border-box",
				display:this.state.show ? "block" : "none",
			},
			s_ligne:{

				background:"white",
				padding:5,
				borderTop:"1px solid rgba(150,150,150,0.1)",
			}
		};
	}
	componentDidMount() {
		document.addEventListener('mousedown', this.handleClickOutside);
		document.addEventListener('touchstart', this.handleClickOutside);
	}

	componentWillUnmount() {
		document.removeEventListener('mousedown', this.handleClickOutside);
		document.removeEventListener('touchstart', this.handleClickOutside);
	}

	setWrapperRef(node) {
		
		this.wrapperRef = node;
	}

	handleClickOutside(event) {
		if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
			this.setState({show:false});
		}else{}
	}
	clickin(){
		this.setState({show:!this.state.show});
	}
	onMouseOver(i){
		this.setState({hover:i});
	}
	onMouseOut(){
		this.setState({hover:null});
	}
	change(value,e){
		let { name, onChange} = this.props;
		this.setState({show:false});
		onChange({ name, value });
	}
	
	
	render(){
		let {s_container, s_label, s_content, s_lignes, s_ligne, s_choice, s_fleche} = this.style();
		let selected = this.props.options.find(opt=>opt.value==this.props.value);
		
		return (
			<div style={{...s_container, ...this.props.style}}>
				{this.props.label?<label style={s_label}>{this.props.label}</label>:""}
				{this.props.active?<div style={{...s_content }} ref={this.setWrapperRef} onClick={this.props.desactiver?()=>{}:this.clickin.bind(this)}>
									<div style={{...s_choice, ...this.props.style_choice}}>
										{//this.props.value.length>0?this.props.value:this.props.placeholder
											selected?selected.text?selected.text:selected.value:this.props.value?this.props.value:this.props.placeholder
										}
										<span style={{...s_fleche}}> {"<"} </span>
									</div>
									<div style={{...s_lignes}}   >
										{
											this.props.options.map((option,i)=><div 
												key = {i} 
												style={{...s_ligne,backgroundColor:this.state.hover==i?"rgba(0,0,0,0.1)":"rgba(0,0,0,0)",}} 
												onMouseOver = { this.onMouseOver.bind(this,i) } 
												onMouseOut={ this.onMouseOut.bind(this) }
												onClick={this.change.bind(this,option.value)}>{option.text}</div>)
										}
									</div>
								</div>: <div style={{paddingTop:10,paddingBottom:20}}>{selected&&selected.text?selected.text:""}</div>}
			</div>
			
		);
	}
}

