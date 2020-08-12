import React, {Component} from 'react';

import { bindActionCreators }	from 'redux';
import { connect } from 'react-redux';

import { devis, element, logique, entreprise, choice, user, controle } from '../../6_actions';

import { 
	TextArea,
	Button,
	Checkbox,
	Poppup,
	Input
} from '../../_common/4_dumbComponent';
import { 
	DEVIS,ELEMENTS,LOGIQUES,CHOIX
} from './feature';

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
		this.state = {
			bdd:"devis",
			action:"Get",
			data:"{}",
			show:"",
			wrap:false,
			dispached:true, 
			poppup:false, 
			ssl:'{"sort":{"created_at":1},"skip":0,"limit":50}',
			copy:false,
			user_id:""
		}
		this._onChange = this._onChange.bind(this) 
		this._submit = this._submit.bind(this) 
		this._annule = this._annule.bind(this)
		this._submit2 = this._submit2.bind(this)
		this._createDevisFeature = this._createDevisFeature.bind(this)
	}
	componentDidUpdate(prevProps, prevState){
		let { devis, newchoice,
			devis_loading, newchoice_loading,
			elementPost, elementUp, logiquePost, devisUp,choiceUp } = this.props;
		let { copy, user_id } = this.state;

		user_id = user_id !== undefined && typeof user_id === "string" && user_id.length>0 ? user_id : this.props.user_id
		console.log("user_id", user_id);
		devis = devis !== undefined && typeof devis === "object" && Object.keys(devis).length > 0 ? {...devis} :false
		let choice = CHOIX
		newchoice = newchoice !== undefined && typeof newchoice === "object" && Object.keys(newchoice).length > 0 ? {...newchoice} :false
		let elements = ELEMENTS
		let logiques = LOGIQUES

		if(devis && newchoice &&
			 !devis_loading && !newchoice_loading && copy===true){//false
			
			this.setState({copy:false})
			let annvelt = {}
			let annvlog = {}
			elements.forEach((element,i)=>{
				element = element !== undefined && typeof element === "object" && Object.keys(element).length > 0 ? {...element} :false
				if(element){
					let _id = element._id
					delete element._id
					delete element.created_at
					elementPost({data:{...element,devis_id:devis._id,user_id},cbk:(_nvid)=>{
						annvelt = {...annvelt,[_id]:_nvid}
						
						if(i === (elements.length-1)){
							logiques.forEach((logique,j)=>{
									logique = logique !== undefined && typeof logique === "object" && Object.keys(logique).length > 0 ? {...logique} :false
									if(logique){
										let _idlog = logique._id
										delete logique._id
										delete logique.created_at
										logiquePost({data:{...logique,devis_id:devis._id,user_id,element_id:annvelt[logique.element_id]},cbk:(_newidlog)=>{
											annvlog = {...annvlog,[_idlog]:_newidlog}
											if(j === (logiques.length-1)){

												elements.forEach((elemento,l)=>{
													let tablogiques = [...elemento.logiques]
													tablogiques = tablogiques.length>0?tablogiques.reduce((ttotal,eltt,k)=>[...ttotal,annvlog[eltt]],[]):tablogiques;
													elementUp({data:{...elemento,_id:annvelt[elemento._id],devis_id:devis._id,user_id,logiques:[...tablogiques]}})
												})
											}
										}})
									}
							})		
							let delts = devis.elements !== undefined && typeof devis.elements === "object" && devis.elements instanceof Array ? [...devis.elements]:false
							if(delts){
								delts = delts.map(delt=>annvelt[delt])
								devisUp({data:{...devis, elements:[...delts]}})
							}

							let celts = choice.elements !== undefined && typeof choice.elements === "object" && Object.keys(choice.elements).length > 0 ? {...choice.elements}:false
							if(celts){
								celts = Object.keys(celts).reduce((total,celtkey)=>{return annvelt[celtkey]?{...total,[annvelt[celtkey]]:celts[celtkey]}:{...total}},{})

								choiceUp({data:{ ...newchoice, elements:{...celts}}})
							}
						}
					}})
				}
			})

		}
	}
	_createDevisFeature(){
		let { user_id } = this.state;
		let { devisPost, choiceGet1, devisGet1, choicePost } = this.props;

		let { controle } = this.props;

		let devis = DEVIS

		user_id = user_id !== undefined && typeof user_id === "string" && user_id.length>0 ? user_id : this.props.user_id

		if(devis){
			delete devis._id
			delete devis.created_at
			this.setState({copy:true})

			devisPost({data:{...devis, user_id},cbk:(_id)=>{
				devisGet1({data:{_id}})
				choicePost({data:{user_id,devis_id:_id,elements:{}},cbk:(_idc)=>{
					choiceGet1({data:{_id:_idc},instate:"newchoice"})
				}})
			}})
		}
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
		let tab = ligne.split(":")
		let first = tab.shift()
		return ligne.indexOf(":")>-1 ? 
				<div key={j} style = {{whiteSpace:wrap?"normal":"nowrap",marginLeft:arr.length*30, boxSizing:"border-box"}}>
					<span style = {{wordBreak: "break-all", color:"green"}}>{first}</span>
					<span style={{ wordBreak: "break-all"}}>:{tab.join("")}</span>
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
		let {bdd,action,data, show, wrap, dispached, ssl, user_id} = this.state

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
							<Input

								label="user_id"
								placeholder="user_id"
								name="user_id"
								onChange={this._onChange}
								value={user_id}
								active={true}
							/>
							<Button style={{width:200}} onClick={this._createDevisFeature}>Create Devis Feature</Button>
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
			user_id : state.user.user_id,
			active_user : state.user.active_user,
			devis: state.devis.got1.data,
			devis_loading: state.devis.got1.data_loading,
			newchoice: state.choice.got1.newchoice,
			newchoice_loading: state.choice.got1.newchoice_loading,
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
