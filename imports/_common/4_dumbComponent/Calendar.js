import React,{ Component } 	from "react";

export default class Calendar extends Component{
	constructor(){
		super();
		this.setWrapperRef = this.setWrapperRef.bind(this);           
		this.handleClickOutside = this.handleClickOutside.bind(this);
		this.state = {
			show:false,
			jour:0,
			mois:0,
			annee:0,
			hover:null
		};
	}
	componentDidMount() {
		document.addEventListener('mousedown', this.handleClickOutside);
		document.addEventListener('touchstart', this.handleClickOutside);
		this.setState ( {
			jour:new Date(this.props.value!=0?this.props.value:Date.now()).getDate(),
			mois:new Date(this.props.value!=0?this.props.value:Date.now()).getMonth(),
			annee:new Date(this.props.value!=0?this.props.value:Date.now()).getFullYear()
		});
	}

	componentWillUnmount() {
		document.removeEventListener('mousedown', this.handleClickOutside);
		document.removeEventListener('touchstart', this.handleClickOutside);
	}
	style() {
		return {
			container:{

			}
		};
	}
	setWrapperRef(node) {
		
		this.wrapperRef = node;
	}

	handleClickOutside(event) {
		if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
			this.setState({show:false});
		}else{}
	}
	show(){
		this.setState({show:!this.state.show});
	}
	annee(a){
		this.setState ({annee:this.state.annee+a});
	}
	mois(a){
		this.setState ({mois:(this.state.mois+a)>11?0:(this.state.mois+a)<0?11:(this.state.mois+a),
			annee:(this.state.mois+a)>11?(this.state.annee+1):(this.state.mois+a)<0?(this.state.annee-1):this.state.annee});
	}
	moisMot(mois){
		let mots = ["janvier","fevrier","mars","avril","mai","juin","juillet","aout","septembre","octobre","novembre","decembre"];
		return mots[mois];
	}
	onMouseOver(i){
		this.setState({hover:i});
	}
	onMouseOut(){
		this.setState({hover:null});
	}
	change(value,e){

		let {mois,annee} = this.state;
		let { name, onChange} = this.props;
		if(value!=""){

			//this.setState({show:false});
			onChange({ name, value:(Date.parse(new Date(annee,mois,value))) });
		}
	}
	render(){
		
		var LaDate = this.props.value?new Date(this.props.value):new Date (Date.now())
		let {jour,mois,annee} = this.state;
		
		let date1 = new Date (annee, mois);
		let date2 = new Date (annee, mois+1);

		let nbjmois = Math.round((date2 - date1)/(3600000*24)); 
		var mois_aff=[[]];
		var sem = 0;
		for(let i = 0; i < nbjmois; i++){
			mois_aff[sem].push(i+1);
			if(new Date(annee,mois,i+1).getDay()==0){
				mois_aff.push([]);
				sem++;
			}
		}
		if(mois_aff[0].length<7){
			let taille=mois_aff[0].length;


			for(let i = 0; i < (7-taille); i++){
				mois_aff[0].unshift("");
			}
		}

		if(mois_aff[mois_aff.length-1].length<7){
			let taille = mois_aff[mois_aff.length-1].length;
			for(let i = 0; i < (7-taille); i++){
				mois_aff[mois_aff.length-1].push("");
			}
		}
		return (
			<div ref={this.setWrapperRef}>
				<div onClick={this.show.bind(this)} style={{width:200, position:"relative",cursor:"pointer"}}>{this.props.label}{LaDate.getDate()+"/"+(LaDate.getMonth()+1)+"/"+LaDate.getFullYear()}</div>
				<div style={{
					width:200, 
					borderRadius:5,
					boxShadow: "1px 1px 1px rgba(150,150,150,0.3)", 
					display:this.state.show?"flex":"none", 
					flexDirection:"column",
					position:"absolute",
					background:"rgba(250,250,250,1)",
					zIndex:98
				}}>
					<div style={{ display:"flex"}}>
						<span onClick={this.annee.bind(this,-1)} style={{
							float:"right",
							paddingLeft:5,
							paddingRight:5,
							fontSize:15,
							cursor:"pointer",
							transform: "rotate(180deg)",
						}}> ^ </span>
						<div style={{flex:1, textAlign:"center"}}>{annee}</div> 
						<span onClick={this.annee.bind(this,1)} style={{
							float:"right",
							paddingLeft:5,
							paddingRight:5,
							fontSize:15,
							cursor:"pointer",
						}}> ^ </span>
					</div>
					<div style={{ display:"flex"}}>
						<span onClick={this.mois.bind(this,-1)} style={{
							float:"right",
							paddingLeft:5,
							paddingRight:5,
							fontSize:15,
							cursor:"pointer",
							transform: "rotate(180deg)",
						}}> ^ </span>
						<div style={{flex:1, textAlign:"center"}}>{this.moisMot(mois)}</div> 
						<span onClick={this.mois.bind(this,1)} style={{
							float:"right",
							paddingLeft:5,
							paddingRight:5,
							fontSize:15,
							cursor:"pointer",
						}}> ^ </span>
					</div>
					<div style={{ display:"flex", flexWrap:"wrap"}}>
						{	
							<table style={{width:"100%"}}>
								<thead>
									<tr style={{display:"flex"}}>
										{["l","ma","me","j","v","s","d"].map((jds,i)=><th key={i} style={{flex:1, textAlign:"center"}}>{jds}</th>)}
									</tr>
								</thead>
								<tbody>
									{mois_aff.map((sem,i)=><tr key={i} style={{display:"flex"}}>
										{sem.map((lejour,j)=><td 
											key={j}
											onMouseOver = { this.onMouseOver.bind(this,"sem"+i+"jour"+j) }  
											onMouseOut={ this.onMouseOut.bind(this) }
											onClick={this.change.bind(this,lejour)}
											style={{
												flex:1, 
												textAlign:"center", 
												cursor:"pointer",
												backgroundColor:this.state.annee==new Date(this.props.value).getFullYear()&&
												this.state.mois==new Date(this.props.value).getMonth()&&
												lejour==new Date(this.props.value).getDate()?"rgba(100,0,0,0.4)":
													this.state.hover==("sem"+i+"jour"+j)&&lejour!=""?
														"rgba(0,0,0,0.1)":"rgba(0,0,0,0)"
											}}>{lejour}</td>)}
									</tr>)}
								</tbody>
							</table>
						}
					</div>
				</div>
			</div>
			);
	}
}





