import React, { Component }	from 'react';
import { bindActionCreators }	from 'redux';
import { connect } 				from 'react-redux';

import { menu } from '../../6_actions';

import { Link } from 'react-router-dom';

import './smartMenu.css';

	export const ITEMS = [
		{id: "devis_list",title:"Devis",display:Meteor.userId(),actif:true},
		{id: "entreprises",title:"Entreprises",display:Meteor.userId(),actif:true},
		{id: "home",title:"Accueil",display:true,actif:true},
		]

// preparation of Menu at the top
class SmartMenu extends Component {

	render() {
			let {location} = this.props;
			let {pathname} = location;

		return (
			//disposition of Items
			<nav className="sm_nav">
			<ul className="sm_ul">
				{
					ITEMS.reduce((total,item,i)=>{
						let classe = item.className?"sm_"+item.className:"";
						classe = "/"+item.id === pathname||(pathname==="/"&&item.id === "home")?classe+" sm_active":classe
						return item.display?[...total,<li className={classe} key={i}> 
							<Link to={item.id==="home"?"/":"/"+item.id}>
								{item.image?<img className="logo"
				     src={item.image}
				     alt="logo"/>:<span>{item.title}</span>}
							</Link>
						</li>]:"";
						},[])
				}
			</ul>
				
			</nav>
		);
	}
}

function mapStateToProps(state){
	return (
		{
		}
	);
}

function mapDispatchToProps( dispatch ){
	return bindActionCreators({
	

	}, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( SmartMenu );
