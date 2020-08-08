import React, {Component} from 'react';

import { bindActionCreators }	from 'redux';
import { connect } from 'react-redux';

import { devis, element, logique, entreprise, choice, user, controle } from '../../6_actions';

import { 
	TextArea,
	Button,
	Checkbox,
	Poppup
} from '../../_common/4_dumbComponent';

	const BDD = ["devis", "element", "logique", "entreprise", "choice", "user"]
	const COMMON_ACTION = ["Controle","Get1","Get","Post","Up","Del" ]
	const USER_ACTION = ["creeCompte","logIn","logOut","getActiveUser"]
	const NR = {
		devisGet1: devis.get1,
		devisControle: devis.controle,
		devisPost: devis.post,
		devisGet: devis.get,
		devisUp: devis.up,
		devisDel: devis.del,

		elementsGet1: element.get1,
		elementControle: element.controle,
		elementPost: element.post,
		elementGet: element.get,
		elementUp: element.up,
		elementDel: element.del,

		logiqueGet1: logique.get1,
		logiqueControle: logique.controle,
		logiquePost: logique.post,
		logiqueGet: logique.get,
		logiqueUp: logique.up,
		logiqueDel: logique.del,

		entrepriseGet1: entreprise.get1,
		entrepriseControle: entreprise.controle,
		entreprisePost: entreprise.post,
		entrepriseGet: entreprise.get,
		entrepriseUp: entreprise.up,
		entrepriseDel: entreprise.del,

		choiceGet1: choice.get1,
		choiceControle: choice.controle,
		choicePost: choice.post,
		choiceGet: choice.get,
		choiceUp: choice.up,
		choiceDel: choice.del,

		userGet1: user.get1,
		userControle: user.controle,
		userPost: user.post,
		userGet: user.get,
		userUp: user.up,
		userDel: user.del,
		userControle: user.controle,
		creeCompte: user.creeCompte,
		getActiveUser: user.getActiveUser,
		userLogIn: user.logIn,
		logOut: user.logOut,
	}

class Admin extends Component {
	constructor(){
		super()
		this.state = {bdd:"devis",action:"Get",data:"{}",show:"",wrap:false,dispached:true, poppup:false, ssl:'{"sort":{"created_at":1},"skip":0,"limit":50}'}
		this._onChange = this._onChange.bind(this) 
		this._submit = this._submit.bind(this) 
		this._annule = this._annule.bind(this)
		this._submit2 = this._submit2.bind(this)
	}

	_onChange({ name, value, checked }) {
			let { onChange } = this.props;
		value =
			value === undefined && checked === undefined
				? !this.props[name]
				: value === undefined
				? !checked
				: value;

			this.setState({ [name]: value });
	}
	LigneComp(ligne,wrap,arr,j){
		return ligne.indexOf(":")>-1 ? 
				<div key={j} style = {{whiteSpace:wrap?"normal":"nowrap",marginLeft:arr.length*30, boxSizing:"border-box"}}>
					<span style = {{wordBreak: "break-all", color:"green"}}>{ligne.split(":")[0]}</span>
					<span style={{ wordBreak: "break-all"}}>:{ligne.split(":")[1]}</span>
				</div>
				:
				<span style = {{whiteSpace:wrap?"normal":"nowrap",wordBreak: "break-all", marginLeft:arr.length*30}}key={j}>{ligne}</span>
	}
	pretty(str){
		if(str){
			let {wrap} = this.state
			let star = str.split("")
			let strf = []
			let arr = []
			let dcote = []
			let ligne = ""
			let nb = 0
			let LigneComp = {}
			let j = 0

			star.forEach((l,i)=>{
				
				if( ['"'].indexOf(l)>-1){
					if(dcote.length>0){
						dcote.pop()
					}else{
						dcote.push(l)
					}
				}
				
				if( ["]","}",")"].indexOf(l)>-1&&dcote.length===0){
					strf.push(this.LigneComp(ligne,wrap,arr,j))
					arr.pop()
					ligne = ""
					j++
				}
			
				ligne = ligne + l
				if( ["[","(","{"].indexOf(l)>-1&&dcote.length===0){
					strf.push(this.LigneComp(ligne,wrap,arr,j))
					j++
					arr.push(l)
					if(arr.length === 2){
						nb++
					}
					ligne = ""
				}else if( [","].indexOf(l)>-1&&dcote.length===0){
					
					strf.push(this.LigneComp(ligne,wrap,arr,j))
					j++
					ligne = ""
				}
			})
			if(strf.length <1){
				strf = [<span style = {{whiteSpace:wrap?"normal":"nowrap",marginLeft:arr.length*30}}key={1}>{str}</span>]
			}
			return [<span style = {{whiteSpace:wrap?"normal":"nowrap",marginLeft:arr.length*30}}key={"la"+0}>nb : {nb}</span>,...strf]

		}else{
			return []
		}
		
	}
	_submit(){
		let {bdd,action,data, dispached,ssl} = this.state
		let ok = true

		if(["Post","Up","Del"].indexOf(action)>-1){
			ok = false
			this.setState({poppup:true})
		}
		if(ok){
			if(!dispached){
				NR[bdd+action]({data:JSON.parse(data),ssl:JSON.parse(ssl),cbk:(res)=>{
					this.setState({show:JSON.stringify(res)})
				}})()
			}else{


				this.props[bdd+action]({data:JSON.parse(data),ssl:JSON.parse(ssl),cbk:(res)=>{
					this.setState({show:JSON.stringify(res)})
				}})
			}
		}
	}
	_submit2(){
		let {bdd,action,data, dispached} = this.state
			this.setState({poppup:false})
			if(!dispached){
				NR[bdd+action]({data:JSON.parse(data),cbk:(res)=>{
					this.setState({show:JSON.stringify(res)})
				}})()
			}else{
				this.props[bdd+action]({data:JSON.parse(data),cbk:(res)=>{
					this.setState({show:JSON.stringify(res)})
				}})
			}
	}
	_annule(){
		this.setState({poppup:false})
	}
	render(){
		let {active_user} = this.props;
		let {bdd,action,data, show, wrap, dispached, ssl} = this.state

		let active_user_admin = active_user !== undefined && typeof active_user === "object" && Object.keys(active_user).length>0 && 
		active_user.roles !== undefined && typeof active_user.roles === "object" && active_user.roles instanceof Array && 
		active_user.roles.indexOf("admin")>-1

		return (

			active_user_admin?
			<div style={{ width:"100%",height:"100%",display:"flex", alignItems:"center",flexDirection:"column"}}>
				<Poppup
	        open={this.state.poppup}
	        style={{overflow:"hidden"}}
	        >
	        sur???
	        <div style={{flex:1}}></div>
	        <div style={{display:"flex"}} >
		        <Button style={{marginRight:10,backgroundColor:"red"}} onClick={this._annule}>NON</Button>
		        <Button style={{marginLeft:10}}onClick={this._submit2}>{bdd+action+ (dispached?"":" not dispached")}</Button>
	        </div>
	       
	      </Poppup>
				<div style={{ width:"100%",display:"flex", alignItems:"center"}}>
					{BDD.map((bdd,i)=><Button onClick={()=>{this.setState({bdd})}} style={{flex:1}} key = {i}>{bdd}</Button>)}
				</div>
				
				<div style={{ width:"100%",display:"flex", alignItems:"center"}}>
						{
							bdd==="user"?[...COMMON_ACTION].map((action,i)=><Button onClick={()=>{this.setState({action})}} style={{flex:1}} key = {i}>{action}</Button>):
							[...COMMON_ACTION].map((action,i)=><Button onClick={()=>{this.setState({action})}} style={{flex:1}} key = {i}>{action}</Button>)
						}
				</div>
				
				<div style={{ width:"100%",height:"100%", overflow:"hidden",flex:1,display:"flex", alignItems:"center"}}>

					<div style={{width:"50%",height:"100%",display:"flex",flexDirection:"column"}}>
						<div style={{ width:"100%",display:"flex", alignItems:"center"}}>
						<div>{bdd}</div>
						<div>{action}</div>
						<Checkbox
								label = "dispached"
								name = "dispached"
								checked = { dispached===undefined?false:dispached }
								onChange = {this._onChange }
								active = {true}
							/>
					</div>
						<TextArea
							style={{flex:1,width:"100%"}}
							style_ta={{height:"100%",width:"100%"}}
							label="data"
							placeholder="{}"
							name="data"
							onChange={this._onChange}
							value={data}
							active={true}
						/>
						{action === "Get"?<TextArea
							style={{flex:1,width:"100%"}}
							style_ta={{height:"100%",width:"100%"}}
							label="sort / skip / limit"
							placeholder='{"sort":{"created_at":1},"skip":0,"limit":50}'
							name="ssl"
							onChange={this._onChange}
							value={ssl}
							active={true}
						/>:""}
						<Button onClick={this._submit}>{bdd+action+ (dispached?"":" not dispached")}</Button>
					</div>
					<div style={{width:"50%",height:"100%",display:"flex",flexDirection:"column"}}>
						<Button onClick={()=>this.setState({wrap:!wrap})}>{wrap?"no wrap":"wrap"}</Button>
						<div style={{width:"100%",flex:1,display:"flex",flexDirection:"column", overflow:"hidden"}}>
							<div style={{
								display:"flex",
								flexDirection:"column",
								overflow:"scroll",
								padding:10,
								alignItems:"flex-start"
							}}>

							{
								this.pretty(show)
							}
							
							</div>
						</div>
					</div>
					
				</div>
				
			</div>: <div> You can't be here </div>
		);
	}
}

function mapStateToProps( state ){
	return (
		{
			active_user : state.user.active_user
		}
	);

}

function mapDispatchToProps(dispatch){
	return bindActionCreators({
			devisGet1: devis.get1,
			devisControle: devis.controle,
			devisPost: devis.post,
			devisGet: devis.get,
			devisUp: devis.up,
			devisDel: devis.del,

			elementsGet1: element.get1,
			elementControle: element.controle,
			elementPost: element.post,
			elementGet: element.get,
			elementUp: element.up,
			elementDel: element.del,

			logiqueGet1: logique.get1,
			logiqueControle: logique.controle,
			logiquePost: logique.post,
			logiqueGet: logique.get,
			logiqueUp: logique.up,
			logiqueDel: logique.del,

			entrepriseGet1: entreprise.get1,
			entrepriseControle: entreprise.controle,
			entreprisePost: entreprise.post,
			entrepriseGet: entreprise.get,
			entrepriseUp: entreprise.up,
			entrepriseDel: entreprise.del,

			choiceGet1: choice.get1,
			choiceControle: choice.controle,
			choicePost: choice.post,
			choiceGet: choice.get,
			choiceUp: choice.up,
			choiceDel: choice.del,

			userGet1: user.get1,
			userControle: user.controle,
			userPost: user.post,
			userGet: user.get,
			userUp: user.up,
			userDel: user.del,
			userControle: user.controle,
			creeCompte: user.creeCompte,
			getActiveUser: user.getActiveUser,
			userLogIn: user.logIn,
			logOut: user.logOut,
	}, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( Admin );
