import React, { Component }	from 'react';
import { bindActionCreators }	from 'redux';
import { connect } 				from 'react-redux';

import { menu } from '../../6_actions';

import { Link } from 'react-router-dom';

import './smartMenu.css';


// preparation of Menu at the top
class SmartMenu extends Component {

	ITEMS(){
		let {active_user} = this.props;

		let user_id = active_user !== undefined && typeof active_user === "object" && active_user !== null &&
		typeof active_user._id === "string" && active_user._id.length>0
		return [
			{id: "devis_list",title:"Devis",display:user_id,actif:true},
			{id: "entreprises",title:"Entreprises",display:user_id,actif:true},
			{id: "home",title:"Accueil",display:true,actif:true},
			]}

	render() {
			let {location} = this.props;
			let {pathname} = location;

		return (
			//disposition of Items
			<nav className="sm_nav">
			<ul className="sm_ul">
				{
					this.ITEMS().reduce((total,item,i)=>{
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
			active_user:state.user.active_user
		}
	);
}

function mapDispatchToProps( dispatch ){
	return bindActionCreators({
	

	}, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( SmartMenu );
