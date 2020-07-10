import React, {Component} from 'react';

import { bindActionCreators }	from 'redux';
import { connect } from 'react-redux';

import { devis, element, logique, entreprise, choice } from '../6_actions';

import { 
	Element,
	Logique,
	Button,
	DevisForm,
	DevisEdit,
	DevisShow
} from '../_common/4_dumbComponent';

import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

import "./devis.css"

import { throttle } from '../8_libs';

class Devis extends Component {
	constructor(){
		super()
		/*PASSER DANS LES CONTROLE POUR ACTIVER L'EDITION LORS DE L'AJOUT => ajout dans reducer => _id dans active_*/

		this.state = {
			scroll:0,
			menu:1,
			show:2,
			active_devis:false,
			active_element:-1,
			active_logique:-1,
			error1:-1,
			error2:-1
		}
		this._devisControle = this._devisControle.bind(this)
		this._devisEdit = this._devisEdit.bind(this)
		this._devisSave = this._devisSave.bind(this)
		this._devisClose = this._devisClose.bind(this)
		this._devisDel = this._devisDel.bind(this)
		this._devisCopy = this._devisCopy.bind(this)

		this._elementControle = this._elementControle.bind(this)
		this._elementEdit = this._elementEdit.bind(this)
		this._elementSave = this._elementSave.bind(this)
		this._elementClose = this._elementClose.bind(this)
		this._elementDel = this._elementDel.bind(this)
		this._elementCopy = this._elementCopy.bind(this)
		this._elementAdd = this._elementAdd.bind(this)

		this._logiqueControle = this._logiqueControle.bind(this)
		this._logiqueEdit = this._logiqueEdit.bind(this)
		this._logiqueSave = this._logiqueSave.bind(this)
		this._logiqueClose = this._logiqueClose.bind(this)
		this._logiqueDel = this._logiqueDel.bind(this)
		this._logiqueCopy = this._logiqueCopy.bind(this)
		this._logiqueAdd = this._logiqueAdd.bind(this)

		this._choiceControle = this._choiceControle.bind(this)
		this._choiceRef = this._choiceRef.bind(this)
		this._choiceSave = this._choiceSave.bind(this)
		this._choiceClose = this._choiceClose.bind(this)
		this._choiceDel = this._choiceDel.bind(this)
		this._choiceCopy = this._choiceCopy.bind(this)
		this._choiceAdd = this._choiceAdd.bind(this)

		this._handleScroll = throttle(this._handleScroll.bind(this),30)

		
	}
		init(){
		return{
			libelle:"",
			prix:"",
			numerique:false
		}
	}
	componentDidMount() {
		let { devis_id, devisGet1, entrepriseGet, elementGet,logiqueGet, choiceGet1, edit, user_id, choiceControle } = this.props;

		window.addEventListener('scroll', this._handleScroll);

		this.setState({menu:edit?1:2})
		devisGet1({data:{_id:devis_id}})
		entrepriseGet({data:{user:user_id}})
		elementGet({data:{devis_id}})
		logiqueGet({data:{devis_id}})
		choiceGet1({data:{devis_id},cbk:(res)=>{
			choiceControle({...res})
		}})
	}
	

	componentWillUnmount() {
	    window.removeEventListener('scroll', this._handleScroll);
	}
	
	_handleScroll(event) {
	    let scrollTop = event.srcElement.scrollingElement.scrollTop

	    this.setState({
	      scroll: scrollTop
	    });
	}

	_printDocument() {
    const input = document.getElementById('divToPrint');
    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        console.dir("imgData", imgData);
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'JPEG', 0, 0,210,297);
        //pdf.output('dataurlnewwindow');
        pdf.save("download.pdf");
      })
    ;
  }
  
	//•••••••••••••••••••••••••••••••••••••••••••••••
	_devisControle(obj) {
		
			let { devisControle } = this.props;
			devisControle(obj);
	}

	_devisEdit({_id,titre,entreprise,client}){
		let { devisControle } = this.props;

			devisControle({_id,titre,entreprise,client});
			this.setState({active_devis:true,active_element:-1,active_logique:-1})
	}
	_devisSave({_id}){
		let { active_user } = this.props;
		let { devisUp, devis } = this.props;
		let { devis_controle } = this.props;
		devisUp({data:{...devis,...devis_controle,_id}});
		this.setState({active_devis:false})
	}
	_devisClose(){
		this.setState({active_devis:false})
	}
	_devisDel({_id}){

		let { devisDel } = this.props;
		devisDel({data:{_id}});
	}
	_devisCopy({_id,libelle,prix,num,id}){
		/*let { active_user, deviss } = this.props;
		let { devisPost } = this.props;
	
		devisPost({data:{libelle,prix,num,date:Date.now(),user:active_user._id}});*/
	}
	//••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••
	_elementControle(obj) {
		
			let { elementControle } = this.props;

			elementControle(obj);
	}
	_elementEdit({_id,libelle,prix,numerique,id}){
		let { elementControle } = this.props;
			if(this.state.active_element!==_id){
				elementControle({_id,libelle,prix,numerique});
				this.setState({active_element:_id,active_devis:false,active_logique:-1})
			}
	}
	_elementSave({_id}){
		let { active_user } = this.props;
		let { elementUp } = this.props;
		let { element_controle } = this.props;

		elementUp({data:{_id,...element_controle}});
		this.setState({active_element:-1})
	}
	_elementClose(){
		this.setState({active_element:-1})
	}
	_elementAdd(){
		let { active_user, elements,devis } = this.props;
		let { elementPost, elementControle, devisUp } = this.props;
		let { controle } = this.props;
		elementPost({data:{...this.init(),devis_id:devis._id,date:Date.now(),user_id:active_user._id},cbk:(_id)=>{
			this.setState({active_element:_id})
			devisUp({data:{...devis,elements:[...devis.elements,_id]}})

		}});
		//elementControle(this.init());
		
	}
	_elementDel({_id}){

		let { elementDel,devisUp, devis } = this.props;
		elementDel({data:{_id},cbk:()=>{
			devisUp({data:{...devis,elements:devis.elements.filter(elt=>elt!==_id)}})
		}});
	}
	_elementCopy({_id,libelle,prix,numerique,id}){
		/*let { active_user, elements } = this.props;
		let { elementPost, elementControle } = this.props;
		let { controle } = this.props;
		elementPost({data:{libelle,prix,numerique,date:Date.now(),user:active_user._id}});*/
	}
	//•••••••••••••••••••••••••••••••••••••••••••••••••••••••••
	_logiqueControle(obj) {
		
			let { logiqueControle } = this.props;

			//logstr = typeof logstr ==="string"?logstr.split("").reduce((total,lr,i)=>["i","d","_","<",">","!","=","&","|","0","1","2","3","4","5","6","7","8","9","(",")"]


			logiqueControle(obj);
	}
	_logiqueEdit({_id,libelle_log,prix_log,numerique_log}){

		let { logiqueControle } = this.props;
			if(this.state.active_logique!==_id){
				logiqueControle({_id,libelle_log,prix_log,numerique_log});
				this.setState({active_logique:_id,active_devis:false,active_element:-1})
			}
	}
	_logiqueSave({_id}){
		let { active_user } = this.props;
		let { logiqueUp } = this.props;
		let { logique_controle,logiques } = this.props;
		let logique = logiques.find((logi)=>logi._id===_id)

		logiqueUp({data:{_id,...logique,...logique_controle}});
		this.setState({active_logique:-1})
	}
	_logiqueClose(){
		this.setState({active_logique:-1})
	}
	_logiqueAdd({_id}){

		let { active_user, logiques, devis_id, elements } = this.props;
		let { logiquePost, logiqueControle, elementUp } = this.props;
		let { controle } = this.props;
		logiquePost({data:{devis_id,element_id:_id,date:Date.now(),user_id:active_user._id},cbk:(id)=>{
			this.setState({active_logique:id})
			let element = elements.find(elt=>elt._id===_id)
			elementUp({data:{...element,logiques:[...element.logiques,id]}})
		}});
		//logiqueControle(this.init());
		
	}
	_logiqueDel({_id,element_id}){

		let { logiqueDel, elementUp, elements } = this.props;
		logiqueDel({data:{_id},cbk:()=>{
			let element = elements.find(elt=>elt._id===element_id)
			elementUp({data:{...element,logiques:element.logiques.filter(logq=>logq!==_id)}})
		}});
	}
	_logiqueCopy({_id,libelle,prix,numerique,id}){
		/*let { active_user, logiques } = this.props;
		let { logiquePost, logiqueControle } = this.props;
		let { controle } = this.props;
		logiquePost({data:{libelle,prix,numerique,date:Date.now(),user:active_user._id}});*/
	}
	//•••••••••••••••••••••••••••••••••••••••••••••••••••••••••
	_choiceControle(obj) {
		
		let { choiceControle } = this.props;

			this.props.logiques.reduce((total,lg,i)=>this.props.elements.findIndex(el=>el._id===lg.element_id)>-1?[...total,lg]:total,[]).map(logq=>{

				if(this.comprendre(logq,this.props.elements,{...this.props.choice_controle,...obj})){
					
					if(logq.numerique_log){choiceControle({[logq.element_id]:logq.numerique_log})}
				}												
			})
		choiceControle(obj);
	}

	_choiceRef(){
		let {choice, choiceControle} = this.props;
		choiceControle({...choice})
		
	}
	_choiceSave({_id}){
		let { active_user } = this.props;
		let { choiceUp } = this.props;
		let { choice_controle,choice } = this.props;

		choiceUp({data:{_id,...choice,...choice_controle}});
		this.setState({active_choice:-1})
	}
	_choiceClose(){
		this.setState({active_choice:-1})
	}
	_choiceAdd(){
		
	}
	_choiceDel({_id}){

		let { choiceDel } = this.props;
		choiceDel({data:{_id}});
	}
	_choiceCopy({_id,libelle,prix,numerique,id}){
		/*let { active_user, logiques } = this.props;
		let { logiquePost, logiqueControle } = this.props;
		let { controle } = this.props;
		logiquePost({data:{libelle,prix,numerique,date:Date.now(),user:active_user._id}});*/
	}

	comprendre(logq,elts,choices){
		let logstr = logq.libelle_log
		let logstr1 = typeof logstr ==="string"?logstr.split("").reduce((total,lr,i)=>["i","d","_","<",">","!","=","&","|","0","1","2","3","4","5","6","7","8","9","(",")"]
			.indexOf(lr)>-1?total+lr:total,"").toLowerCase():"";
		logstr1.split("=>").join("")
		if(logstr!==undefined&&logstr!==logstr1){
		}
		logstr=logstr1

		let remplace = logstr.split("id").reduce((total,lr,i)=>{
				
			if(lr.indexOf("_")>-1){
				let elt = elts[lr.split("_")[0]]
				let elt_id = elt?elt._id:false
				let nb = elt_id?choices[elt_id]:0

				return  nb?total+nb+lr.split("_")[1]:total
			}else{
				return total
			}
		},"")
		try{
			return remplace !== undefined && typeof eval(remplace) === "boolean" ?eval(remplace):false
		}catch{
			return false
		}
	}

	verifSyntax(logstr){
		let error1=false;
		let error2=false;
		
		let logstr1 = typeof logstr ==="string"?logstr.split("").reduce((total,lr,i)=>["i","d","_","<",">","!","=","&","|","0","1","2","3","4","5","6","7","8","9","(",")"]
			.indexOf(lr)>-1?total+lr:total,"").toLowerCase():"";
		logstr1.split("=>").join("")
		if(logstr!==logstr1){
			error1=true
		}
		logstr=logstr1

		let remplace = logstr.split("id").reduce((total,lr,i)=>{
			if(lr.indexOf("_")>-1){
				let nb = "0"
				return  nb?total+nb+lr.split("_")[1]:total
			}else{
				return total
			}
		},"")

		try{
			let	test = eval(remplace)
		}catch{
			error2=true
		}
		return {error1,error2}
	}

	//•••••••••••••••••••••••••••••••••••••••••••••••••••••••••

	render(){
		let { edit, active_user, devis,
			devis_controle,element_controle,logique_controle,choice_controle, 
			elements, logiques,entreprises,choice } = this.props;

		let	{menu}=this.state;

			elements = typeof elements !== undefined && typeof elements === "object" && elements instanceof Array && elements.length >0? 
			devis && devis.elements?devis.elements.reduce((total,elt_id)=>elements.find(elt=>elt._id===elt_id)?[...total,elements.find(elt=>elt._id===elt_id)]:total,[]):[]
			:[]

			logiques = typeof logiques !== undefined && typeof logiques === "object" && logiques instanceof Array&& logiques.length >0 ? 
				logiques.reduce((total,logq,i)=>[...total,{...logq,...this.verifSyntax(logq.libelle_log)}],[])
			:[]
			


			let { libelle,prix,numerique } = element_controle;
			let { titre,entreprise,client } = devis_controle;
			let { libelle_log,prix_log,numerique_log } = logique_controle;

		return (
			<div style={{ display:"flex", flexDirection:"column", width:"100%", minHeight:"100%"}}>
					
					<div style={{ display:"flex", flexDirection:"row", width:"100%", justifyContent:"center",flexWrap:"wrap", minHeight:"100%"}}>
					
					{edit?<div style={{
						transitionDuration: "0.5s",
						flex:this.state.menu===0||this.state.menu===1?1:"none",
						width:this.state.menu===0||this.state.menu===1?"default":0,
						overflow:"hidden"

				}}><DevisEdit
							active_user={active_user}
							
							entreprises={entreprises}
							
							devis={devis}
							active_devis={this.state.active_devis}
							devis_controle={devis_controle}
							devisClose = {this._devisClose}
							devisEdit = {this._devisEdit}
							devisSave = {this._devisSave}
							devisDel = {this._devisDel}
							devisCopy = {this._devisCopy}
							devisChange = {this._devisControle} 
							
							elements={elements}
							active_element={this.state.active_element}
							element_controle={element_controle}
							elementClose = {this._elementClose}
							elementEdit = {this._elementEdit}
							elementSave = {this._elementSave}
							elementDel = {this._elementDel}
							elementCopy = {this._elementCopy}
							elementAdd = {this._elementAdd}
							elementChange = {this._elementControle} 
							
							logiques={logiques}
							active_logique={this.state.active_logique}
							logique_controle={logique_controle}
							logiqueClose = {this._logiqueClose}
							logiqueEdit = {this._logiqueEdit}
							logiqueSave = {this._logiqueSave}
							logiqueDel = {this._logiqueDel}
							logiqueCopy = {this._logiqueCopy}
							logiqueAdd = {this._logiqueAdd}
							logiqueChange = {this._logiqueControle} 
							/>
						</div>:""}
							
								<div style={{
									paddingTop:this.state.scroll,
									transitionDuration: "0.1s",
									width:50,
									display:"flex",
									flexDirection:"column"
								}}>
									{menu!==0&&edit?<div className="imgbutt" onClick={()=>{this.setState({menu:0})}}> {">>"} </div>:""}
									{menu!==1&&edit?<div className="imgbutt" onClick={()=>{this.setState({menu:1})}}> {menu===0?"<":">"} </div>:""}
									{menu!==2&&edit?<div className="imgbutt" onClick={()=>{this.setState({menu:2})}}> {"<<"} </div>:""}
									<div className="imgbutt" onClick={this._printDocument} style={{ backgroundImage:"url('/image/printer.png')"}}></div>
									<div className="imgbutt" onClick={this._choiceSave} style={{ backgroundImage:"url('/image/floppy.png')"}}></div>
									<div className="imgbutt" onClick={this._choiceRef} style={{ backgroundImage:"url('/image/refresh.png')"}}></div>
							 	</div>
					<div style={{
						transitionDuration: "0.5s",
						flex:menu===1||menu===2?1:"none",
						width:menu===2||menu===2?"default":0,
						overflow:"hidden",
						display:"flex"

				}}>		
					<DevisShow 
									menu={this.state.menu}
									devis={devis}
									entreprise={ entreprises.find((entreprise)=>devis.entreprise===entreprise._id)}
									client={entreprises.find((entreprise)=>devis.client===entreprise._id)}
									elements={elements.map((elt,j)=>{
										let nv_prix = elt.prix
										let logqs = typeof logiques !== undefined && typeof logiques === "object" && logiques instanceof Array&& logiques.length >0 &&elt && elt.logiques ? 
										elt.logiques.reduce((total,elo)=>logiques.find(logq=>logq._id === elo)?[...total,logiques.find(logq=>logq._id === elo)]:total,[]):[]
										logqs.map(logq=>{
											nv_prix = logq.prix_log !== undefined && logq.prix_log !== "" && typeof (logq.prix_log*1) === "number" && this.comprendre(logq,elements,choice_controle)  ?
											logq.prix_log:nv_prix
										})
										return {...elt, 
											prix: nv_prix
										}
									})}

									choices={""}
									active_choice={this.state.active_choice}
									choice_controle={choice_controle}
									onClose = {this._choiceClose}
									onEdit = {this._choiceEdit}
									onSave = {this._choiceSave}
									onDel = {this._choiceDel}
									onCopy = {this._choiceCopy}
									onAdd = {this._choiceAdd}
									onChange = {this._choiceControle} 
									onPrint = {this._printDocument}

									/>
							</div>

			</div>	
			</div>
		);
	}
}

function mapStateToProps( state ){
	return (
		{
			active_user: state.user.active_user,
			element_controle: state.element.controle,
			elements: state.element.got.data,
			devis_controle: state.devis.controle,
			devis: state.devis.got1.data,
			deviss: state.devis.got.data,
			logiques: state.logique.got.data,
			logique_controle: state.logique.controle,
			choice_controle: state.choice.controle,
			entreprises: state.entreprise.got.data,
			choice:state.choice.got1.data,
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

			elementControle: element.controle,
			elementPost: element.post,
			elementGet: element.get,
			elementUp: element.up,
			elementDel: element.del,

			logiqueControle: logique.controle,
			logiquePost: logique.post,
			logiqueGet: logique.get,
			logiqueUp: logique.up,
			logiqueDel: logique.del,

			choiceControle: choice.controle,
			choicePost: choice.post,
			choiceGet1: choice.get1,
			choiceUp: choice.up,
			choiceDel: choice.del,
			
			entrepriseGet: entreprise.get,

	}, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( Devis );
