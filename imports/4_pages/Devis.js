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
const CARACTERES_AUTORISES = ["i","d","_","<",">","!","=","&","|","0","1","2","3","4","5","6","7","8","9","(",")"]
class Devis extends Component {
	constructor(props){
		super(props)
		
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

		this._printDocument = this._printDocument.bind(this)
		this._desactiveForPrint = this._desactiveForPrint.bind(this)
		this._onShowLogq = this._onShowLogq.bind(this)
		this._dragDrop = this._dragDrop.bind(this)
		this._dropableMouseUp = this._dropableMouseUp.bind(this)
		this._mousemove = this._mousemove.bind(this)
		this._mouseup = this._mouseup.bind(this)
		this._viewDE = this._viewDE.bind(this)
		this._finalView = this._finalView.bind(this)
		this.scroll1Ref = React.createRef()
		this.scroll2Ref = React.createRef()
		this.checkLogq = this.checkLogq.bind(this)

		
}
	
	componentDidMount() {
		let { devis_id, devisGet1, entrepriseGet, elementGet, logiqueGet, 
			choiceGet1, choicePost, edit, user_id, choiceControle, choiceUpControle, controleSet, elements,
		 devisUp
		} = this.props;

		document.addEventListener('mouseup', this._mouseup);
		document.addEventListener('mousemove', this._mousemove);
		document.addEventListener('touchstart', this._mousemove);
		document.addEventListener('touchmove', this._mousemove);
		document.addEventListener('touchend', this._mouseup);

		choiceUpControle({})

		controleSet({
			premierup:true,
			first:0,
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
			view3:1,
			print:false,
			pscrollHeight:0,
			scrollHeight:0
		})

		devisGet1({data:{_id:devis_id,user_id}})
		entrepriseGet({data:{user_id}})
		elementGet({data:{devis_id,user_id}})
		choiceGet1({data:{devis_id,user_id}})
		logiqueGet({data:{devis_id,user_id}})

	}
	

	componentWillUnmount() {

	    document.removeEventListener('mouseup', this._mouseup);
			document.removeEventListener('mousemove', this._mousemove);
			document.removeEventListener('touchmove', this._mousemove);
			document.removeEventListener('touchstart', this._mousemove);
			document.removeEventListener('touchend', this._mouseup);
	}
	componentDidUpdate(prevProps, prevState){

		let {controleSet, choiceUp, devisUp, choice_controle, choiceControle,choiceUpControle, choicePost, choiceGet1, user_id, set, devisGet1, entrepriseGet, elementGet, logiqueGet, 
					elements, devis, entreprises, choice, logiques,
					elements_loading, devis_loading, entreprises_loading, choice_loading, logiques_loading,devis_id} = this.props

					elements = typeof elements === "object" && elements instanceof Array ? elements : false; 
					devis = typeof devis === "object"  ? devis : false;
					entreprises = typeof entreprises === "object" && entreprises instanceof Array ? entreprises : false; 
					choice =  typeof choice === "object" ?choice : false;
					
					logiques = typeof logiques === "object" && logiques instanceof Array ? logiques : false; 
					if(devis_id!==prevProps.devis_id||user_id!==prevProps.user_id){
						devisGet1({data:{_id:devis_id,user_id}})
						entrepriseGet({data:{user_id}})
						elementGet({data:{devis_id,user_id}})
						choiceGet1({data:{devis_id,user_id}})
						logiqueGet({data:{devis_id,user_id}})
						controleSet({premierup:true})
					}

					if (elements&& devis&& entreprises&& choice&& logiques&& set.premierup===true&&
							!elements_loading&&!devis_loading&& !entreprises_loading&& !choice_loading&& !logiques_loading){
						console.log("checked")
						controleSet({premierup:false})
						choiceControle({...choice.elements})
						this.checkLogq({logiques,save:true})




						if(
							elements !== undefined && typeof elements === "object" && elements instanceof Array &&
							choice.elements !== undefined && typeof choice.elements === "object" &&
							(choice === null||elements.length !== Object.keys(choice.elements).length)) {
							console.log("ANOMALIE")
							console.log("elements.length", elements.length);
							console.log("Object.keys(choice).length", Object.keys(choice.elements).length);
							
							let elts = {...choice.elements}
							console.log("elts", elts);
							elts = Object.keys(elts).reduce((total,elt_id)=>elements.findIndex(elt=>elt_id===elt._id)>=0?{...total,[elt_id]:elts[elt_id]}:{...total},{})
							elts = elements.reduce((total,elt)=>
							 	Object.keys(elts).findIndex(elt_id=>elt_id===elt._id)>=0?{...total,[elt._id]:elts[elt._id]}:{...total,[elt._id]:0},{})

							 choiceUp({data:{
							 	...choice, elements:{...elts}
							 }})
							 choiceUpControle({...elts})

							/*choicePost({
								data:{user_id,devis_id:devis._id,elements:elements.reduce((total,elt)=>{return{...total,[elt._id]:0}},{})},
								cbk:()=>{
									console.log("-----choice réparé-----")
									choiceGet1({
										data:{devis_id: devis._id},
										cbk:(res)=>{
											choiceControle({...res.elements})
										}
									})
								}
							}) */
						
						console.log("ok")
						}
					}
		if(prevProps.set.print===false && this.props.set.print===true){

			this._printDocument()
		}
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
		controleSet({dsactif:false, print:true})
	}
	
  	_printDocument() {
		let {controleSet,devis} = this.props
		let inputs = document.getElementsByClassName("divToPrint")

			
    if(inputs!==null){
 			let count=inputs.length;
 			let total=count;
 			const pdf = new jsPDF({compress: true});
 			let img_datas={}

 			for (let i = 1;i<=inputs.length;i++){
 				html2canvas(inputs[inputs.length-count])
	      .then((canvas) => {
	        img_datas = {...img_datas,[i]:canvas.toDataURL('image/png')};	

	        if(img_datas!==undefined&&typeof img_datas==="object"&&Object.keys(img_datas).length===total){
	        	Object.keys(img_datas).forEach((img,j)=>{
	        		pdf.addImage(img_datas[img], 'JPEG', 0, 0,210,297, undefined, 'FAST');
	        		if(j<(total-1)){
	        			pdf.addPage()
	        		}else{
	        			pdf.save(devis&&devis.titre?"devis_"+devis.titre.trim()+".pdf":"devis.pdf");
	        			controleSet({print:false,dsactif:true})
	        		}
	        	})
	        }
				})
	       count--
	    }
 		} 
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

	_devisEdit({_id,titre,entreprise,client,contractuel, tjm, unite,password,delais, unitedelais}){
		let { devisControle } = this.props;
		let {controleSet} = this.props

			devisControle({_id,titre,entreprise,client,contractuel, tjm, unite,password,delais,unitedelais});
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
	_elementEdit({_id,libelle,prix,numerique,dynamique,id,titre_lvl,sans_interaction}){
		let {controleSet} = this.props
		let { elementControle } = this.props;
			if(this.props.set.active_element!==_id){
				elementControle({_id,libelle,prix,numerique,dynamique,titre_lvl,sans_interaction});
				controleSet({active_element:_id,active_devis:false,active_logique:-1})
			}
	}
	_elementSave({_id,libelle,prix,titre_lvl,sans_interaction,numerique,dynamique,id}){
		let {controleSet} = this.props
		let { active_user,elements } = this.props;
		let { elementUp } = this.props;
		let { element_controle } = this.props;
		let element = elements.find(elt=>elt._id===_id)
		let test = {data:{...element,_id,libelle,prix,numerique,titre_lvl,sans_interaction,dynamique:typeof dynamique==="boolean"?dynamique:false,...element_controle}}
		
		elementUp(test);
		controleSet({active_element:-1})
	}
	_elementClose(){
	let {controleSet} = this.props
		controleSet({active_element:-1})
	}
	_elementAdd({dynamique}){

		let {controleSet, choiceControle, choice_controle} = this.props
		let { active_user, elements,devis, choice, } = this.props;
		let { elementPost, elementControle, devisUp, choiceUp } = this.props;
		let { controle } = this.props;

		dynamique = dynamique!==undefined?dynamique:false

			if(dynamique){
				this.scroll1Ref.current.scrollTop = this.scroll1Ref.current.scrollHeight
			}else{
				this.scroll2Ref.current.scrollTop = this.scroll2Ref.current.scrollHeight
			}
			elementPost({data:{libelle:"",prix:0,titre_lvl:0,sans_interaction:false,numerique:false,logiques:[],dynamique,devis_id:devis._id,user_id:active_user._id},cbk:(_id)=>{
				controleSet({active_element:_id})
				elementControle({dynamique});
				let nbd = dynamique?elements.reduce((total,elt)=>elt.dynamique===true?total+1:total,0):elements.length
				let d_elements = [...devis.elements]
				d_elements.splice(nbd,0,_id)
				devisUp({data:{...devis,elements:d_elements}})
				choiceUp({data:{...choice,elements:{...choice.elements,[_id]:0}}})
				choiceControle({...choice_controle,[_id]:0})
		}});
		
	}
	_elementDel({_id}){
		let {controleSet} = this.props
		let { elementDel,devisUp, choiceUp, choiceUpControle, devis, choice, logiqueDel, choice_controle } = this.props;
		elementDel({data:{_id},cbk:()=>{
			devisUp({data:{...devis,elements:devis.elements.filter(elt=>elt!==_id)}})
			let nchoice = {...choice}
			let elements = {...nchoice.elements}
			delete elements[_id]
			choiceUp({data:{...nchoice,elements}})
			logiqueDel({data:{element_id:_id}})
			let nchoice_controle = {...choice_controle}
			delete choice_controle[_id]
			choiceControle({...choice_controle})
		}});
	}
	_elementCopy({_id,id}){
		let { active_user, elements, devis } = this.props;
		let { elementPost,devisUp,choiceUp} = this.props;
		
		let element = {...elements.find(elt=>elt._id===_id)}
		delete element._id
		elementPost({data:{...element},cbk:(_idd)=>{
				let d_elements = [...devis.elements]
				d_elements.splice(id,0,_idd)
				devisUp({data:{...devis,elements:d_elements}})
				choiceUp({data:{...choice,elements:{...choice.elements,[_id]:0}}})
		}});

	}
	//•••••••••••••••••••••••••••••••••••••••••••••••••••••••••
	_logiqueControle(obj) {
		
			let { logiqueControle } = this.props;

			//logstr = typeof logstr ==="string"?logstr.split("").reduce((total,lr,i)=>CARACTERES_AUTORISES
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
		logiques = logiques.map(logi=>logique._id===logi._id?{_id,...logique,...logique_controle}:logi)

		logiqueUp({data:{_id,...logique,...logique_controle},cbk:()=>{
			this.checkLogq({logiques,save:true})
			controleSet({active_logique:-1})
		}});
		
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
			controleSet({active_logique:id,active_element:-1})
			let element = elements.find(elt=>elt._id===_id)
			elementUp({data:{...element,logiques:[...element.logiques,id]}})
		}});
		//logiqueControle();
		
	}
	_logiqueDel({_id,element_id}){

		let { logiqueDel, elementUp, elements, logiques} = this.props;
		logiqueDel({data:{_id},cbk:()=>{
			let element = elements.find(elt=>elt._id===element_id)

			this.checkLogq({logiques:logiques.filter(logq=>logq._id!==_id)})
			elementUp({data:{...element,logiques:element.logiques.filter(logq=>logq!==_id)}})
		}});
	}
	_logiqueCopy({_id}){
		let {controleSet} = this.props
		let {  logiques, elements } = this.props;
		let { logiquePost, logiqueControle, elementUp } = this.props;
		let { controle } = this.props;

		let logique = {...logiques.find(lo=>lo._id===_id)}
		delete logique._id
		logiquePost({data:{...logique},cbk:(id)=>{
			controleSet({active_logique:-1,active_element:-1})
			let element = elements.find(elt=>elt._id===logique.element_id)
			elementUp({data:{...element,logiques:[...element.logiques,id]}})
		}});
	}
	//•••••••••••••••••••••••••••••••••••••••••••••••••••••••••

	
	checkLogq({new_choice, logiques,save}){


		new_choice = new_choice? new_choice:{}
		let { choiceControle,choiceUpControle, choiceUp, choice } = this.props;
		let {  elements, elementUp } = this.props;

		save = typeof save === "boolean" ? save : false
		logiques = typeof logiques === "object" && logiques instanceof Array ? logiques : this.props.logiques		
		
		let props_choice_controle = typeof this.props.choice_controle ==="object"&&Object.keys(this.props.choice_controle).length>0?this.props.choice_controle:{...choice.elements}
		let choice_controle = new_choice?{...props_choice_controle,...new_choice}:{...props_choice_controle}


	/*==============dabord les elements dynamiques==================*/
		Object.keys(choice_controle).forEach(cc=>{

					let element = elements.find(elt=>elt._id === cc)

				if(element === undefined){
					delete choice_controle[cc]
				}else{
					let val = 0
					let eltlq = element.logiques
					let dynamique = element.dynamique
					let saufclicked = new_choice?element._id!==Object.keys(new_choice)[0]:true
	
					if(saufclicked&&dynamique){

						let lqs = [...eltlq].reduce((total,lq_id,i)=>{
						let lalogique = logiques.find(lq=>lq_id===lq._id)
						if(lalogique===undefined){
							eltlq.splice(i,1)
							return total
						}else{
							return [...total,lalogique]
						}
					},[])


					lqs.forEach(lq=>{
							let comp = this.comprendre(lq,choice_controle);
							
						if(typeof comp === "number"){
							val = comp
							choice_controle={...choice_controle,[cc]:val}
						}else if(comp ){
							
							if(!isNaN(lq.numerique_log*1)){
								val = lq.numerique_log*1
								choice_controle={...choice_controle,[cc]:val}
							}
						}
					})
					}
				}
		})
		/*==============dabord les elements dynamiques==================*/
		Object.keys(choice_controle).forEach(cc=>{
					let element = elements.find(elt=>elt._id === cc)

				if(element === undefined){
					delete choice_controle[cc]
				}else{
					let val = 0
					let eltlq = element.logiques
					let dynamique = !element.dynamique
					let saufclicked = element._id!==Object.keys(new_choice)[0]
					if(saufclicked&&dynamique){

						let lqs = [...eltlq].reduce((total,lq_id,i)=>{
						let lalogique = logiques.find(lq=>lq_id===lq._id)
						if(lalogique===undefined){
							eltlq.splice(i,1)
							return total
						}else{
							return [...total,lalogique]
						}
					},[])

					lqs.forEach(lq=>{
							let comp = this.comprendre(lq,choice_controle);
							
						if(typeof comp === "number"){
							val = comp
							choice_controle={...choice_controle,[cc]:val}
						}else if(comp ){
							if(!isNaN(lq.numerique_log*1)&&lq.numerique_log!==""){
								val = lq.numerique_log*1
								choice_controle={...choice_controle,[cc]:val}
							}
						}
					})
					}
				}
		})


			choiceControle({...choice_controle})
	}
	_choiceControle(obj) {
		
		let { choiceControle } = this.props;

		this.checkLogq({new_choice:obj})
		//choiceControle(obj);
	}

	_choiceRef(){
		let {choice, choiceControle, choice_controle} = this.props;
		choiceControle({...choice.elements})
	}

	_choiceSave({_id}){
		let { active_user } = this.props;
		let { choiceUp } = this.props;
		let { choice_controle,choice } = this.props;
		let {controleSet} = this.props

		choiceUp({data:{...choice,elements:{...choice_controle}}});
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

	comprendre(logq,choice_controle){

		let {elements, devis} = this.props;
		let logstr = logq.libelle_log
		
		if(logstr==="true"){
				return true
		}else{
			let logstr1 = typeof logstr ==="string"?logstr.split("").reduce((total,lr,i)=>CARACTERES_AUTORISES
			.indexOf(lr)>-1?total+lr:total,"").toLowerCase():"";
			logstr1.split("=>").join("")
			logstr=logstr1
			let remplace = logstr.split("id").reduce((total,lr,i)=>{
				if(lr.indexOf("_")>-1){
					let elt = elements.find(elt=>elt._id===devis.elements[lr.split("_")[0]])
					let elt_id = elt?elt._id:false
					let nb = elt_id?choice_controle[elt_id]:0

					return  nb!==undefined?total+nb+lr.split("_")[1]:total
				}else{
						return total
				}
			},"")

			try{
				return remplace !== undefined && (typeof eval(remplace) === "boolean"||typeof eval(remplace) === "number")  ? eval(remplace):false
				
			}catch{
				return false
			}
		}
	}

	verifSyntax(logstr){
		let error1=false;
		let error2=false;
		
		if(logstr==="true"){
				return {error1,error2}
		}else{
		let logstr1 = typeof logstr ==="string"?logstr.split("").reduce((total,lr,i)=>CARACTERES_AUTORISES
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
	}
	_viewDE(a){
		let {controleSet} = this.props
		controleSet({...a,active_element:-1})
	}
	//•••••••••••••••••••••••••••••••••••••••••••••••••••••••••
	elts_to_nb_page({elements}){

		let tx = []
		let nbp = 0
		let nb = 0

		elements.reduce((total,elt,i)=>{
			
			let nb1 = (19+elt.titre_lvl*5)*((Math.floor(elt.libelle.length/(80-elt.titre_lvl*5)))+1)+4
			let test = nbp<1?800:900
			if((nb+nb1)>test){
				tx.push(total)
				total = []
				nb=0
				nbp++
			}
			if(elements.length-1 === i){
				tx.push([...total,elt])
				total = []
				nb=0
				nbp++
			}

			nb = nb1+nb
			return [...total,elt]
		},[])

		return tx
	}
	_finalView(){
		let {controleSet,set} = this.props
		controleSet({dsactif:!set.dsactif})
	}

	render(){
		let { edit, active_user, devis,
			devis_controle,element_controle,logique_controle,choice_controle, 
			elements, logiques,entreprises,choice,set,windowheight, windowwidth } = this.props;
		let {controleSet} = this.props
		let	{menu, draged, souris_x,souris_y, dsactif}=set;

		let { libelle,prix,numerique } = element_controle;
		let { titre,entreprise,client } = devis_controle;
		let { libelle_log,prix_log,numerique_log } = logique_controle;

		elements = typeof elements !== undefined && typeof elements === "object" && elements instanceof Array && elements.length >0? 
			devis && devis.elements?devis.elements.reduce((total,elt_id)=>elements.find(elt=>elt._id===elt_id)?[...total,elements.find(elt=>elt._id===elt_id)]:total,[]):[]
			:[];
		elements = elements.map((elt,i)=>{return{...elt,id:i}})

		let elements_F = elements.filter(elt=>elt.dynamique!==true) 
		let elements_D = elements.filter(elt=>elt.dynamique===true)
		

		dsactif = dsactif&&edit
		let elements_to_show = !dsactif?elements_F.reduce((total,elt)=>choice_controle[elt._id]?[...total,elt]:total,[]):elements_F

			let elt_dgd = elements.find(elt=>elt._id===draged)?elements.find(elt=>elt._id===draged):""

			logiques = typeof logiques !== undefined && typeof logiques === "object" && logiques instanceof Array&& logiques.length >0 ? 
				logiques.reduce((total,logq,i)=>[...total,{...logq,...this.verifSyntax(logq.libelle_log)}],[])
			:[]

			elements_to_show = elements_to_show.map((elt,j)=>{
				let nv_prix = elt.prix
				let logqs = typeof logiques !== undefined && typeof logiques === "object" && logiques instanceof Array&& logiques.length >0 &&elt && elt.logiques ? 
				elt.logiques.reduce((total,elo)=>logiques.find(logq=>logq._id === elo)?[...total,logiques.find(logq=>logq._id === elo)]:total,[]):[]
				logqs.map(logq=>{
					nv_prix = logq.prix_log !== undefined && logq.prix_log !== "" && typeof (logq.prix_log*1) === "number" && this.comprendre(logq,choice_controle)  ?
					logq.prix_log:nv_prix
				})
				return {...elt, 
					prix: nv_prix
				}
			})


		let prix_total = elements_to_show.reduce((total,element,i)=>{
				let choice = choice_controle&&choice_controle?choice_controle[element._id]:0
					
				 choice = typeof choice !== "undefined" && typeof choice === "boolean" && choice===true?1:
				 	typeof choice!== "undefined" && typeof choice === "boolean"&&choice===false?0:
					typeof choice!== "undefined" && typeof (choice*1) === "number"?choice:0;

				return total+choice * (element.prix?element.prix:0)*(devis.tjm?devis.tjm:1)
		},0)
		menu = windowwidth < 600&&menu===1?0:menu
		// POUR L'AFFICHAGE => à la fin !!!
		elements_to_show = this.elts_to_nb_page({elements:elements_to_show})
		return (
			<div style={{ 
				display:"flex", 
				flexDirection:"column", 
				width:"100%", 
				height:"100%", 
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
						height:"100%"}}>
					
					{edit?<div style={{
						transitionDuration: "0.5s",
						flex:menu===0||menu===1?1:0,
						width:"auto",
						height:"100%",
						overflow:"hidden"

				}}><DevisEdit
							scroll1Ref={this.scroll1Ref}
							scroll2Ref={this.scroll2Ref}
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
							
								{edit?<div style={{
											transitionDuration: "0.1s",
											width:50,
											display:"flex",
											flexDirection:"column",
											backgroundColor:"rgba(230,230,230)"
										}}>
											{menu!==0?<div className="imgbutt" onClick={()=>{controleSet({menu:0})}}> {">>"} </div>:""}
											{menu!==1&&windowwidth > 600?<div className="imgbutt" onClick={()=>{controleSet({menu:1})}}> {menu===0?"<":">"} </div>:""}
											{menu!==2?<div className="imgbutt" onClick={()=>{controleSet({menu:2})}}> {"<<"} </div>:""}
								</div>:""}
					<div style={{
						transitionDuration: "0.5s",
						flex:menu===1||menu===2?1:0,
						width:"auto",
						height:"100%",
						overflow:"hidden",
						display:"flex",
						flexDirection:"column",


				}}>	
								<div style={{display:"flex",width:"100%",flexDirection:"column",backgroundColor:"rgba(230,230,230)"}}>
				
				<div style={{display:"flex",flex:1,justifyContent:"space-between",marginTop:10}}>
					<div style={{display:"flex", flexDirection:"column",alignItems:"center", flex:1}}>
							<span style={{fontSize:"26px",fontWeight:"bold"}}>
								Composez votre devis :
							</span>
						</div>
				</div>
				</div>
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
									elements={elements_D}
									edit = {edit}

									choices={""}
									prix_total= {prix_total}
									choice_controle={choice_controle}
									onChange = {this._choiceControle} 
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
										{edit?<div className="imgbutt" title="Vue du client" onClick={this._finalView} style={{ backgroundImage:"url('/image/eye.png')"}}></div>:""}
										<div className="imgbutt" title="télécharger une version imprimable" onClick={this._desactiveForPrint} style={{ backgroundImage:"url('/image/printer.png')"}}></div>
										<div className="imgbutt" title="sauvegarder les choix" onClick={this._choiceSave} style={{ backgroundImage:"url('/image/floppy.png')"}}></div>
										<div className="imgbutt" title="restituer les choix sauvegardés" onClick={this._choiceRef} style={{ backgroundImage:"url('/image/refresh.png')"}}></div>
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
									elements={elements_to_show}
									contractuel={devis.contractuel}
									faitle={devis.faitle}
									choices={""}
									choice_controle={choice_controle}
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
			elements_loading: state.element.got.data_loading,
			devis_controle: state.devis.controle,
			devis: state.devis.got1.data,
			devis_loading: state.devis.got1.data_loading,
			deviss: state.devis.got.data,
			logiques: state.logique.got.data,
			logiques_loading: state.logique.got.data_loading,
			logique_controle: state.logique.controle,
			choice_controle: state.choice.controle,
			entreprises: state.entreprise.got.data,
			entreprises_loading: state.entreprise.got.data_loading,
			choice:state.choice.got1.data,
			choice_loading:state.choice.got1.data_loading,
			windowheight:state.controle.resize.windowheight,
			windowwidth:state.controle.resize.windowwidth,
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
			choiceUpControle: choice.upcontrole,
			choiceDel: choice.del,
			
			entrepriseGet: entreprise.get,

			controleSet: controle.set

	}, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( Devis );
