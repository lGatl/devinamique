import React, {Component} from 'react';

import { bindActionCreators }	from 'redux';
import { connect } from 'react-redux';

import { devis, element, logique, entreprise, choice, controle } from '../6_actions';

import { 
	Element,
	ElementCard,
	Logique,
	Button,
	DevisForm,
	DevisDynamique,
	DevisEdit,
	DevisShow,
} from '../_common/4_dumbComponent';

import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

import "./devis.css"

import { throttle } from '../8_libs';

class Devis extends Component {
	constructor(){
		super()
		/*PASSER DANS LES CONTROLE POUR ACTIVER L'EDITION LORS DE L'AJOUT => ajout dans reducer => _id dans active_*/

		
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

		this._printDocument = this._printDocument.bind(this)
		this._desactiveForPrint = this._desactiveForPrint.bind(this)
		this._onShowLogq = this._onShowLogq.bind(this)
		this._dragDrop = this._dragDrop.bind(this)
		this._dropableMouseUp = this._dropableMouseUp.bind(this)
		this._mousemove = this._mousemove.bind(this)
		this._mouseup = this._mouseup.bind(this)
		this._viewDE = this._viewDE.bind(this)

		
}
	
	componentDidMount() {
		let { devis_id, devisGet1, entrepriseGet, elementGet,logiqueGet, choiceGet1, edit, user_id, choiceControle,controleSet,
		 devisUp
		} = this.props;

		window.addEventListener('scroll', this._handleScroll);
		document.addEventListener('mouseup', this._mouseup);
		document.addEventListener('mousemove', this._mousemove);
		document.addEventListener('touchstart', this._mousemove);
		document.addEventListener('touchmove', this._mousemove);
		document.addEventListener('touchend', this._mouseup);

		controleSet({
			menu:edit?1:2,
			scroll:0,
			show:2,
			show_logq:false,
			dsactif:true,
			active_devis:false,
			active_element:-1,
			active_logique:-1,
			error1:-1,
			error2:-1,
			draged:false,
			souris_x:0,
			souris_y:0,
			view1:1,
			view2:1,
			view3:1
		})
		devisGet1({data:{_id:devis_id}})
		entrepriseGet({data:{user_id}})
		elementGet({data:{devis_id},
			/*cbk:(elements)=>{
				elements.sort((elta,eltb)=>eltb.dynamique-elta.dynamique)
				devisGet1({data:{_id:devis_id},cbk:(devis)=>{
					devisUp({data:{...devis,elements:elements.map(elt=>elt._id)}})
				}})	
			}*/
		})
		logiqueGet({data:{devis_id}})
		choiceGet1({data:{devis_id},cbk:(res)=>{
			choiceControle({...res})
		}})
	}
	

	componentWillUnmount() {
	    window.removeEventListener('scroll', this._handleScroll);
	    document.removeEventListener('mouseup', this._mouseup);
			document.removeEventListener('mousemove', this._mousemove);
			document.removeEventListener('touchmove', this._mousemove);
			document.removeEventListener('touchstart', this._mousemove);
			document.removeEventListener('touchend', this._mouseup);
	}
	componentDidUpdate(prevProps, prevState){
		if(prevProps.dsactif===true && this.props.set.dsactif===false){
			this._printDocument()
		}
	}
	_handleScroll(event) {
			let {controleSet} = this.props
	    let scrollTop = event.srcElement.scrollingElement.scrollTop

	    controleSet({
	      scroll: scrollTop
	    });
	}
	_mousemove(event){
		let {controleSet} = this.props
		if(this.props.set.draged){
			controleSet({souris_x: event.clientX||event.touches[0].clientX,souris_y: event.clientY||event.touches[0].clientY});
		}
	}
	
	_mouseup() {
		let {controleSet} = this.props
		controleSet({draged:false});

	}

	_dragDrop({_id,event}){
		let {controleSet} = this.props
		controleSet({draged:_id,souris_x: event.clientX,souris_y: event.clientY});
		
	}
	
	_desactiveForPrint(){
		let {controleSet} = this.props
		controleSet({dsactif:false})
	}
	_printDocument() {
		let {controleSet} = this.props
    const input = document.getElementById('divToPrint');
    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        console.dir("imgData", imgData);
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'JPEG', 0, 0,210,297);
        //pdf.output('dataurlnewwindow');
        pdf.save("download.pdf");
        controleSet({dsactif:true})
      })
    ;
  }

  _onShowLogq({_id}){
  	let {controleSet} = this.props
  	this.props.set.show_logq===_id ? controleSet({show_logq:false}):controleSet({show_logq:_id})
  }
  
	//•••••••••••••••••••••••••••••••••••••••••••••••
	_devisControle(obj) {
		
			let { devisControle } = this.props;
			devisControle(obj);
	}

	_devisEdit({_id,titre,entreprise,client}){
		let { devisControle } = this.props;
		let {controleSet} = this.props

			devisControle({_id,titre,entreprise,client});
			controleSet({active_devis:true,active_element:-1,active_logique:-1})
	}
	_devisSave({_id}){
		let {controleSet} = this.props
		let { active_user } = this.props;
		let { devisUp, devis } = this.props;
		let { devis_controle } = this.props;
		devisUp({data:{...devis,...devis_controle,_id}});
		controleSet({active_devis:false})
	}
	_devisClose(){
		let {controleSet} = this.props
		controleSet({active_devis:false})
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
	_elementEdit({_id,libelle,prix,numerique,dynamique,id}){
		let {controleSet} = this.props
		let { elementControle } = this.props;
			if(this.props.set.active_element!==_id){
				elementControle({_id,libelle,prix,numerique,dynamique});
				controleSet({active_element:_id,active_devis:false,active_logique:-1})
			}
	}
	_elementSave({_id,libelle,prix,numerique,dynamique,id}){
		let {controleSet} = this.props
		let { active_user,elements } = this.props;
		let { elementUp } = this.props;
		let { element_controle } = this.props;
		let element = elements.find(elt=>elt._id===_id)
		let test ={data:{...element,_id,libelle,prix,numerique,dynamique:typeof dynamique==="boolean"?dynamique:false,...element_controle}}
		
		elementUp(test);
		controleSet({active_element:-1})
	}
	_elementClose(){
	let {controleSet} = this.props
		controleSet({active_element:-1})
	}
	_elementAdd({dynamique}){

		let {controleSet} = this.props
		let { active_user, elements,devis, choice } = this.props;
		let { elementPost, elementControle, devisUp, choiceUp } = this.props;
		let { controle } = this.props;

		dynamique = dynamique!==undefined?dynamique:false

		elementPost({data:{libelle:"",prix:"",numerique:false,dynamique,devis_id:devis._id,user_id:active_user._id},cbk:(_id)=>{
			controleSet({active_element:_id})
			elementControle({dynamique});
			let nbd = elements.reduce((total,elt)=>elt.dynamique===true?total+1:total,0)-1
			let d_elements= [...devis.elements]
			d_elements.splice(nbd,0,_id)
			devisUp({data:{...devis,elements:d_elements}})
			choiceUp({data:{...choice,[_id]:0}})

		}});
		
	}
	_elementDel({_id}){
		let {controleSet} = this.props
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
		let {controleSet} = this.props
		let { logiqueControle } = this.props;
			if(this.props.set.active_logique!==_id){
				logiqueControle({_id,libelle_log,prix_log,numerique_log});
				controleSet({active_logique:_id,active_devis:false,active_element:-1})
			}
	}
	_logiqueSave({_id}){
		let {controleSet} = this.props
		let { active_user } = this.props;
		let { logiqueUp } = this.props;
		let { logique_controle,logiques } = this.props;
		let logique = logiques.find((logi)=>logi._id===_id)

		logiqueUp({data:{_id,...logique,...logique_controle}});
		controleSet({active_logique:-1})
	}
	_logiqueClose(){
		let {controleSet} = this.props
		controleSet({active_logique:-1})
	}
	_logiqueAdd({_id}){
		let {controleSet} = this.props
		let { active_user, logiques, devis_id, elements } = this.props;
		let { logiquePost, logiqueControle, elementUp } = this.props;
		let { controle } = this.props;
		logiquePost({data:{devis_id,element_id:_id,user_id:active_user._id},cbk:(id)=>{
			controleSet({active_logique:id})
			let element = elements.find(elt=>elt._id===_id)
			elementUp({data:{...element,logiques:[...element.logiques,id]}})
		}});
		//logiqueControle();
		
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
		let {choice, choiceControle, choice_controle} = this.props;
		console.log("choice", choice);
		console.log("choice_control", choice_controle);

		choiceControle({...choice})
		
	}
	_choiceSave({_id}){
		let { active_user } = this.props;
		let { choiceUp } = this.props;
		let { choice_controle,choice } = this.props;
		let {controleSet} = this.props

		choiceUp({data:{_id,...choice,...choice_controle}});
		controleSet({active_choice:-1})
	}
	_choiceClose(){
		let {controleSet} = this.props
		controleSet({active_choice:-1})
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
	_dropableMouseUp({element_id,id,dynamique}){	
		let {devisUp, devis, elementUp,elements}=this.props;
		let d_elements = [...devis.elements];
		

		let elidx = element_id&&d_elements.indexOf(element_id)
		let element = element_id&&elements.find(elt=>elt._id===element_id)

		
		if(elidx>-1&& typeof id === "number"){
		
			d_elements.splice(elidx,1)
			id = id>elidx?id-1:id
			d_elements.splice(id,0,element_id)

			d_elements = d_elements.reduce((total,elt,i)=>{
				let telt=elements.find(el=>elt===el._id)
				return[...total,{...telt,dynamique}]
			},[])

		d_elements.sort((elta,eltb)=>eltb.dynamique-elta.dynamique)
		d_elements = d_elements.map(elt=>elt._id)

			elementUp({data:{...element,dynamique}})
			devisUp({data:{...devis,elements:d_elements}})
		}
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
	_viewDE(a){
		let {controleSet} = this.props
		controleSet({...a,active_element:-1})
	}
	//•••••••••••••••••••••••••••••••••••••••••••••••••••••••••

	render(){
		let { edit, active_user, devis,
			devis_controle,element_controle,logique_controle,choice_controle, 
			elements, logiques,entreprises,choice,set,windowheight } = this.props;
		let {controleSet} = this.props
		let	{menu, draged, souris_x,souris_y, dsactif,active_choice}=set;

		let { libelle,prix,numerique } = element_controle;
		let { titre,entreprise,client } = devis_controle;
		let { libelle_log,prix_log,numerique_log } = logique_controle;

		elements = typeof elements !== undefined && typeof elements === "object" && elements instanceof Array && elements.length >0? 
			devis && devis.elements?devis.elements.reduce((total,elt_id)=>elements.find(elt=>elt._id===elt_id)?[...total,elements.find(elt=>elt._id===elt_id)]:total,[]):[]
			:[];
		elements = elements.map((elt,i)=>{return{...elt,id:i}})

		let elements_F = elements.filter(elt=>elt.dynamique!==true) 
		let elements_D = elements.filter(elt=>elt.dynamique===true)
			let elements_to_show = !dsactif?elements_F.reduce((total,elt)=>choice_controle[elt._id]?[...total,elt]:total,[]):elements_F

			let elt_dgd = elements.find(elt=>elt._id===draged)?elements.find(elt=>elt._id===draged):""

			logiques = typeof logiques !== undefined && typeof logiques === "object" && logiques instanceof Array&& logiques.length >0 ? 
				logiques.reduce((total,logq,i)=>[...total,{...logq,...this.verifSyntax(logq.libelle_log)}],[])
			:[]
			

		let prix_total = elements_to_show.reduce((total,element,i)=>{
				let choice = choice_controle[element._id]
					
				 choice = typeof choice !== "undefined" && typeof choice === "boolean" && choice===true?1:
				 	typeof choice!== "undefined" && typeof choice === "boolean"&&choice===false?0:
					typeof choice!== "undefined" && typeof (choice*1) === "number"?choice:0;

				return total+choice* element.prix
						},0)
			

		return (
			<div style={{ 
				display:"flex", 
				flexDirection:"column", 
				width:"100%", 
				minHeight:"100%", 
				userSelect:"none"}}>
					<ElementCard 
					style={{
						display:draged?"flex":"none",
						left:souris_x,
						top:souris_y 
					}}
					prix={elt_dgd?elt_dgd.prix:""}
					libelle={elt_dgd?elt_dgd.libelle:""}
					id={elt_dgd?devis.elements.indexOf(draged):""}
					/>
					
					<div style={{ 
						display:"flex", 
						flexDirection:"row", 
						width:"100%", 
						justifyContent:"center",
						flexWrap:"wrap", 
						minHeight:"100%"}}>
					
					{edit?<div style={{
						transitionDuration: "0.5s",
						flex:menu===0||menu===1?1:"none",
						width:menu===0||menu===1?"default":0,
						overflow:"hidden"

				}}><DevisEdit
							resize={windowheight}
							view1={this.props.set.view1}
							view2={this.props.set.view2}
							controleSet={this._viewDE}
							active_user={active_user}
							
							entreprises={entreprises}
							
							show_logq={this.props.set.show_logq}
							onShowLogq={this._onShowLogq}

							devis={devis}
							active_devis={this.props.set.active_devis}
							devis_controle={devis_controle}
							devisClose = {this._devisClose}
							devisEdit = {this._devisEdit}
							devisSave = {this._devisSave}
							devisDel = {this._devisDel}
							devisCopy = {this._devisCopy}
							devisChange = {this._devisControle} 
							
							elements={elements}
							active_element={this.props.set.active_element}
							element_controle={element_controle}
							elementClose = {this._elementClose}
							elementEdit = {this._elementEdit}
							elementSave = {this._elementSave}
							elementDel = {this._elementDel}
							elementCopy = {this._elementCopy}
							elementAdd = {this._elementAdd}
							elementAddD = {this._elementAddD}
							elementAddF = {this._elementAddF}
							elementChange = {this._elementControle}

							dragDrop = {this._dragDrop} 
							draged = {draged}
							dropableMouseUp = {this._dropableMouseUp}

							logiques={logiques}
							active_logique={this.props.set.active_logique}
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
									transitionDuration: "0.1s",
									width:50,
									display:"flex",
									flexDirection:"column"
								}}>
									{menu!==0&&edit?<div className="imgbutt" onClick={()=>{controleSet({menu:0})}}> {">>"} </div>:""}
									{menu!==1&&edit?<div className="imgbutt" onClick={()=>{controleSet({menu:1})}}> {menu===0?"<":">"} </div>:""}
									{menu!==2&&edit?<div className="imgbutt" onClick={()=>{controleSet({menu:2})}}> {"<<"} </div>:""}
							 	</div>
					<div style={{
						transitionDuration: "0.5s",
						flex:menu===1||menu===2?1:"none",
						width:menu===2||menu===2?"default":0,
						height:windowheight?windowheight-80:4000,
						overflow:"hidden",
						display:"flex",
						flexDirection:"column"

				}}>	
					<div style={{
						display:"flex",
						flexDirection:"column",
						flex:set.view3===0||set.view3===1?1:0,
						height:"auto",
						overflowY:"scroll",
						backgroundColor:"white",
						transitionDuration: "0.5s",
					}}>
						<DevisDynamique
									menu={menu}
									devis={devis}
									dsactif={dsactif}
									entreprise={ entreprises.find((entreprise)=>devis.entreprise===entreprise._id)}
									client={entreprises.find((entreprise)=>devis.client===entreprise._id)}
									elements={elements.filter(elt=>elt.dynamique===true).map((elt,j)=>{
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
									prix_total= {prix_total}
									active_choice={active_choice}
									choice_controle={choice_controle}
									onClose = {this._choiceClose}
									onEdit = {this._choiceEdit}
									onSave = {this._choiceSave}
									onDel = {this._choiceDel}
									onCopy = {this._choiceCopy}
									onAdd = {this._choiceAdd}
									onChange = {this._choiceControle} 
									onPrint = {()=>{}}
									/>

					</div>
					<div style={{
									height:50,
									display:"flex",
									flexDirection:"row"
								}}>
									{<div className="imgbutt" onClick={()=>{
										set.view3===1?controleSet({view3:0}):controleSet({view3:1})
									}}> {"v"} </div>}
									
									<div style={{display:"flex",flex:1,justifyContent:"center"}}>
										<div className="imgbutt" onClick={this._desactiveForPrint} style={{ backgroundImage:"url('/image/printer.png')"}}></div>
										<div className="imgbutt" onClick={this._choiceSave} style={{ backgroundImage:"url('/image/floppy.png')"}}></div>
										<div className="imgbutt" onClick={this._choiceRef} style={{ backgroundImage:"url('/image/refresh.png')"}}></div>
									</div>
							 		{<div className="imgbutt" onClick={()=>{
							 			set.view3===1?controleSet({view3:2}):controleSet({view3:1})
							 		}}> {"^"} </div>}
					</div>
					<DevisShow 
									style={{flex:set.view3===2||set.view3===1?2:0,height:"auto"}}
									menu={menu}
									devis={devis}
									dsactif={dsactif}
									prix_total= {prix_total}
									entreprise={ entreprises.find((entreprise)=>devis.entreprise===entreprise._id)}
									client={entreprises.find((entreprise)=>devis.client===entreprise._id)}
									elements={elements_to_show.map((elt,j)=>{
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
									active_choice={active_choice}
									choice_controle={choice_controle}
									onClose = {this._choiceClose}
									onEdit = {this._choiceEdit}
									onSave = {this._choiceSave}
									onDel = {this._choiceDel}
									onCopy = {this._choiceCopy}
									onAdd = {this._choiceAdd}
									onChange = {this._choiceControle} 
									onPrint = {()=>{}}

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
			windowheight:state.controle.resize.windowheight,
			set:state.controle.set
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

			controleSet: controle.set

	}, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( Devis );
