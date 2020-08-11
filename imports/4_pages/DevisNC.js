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
	Input
} from '../_common/4_dumbComponent';

import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

import "./devis.css"

import { throttle } from '../8_libs';
const CARACTERES_AUTORISES = ["i","d","_","*","<",">","!","=","&","|","0","1","2","3","4","5","6","7","8","9","(",")"]

class DevisNC extends Component {
	constructor(props){
		super(props)	

		this._choiceControle = this._choiceControle.bind(this)
		this._choiceRef = this._choiceRef.bind(this)
		this._choiceSave = this._choiceSave.bind(this)

		this._printDocument = this._printDocument.bind(this)
		this._onChangePass = this._onChangePass.bind(this)
		this._desactiveForPrint = this._desactiveForPrint.bind(this)

		this.checkLogq = this.checkLogq.bind(this)

		
}
	
	componentDidMount() {
		let { devis_id, 
			devisGet1, devisGet1Start, 
			elementGet,elementGetStart, 
			logiqueGet,  logiqueGetStart, 
			choiceGet1, choiceGet1Start, choicePost, edit, user_id, choiceControle,controleSet, elements,
		 devisUp
		} = this.props;

		controleSet({
			premierup:true,
			menu:1,
			draged:false,
			view1:1,
			view2:1,
			view3:1,
			print:false,
			password:false,
			pass:"",
		})

		devisGet1Start({data:{_id:devis_id}})
		elementGetStart({data:{devis_id}})
		choiceGet1Start({data:{devis_id}})
		logiqueGetStart({data:{devis_id}})

		devisGet1({data:{_id:devis_id}})
		
		elementGet({data:{devis_id}})
		choiceGet1({data:{devis_id}})
		logiqueGet({data:{devis_id}})
	}
	

	componentDidUpdate(prevProps, prevState){

		let {controleSet, choiceUp, devisUp, choice_controle, choiceControle, choicePost, choiceGet1, entrepriseGet,
		 user_id, set,elements, devis, choice, logiques,
					elements_loading, devis_loading, choice_loading, logiques_loading} = this.props
					elements = typeof elements === "object" && elements instanceof Array ? elements : false; 
					devis = typeof devis === "object"  ? devis : false;
					choice =  typeof choice === "object" ?choice : false;
					
					logiques = typeof logiques === "object" && logiques instanceof Array ? logiques : false; 
					if (elements&& devis&& choice&& logiques&& set.premierup===true&&
							!elements_loading&&!devis_loading&& !choice_loading&& !logiques_loading){
								
						entrepriseGet({data:{_id:{$in:[devis.entreprise,devis.client]}}})
						controleSet({premierup:false})
						choiceControle({...choice.elements})
						this.checkLogq({logiques,save:true})
						if(choice === null||elements.length !== Object.keys(choice.elements).length) {
							console.log("ANOMALIE")
							console.log("elements.length", elements.length);
							console.log("Object.keys(choice).length", Object.keys(choice.elements).length);
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
							}) 
						console.log("ok")*/
						}
					}
		if(prevProps.set.print===false && this.props.set.print===true){

			this._printDocument()
		}
	}
	_onChangePass(obj){
		let {name,value}=obj;

		let {controleSet, devis} = this.props
		controleSet({[name]:value})
		if(value===devis.password){
			controleSet({password:true})
		}
	}
	_desactiveForPrint(){
		let {controleSet} = this.props
		controleSet({ print:true})
	}
	recurshtml2can(pdf,inputs,count){
		let {controleSet,devis} = this.props
		html2canvas(inputs[inputs.length-count])
	      .then((canvas) => {
	        const imgData = canvas.toDataURL('image/png');
	        
	        pdf.addImage(imgData, 'JPEG', 0, 0,210,297);
	       count=count-1
	       	if(count>0){
	       		pdf.addPage()
						this.recurshtml2can(pdf,inputs,count)
	       	}else{
	       		pdf.save(devis&&devis.titre?"devis_"+devis.titre+".pdf":"devis.pdf");
	        	controleSet({print:false})
	       	}
	        
	      })
	}
	_printDocument() {
		let {controleSet,devis} = this.props
		let inputs = document.getElementsByClassName("divToPrint")

    if(inputs!==null){
 			var count=inputs.length;
 			const pdf = new jsPDF();

 			this.recurshtml2can(pdf,inputs,count,devis)
	    
    }
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
		let { choiceUp } = this.props;
		let { choice_controle,choice } = this.props;
		let {controleSet} = this.props

		choiceUp({data:{...choice,elements:{...choice_controle}}});
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
	

	render(){
		let { edit, devis,
			devis_controle,element_controle,logique_controle,choice_controle, 
			elements, logiques,entreprises,choice,set,windowheight,windowwidth } = this.props;
		let {controleSet} = this.props
		let	{menu}=set;

		let { libelle,prix,numerique } = element_controle;
		let { titre,entreprise,client } = devis_controle;
		let { libelle_log,prix_log,numerique_log } = logique_controle;

		elements = typeof elements !== undefined && typeof elements === "object" && elements instanceof Array && elements.length >0? 
			devis && devis.elements?devis.elements.reduce((total,elt_id)=>elements.find(elt=>elt._id===elt_id)?[...total,elements.find(elt=>elt._id===elt_id)]:total,[]):[]
			:[];
		elements = elements.map((elt,i)=>{return{...elt,id:i}})

		let elements_F = elements.filter(elt=>elt.dynamique!==true) 
		let elements_D = elements.filter(elt=>elt.dynamique===true)
		

		let dsactif = false
		let elements_to_show = !dsactif?elements_F.reduce((total,elt)=>choice_controle[elt._id]?[...total,elt]:total,[]):elements_F


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

		// POUR L'AFFICHAGE => à la fin !!!
		elements_to_show = this.elts_to_nb_page({elements:elements_to_show})
		return (
			set.password?<div style={{ 
				display:"flex", 
				flexDirection:"column", 
				width:"100%", 
				height:windowheight?windowheight-80:4000, 
				userSelect:"none"}}>

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
									edit = {false}

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
									choices={""}
									choice_controle={choice_controle}
									/>
							</div>: 
							<div>
								<Input
											style={{width:200}}

											label="Password"
											type="password"
											placeholder=""
											name={"pass"}
											onChange={this._onChangePass}
											value={set.pass}
											active
										/>
							</div>
		);
	}
}

function mapStateToProps( state ){
	return (
		{
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
			devisGet1Start: devis.get1Start,
	
			elementGet: element.get,
			elementGetStart: element.getStart,

			logiqueGet: logique.get,
			logiqueGetStart: logique.getStart,

			choiceControle: choice.controle,
			choiceGet1: choice.get1,
			choiceGet1Start: choice.get1Start,
			choiceUp: choice.up,
			
			entrepriseGet: entreprise.get,
			entrepriseGetStart: entreprise.getStart,

			controleSet: controle.set

	}, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( DevisNC );
