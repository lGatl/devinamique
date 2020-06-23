import React, { Component } from 'react';

import { Route, Switch, useParams } from 'react-router-dom';

import {
	ErrorPage, 
	NotFound, 
	Home,
	MonEntreprise,
	DevisList,
	Devis

} from '../../imports/4_pages';

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
								<MonEntreprise user_id={Meteor.userId()}/>
						)}
					/>
				

					<Route
						path="/devis_list"
						component={() => (
								<DevisList user_id={Meteor.userId()}/>
						)}
					/>
					<Route
						path="/devis/:id"
						component={() => (
								<Devis devis_id={useParams().id} user_id={Meteor.userId()}/>
						)}
					/>
					{/*
					<Route
						path="/attention"
						component={() => (
								<Attention active/>
						)}
					/>

					<Route
						path="/video"
						component={() => (
								<Vidéo active/>
						)}
					/>
					<Route
						path="/rendezvous"
						component={() => (
								<RendezVous/>
						)}
					/>
					<Route
						path="/diaporama"
						component={() => (
								<Diaporama/>
						)}
					/>*/}
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
