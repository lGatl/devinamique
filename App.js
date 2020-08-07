import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware } from 'redux';
//import ReduxPromise from 'redux-promise';
import thunk from 'redux-thunk';

import { Router } from 'react-router-dom';

import history from "./history";

import rootReducer from './imports/7_reducers';


import Routes from './imports/2_routes/routes';

import { SmartMenu, Resize, Kon } from './imports/_common/5_smartComponent';

import { User } from './imports/user/5_smartComponent';


import { withRouter } from 'react-router-dom';



import './App.css';

let Store = {};
	
	const composeEnhancers = composeWithDevTools({});
	Store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));


const SmartMenuR = withRouter(props => <SmartMenu {...props} />);

class App extends Component {
	constructor(props) {
		super(props);
		this.timeStartLoad = Date.now();

		this.initApp = true;
	}

	render() {
		return !this.initApp ? (
			<div className="App">
			loading
			</div>
		) : (
			<Provider store={Store}>
				<Router history={history}>
				<div 
					className="App" 
					style ={{display:"flex", flexDirection:"row"}}
				>
					<Resize/>
					<User/>
					<div style ={{display:"flex", flexDirection:"column", width:"100%",height:"100%"}}>
							<div style={{width:"100%", display:"flex"}}>
								<SmartMenuR/>
								<Kon/>
							</div>
							<div style={{marginTop:"80px",display:"flex", flexDirection:"column", alignItems:"center",width:"100%",height:"100%",boxSizing:"border-box",overflow:"hidden"}}>
								<Routes />
							</div>
					</div>	
				</div>
				
				</Router>
			</Provider>
		);
	}
}

export default App;
