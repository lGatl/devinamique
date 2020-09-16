import React, { Component } from 'react';

import { 
	Dropdown,
	Checkbox,
	Input,
	Button
} from '../../_common/4_dumbComponent';

import { dateToFormat } from '../../8_libs';

export default class DevisShow extends Component {

	
	elts_to_nb_page({elements}){

		let tx = []
		let nbp = 0
		let nb = 0

		elements.reduce((total,elt,i)=>{
			
			let nb1 = (19+elt.titre_lvl*5)*((Math.floor(elt.libelle.length/(80-elt.titre_lvl*5)))+1)+4

			if((nb+nb1)>800){
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
	render() {
			let {entreprise, client,devis, elements, choice_controle, prix_total, menu, contractuel,faitle, dsactif} = this.props;
			entreprise=typeof entreprise !== "undefined" && typeof entreprise === "object"?entreprise:{};
			let {nom,telephone,courriel,adresse,site_internet,siret,tva_intracom}=entreprise;

			let laDate = faitle?new Date(faitle):new Date(Date.now())
		return (
			<div style={{
				transition:"0.5s",
				boxShadow: "-1px 2px 10px 3px rgba(0, 0, 0, 0.3) inset",
				display:"flex", 
				flexDirection:"column", 
				flex:1,

				alignItems:"flex-start",
				justifyContent:"flex-start",
				overflow:"scroll",
				zIndex:50,
				...this.props.style
			}}
			>
			<div style={{display:"flex", flexDirection:"column",top:0,width:"100%"}}>
				
			
			{elements.map((eltt,i)=><div key={i} style={{
				transition:"0.5s",
				width:"100%",
				display:"flex",
				justifyContent:"center",
				alignItems:"center",
			  minHeight:"36cm",
			  minWidth:"30cm",
			  zIndex:60
			}}>

			<div className="divToPrint" ref={this.props.refPages} style={{
							display:"flex",
			        flexDirection:"column",
			        width:"21cm",
			        height:"29.7cm",
			        
							background:contractuel?"white":"center/80% no-repeat url('/image/non_contractuel.png') white",
			        zIndex:80,
			        padding:"60px 100px 70px 100px",
			        fontSize:12
						}}>
			
	
				{/*adresse de l'entreprise*/}
				<div style={{display:"flex",flexDirection:"column",width:"100%",height:"100%"}}>
				{i<1?<div>
				<div style={{display:"flex",width:"100%",justifyContent:"space-between"}}>
					<div style={{display:"flex", flexDirection:"column",alignItems:"flex-start"}}>
						<span>
							{nom}
						</span>
						<span>
							{telephone}
						</span>
						<a href={courriel}>
							{courriel}
						</a>
						{adresse?adresse.split(/\n/).map((str,i)=><span key={i}>{str}</span>):""}
					</div>
					<div style={{display:"flex", flexDirection:"column",alignItems:"flex-end"}}>
						<span>siret : {typeof siret === "string"?siret.slice(0,3)+" "+siret.slice(3,6)+" "+siret.slice(6,9)+" "+siret.slice(9):""}</span>
						<span>TVA intracomm : {typeof tva_intracom === "string"? tva_intracom.slice(0,2)+" "+tva_intracom.slice(2,4)+" "+tva_intracom.slice(4):""}</span>
					</div>
				</div>
				<div style={{display:"flex",width:"100%",justifyContent:"space-between",marginTop:40}}>
					<div style={{display:"flex", flexDirection:"column",alignItems:"center", flex:1}}>
							<span style={{fontSize:"26px"}}>
								DEVIS
							</span>
							<span style={{fontSize:"18px"}}>
								{devis.titre}
							</span>
						</div>
					<div style={{display:"flex", flexDirection:"column",alignItems:"flex-start", flex:1, border:"1px solid black",padding:5}}>
							<span style={{marginBottom:"10px",fontSize:"16px"}}>
								le {laDate.getDate()+"/"+(laDate.getMonth()+1)+"/"+laDate.getFullYear()}
							</span>
							<span>
								{client?client.nom:""}
							</span>
								{client?client.adresse.split(/\n/).map((str,i)=><span key={i}>{str}</span>):""}
					</div>
				</div>
				</div>:""}
				<div style={{display:"flex",padding:"5px",border:"1px solid black",marginTop:20, justifyContent:"center",alignItems:"center"}}>
					{dsactif?<div style={{flex:1,justifyContent:"center",display:"flex",color:"rgb(200,200,200)"}}><span>id</span></div>:""}
					<span style={{flex:5}}>prestation</span>
					<div style={{flex:1}}><span>{devis.unite}</span></div>
					<div style={{flex:1}}><span>quantité</span></div>
				</div>
				
				<div style={{border:"1px solid black",borderTop:"none"}}>
				{eltt.map((element,i)=><div key={i} style={{
					color:choice_controle[element._id]!==0?"black":"rgb(175,175,175)",
					fontSize:element.titre_lvl?((5*element.titre_lvl+14)+"px"):"14px",
					fontWeight:element.titre_lvl?(50*element.titre_lvl+400):"normal",
					display:"flex",padding:"2px 5px",borderTop:"none" }}>
					{dsactif?<div style={{flex:1,justifyContent:"center",display:"flex",color:"rgb(175,175,175)"}}><span>{element.id}</span></div>:""}
					<div style={{flex:5,display:"flex",alignItems:"center",justifyContent:"flex-start"}}><span>{element.libelle}</span></div>
					<div style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center"}}><span>{element.prix}</span></div>
					<div style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center"}}>	
						{!element.sans_interaction?!element.numerique?!dsactif?<div style={{minHeight:19}}></div>:<Checkbox
									label = ""
									name = {element._id}
									checked = { choice_controle[element._id]||false }
									onChange = {()=>{} }
									active = {false}
								/>: <span>{choice_controle[element._id]}</span>:""}
					</div>
				</div>)}
				</div>
			
			{i===elements.length-1?<div style={{display:"flex",width:"100%",justifyContent:"flex-end", marginTop:"10px"}}>
							<div style={{display:"flex",justifyContent:"space-between", flex:1}}>
								<div style={{display:"flex",flex:1, flexDirection:"column",alignItems:"flex-start",border:"1px solid black",padding:"5px"}}>
									<span>nb de {devis.unite}</span>
								</div>
								<div style={{display:"flex",flex:1, flexDirection:"column",alignItems:"flex-end",border:"1px solid black",padding:"5px",borderLeft:"none"}}>
									<div><span style={{fontWeight:"bold"}}>{prix_total/(devis.tjm?devis.tjm:1)}</span> 
									<span style={{}}>{" "+devis.unite}(s)</span></div>
									
								</div>
							</div>
							{devis.delais?<div style={{display:"flex",justifyContent:"space-between",marginLeft:"10px", flex:1}}>
								<div style={{display:"flex",flex:1, flexDirection:"column",alignItems:"flex-start",border:"1px solid black",padding:"5px"}}>
									<span>Delais</span>
								</div>
								<div style={{display:"flex",flex:1, flexDirection:"column",alignItems:"flex-end",border:"1px solid black",padding:"5px",borderLeft:"none"}}>
									<div><span style={{fontWeight:"bold"}}>{((prix_total/(devis.tjm?devis.tjm:1))*(devis.delais?devis.delais:1)).toFixed(2)}</span> 
									<span style={{}}>{" "+(devis.unitedelais?devis.unitedelais:devis.unite)}</span></div>
								</div>
							</div>:""}

							<div style={{display:"flex",flex:1,justifyContent:"space-between",marginLeft:"10px"}}>
								<div style={{display:"flex",flex:1, flexDirection:"column",alignItems:"flex-start",border:"1px solid black",padding:"5px"}}>
									<span>Prix d'un {devis.unite}</span>
								</div>
								<div style={{display:"flex",flex:1, flexDirection:"column",alignItems:"flex-end",border:"1px solid black",padding:"5px",borderLeft:"none"}}>
									<div><span style={{fontWeight:"bold"}}>{(devis.tjm?devis.tjm:1)}</span> 
									<span style={{}}>€/({devis.unite})</span></div>
								</div>
							</div>
						</div>:""
			}

			{i===elements.length-1?<div style={{display:"flex",width:"100%",justifyContent:"flex-end", marginTop:"10px"}}>
							<div style={{display:"flex",justifyContent:"space-between", flex:1}}>
								<div style={{display:"flex",flex:1, flexDirection:"column",alignItems:"flex-start",border:"1px solid black",padding:"5px"}}>
									<span>Prix</span>
								</div>

								<div style={{display:"flex",flex:1, flexDirection:"column",alignItems:"flex-end",border:"1px solid black",padding:"5px",borderLeft:"none"}}>
									<span style={{fontWeight:"bold"}}>{prix_total} HT</span>
									<span>{prix_total+prix_total*20/100} TTC</span>
								</div>
							</div>
							<div style={{display:"flex",flex:1,justifyContent:"space-between",marginLeft:"10px"}}>
								<div style={{display:"flex",flex:1, flexDirection:"column",alignItems:"flex-start",border:"1px solid black",padding:"5px"}}>
									<span>TVA</span>
								</div>
								<div style={{display:"flex",flex:1, flexDirection:"column",alignItems:"flex-end",border:"1px solid black",padding:"5px",borderLeft:"none"}}>
									<span>20% HT</span>
									<span>{prix_total*20/100} TTC</span>
								</div>
							</div>
						</div>:""
			}

			<div style={{display:"flex",width:"100%",justifyContent:"space-between",flex:1}}>
			
			</div>
			{i===elements.length-1?<div style={{display:"flex",justifyContent:"space-between"}}>
					<div style={{display:"flex",flex:1, flexDirection:"column",alignItems:"flex-start",border:"1px solid black",padding:"5px"}}>
						<span></span>
					</div>
					<div style={{display:"flex",flex:1, flexDirection:"column",alignItems:"flex-end",border:"1px solid black",padding:"5px",borderLeft:"none"}}>
						<span></span>
						<span></span>
					</div>
			</div>:""}
			</div>
			
			</div>
				
			</div>)}
			</div>	
		</div>
			
		);
	}
}
	
