import React, { Component } from 'react';

import { Route, Switch, Redirect, useParams } from 'react-router-dom';

import {
	ErrorPage, 
	NotFound, 
	Home,
	MonEntreprise,
	DevisList,
	Devis,
	DevisNC,
} from '../../imports/4_pages';

import {
	Admin,
  AddToAdmin,
  RemoveFromAdmin
} from '../../imports/user/5_smartComponent';

//const NotFoundRedirect = () => withRouter(<Redirect to="/404" />);

export default class Routes extends Component {

	render() {
		return (
			<Switch>
				
					<Route exact path="/" component={() => (
								<Home user_id={Meteor.userId()}/>
						)} />
				
				
					<Route
						path="/entreprises"
						component={() => (
								Meteor.userId()?<MonEntreprise user_id={Meteor.userId()}/>: <Redirect to="/" />
						)}
					/>
				

					<Route
						path="/devis_list"
						component={() => (
								Meteor.userId()?<DevisList user_id={Meteor.userId()}/>: <Redirect to="/" />
						)}
					/>
					
					<Route
						path="/devis/:id/:edit"
						component={() => (
								Meteor.userId()?<Devis edit={useParams().edit==="edit"} devis_id={useParams().id} user_id={Meteor.userId()}/>: <Redirect to="/" />
						)}
					/>
					<Route
						path="/devis/:id/"
						component={() => (
								<DevisNC devis_id={useParams().id} />
						)}
					/>
					<Route
						path="/addToAdmin/"
						component={() => (
								<AddToAdmin />
						)}
					/>
					<Route
						path="/removeFromAdmin/"
						component={() => (
								<RemoveFromAdmin />
						)}
					/>
					<Route
						path="/admin/"
						component={() => (
								<Admin/>
						)}
					/>
				<Route
					path="/400"
					component={() => (
						<ErrorPage
							title={'error.http.bad-request.title'}
							message={'error.http.bad-request.message'}
						/>
					)}
				/>
				<Route
					path="/401"
					component={() => (
						<ErrorPage
							title={'error.http.unauthorized.title'}
							message={'error.http.unauthorized.message'}
						/>
					)}
				/>
				<Route
					path="/403"
					component={() => (
						<ErrorPage
							title={'error.http.forbidden.title'}
							message={'error.http.forbidden.message'}
						/>
					)}
				/>
				<Route path="/404" component={NotFound} />

				<Route
					path="/500"
					component={() => (
						<ErrorPage
							title={'error.http.internal-server-error.title'}
							message={'error.http.internal-server-error.message'}
						/>
					)}
				/>
				<Route
					path="/503"
					component={() => (
						<ErrorPage
							title={'error.http.service-unavailable.title'}
							message={'error.http.service-unavailable.message'}
						/>
					)}
				/>
				<Route component={NotFound} />
			</Switch>
		);
	}
}
