import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { HashRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import StoreProvider from './store-provider';
import App from './app';
import ConfirmEmailPage from './pages-test/ConfirmEmailPage';
import PagePage from './pages-test/PagePage';
import ConfirmResetPasswordPage from './pages-test/ConfirmResetPasswordPage';
import LoginPage from './pages-test/LoginPage';
import RegisterPage from './pages-test/RegisterPage';
import ResetPasswordPage from './pages-test/ResetPasswordPage';
import ForgotPasswordPage from './pages-test/ForgotPasswordPage';
import HomePage from './pages-test/HomePage';
import DashboardPage from './pages-test/DashboardPage';
import ResourcesPage from './pages-test/ResourcesPage';

import reducer from './redux/reducer.js';
import mainSaga from './sagas/saga.js';
import myMiddleware from './redux/middleware.js';

import * as Components from './components/dittofi-components.js';

Object.entries(Components).forEach(([componentName, component]) => {
	// Check if the component is a function (React component)
	if (typeof component === 'function') {
		Components.registerComponent(componentName, component);
	}
});

class _AppRouter extends React.Component {
	render() {
		let {
			state
		} = this.props;

		return (
			<div style={{height:"100%", width:"100%"}}>
					<Switch>
							
							<Route  exact  path="/confirm_email">
								<ConfirmEmailPage/>
							</Route>
							
							<Route  exact  path="/Page">
								<PagePage/>
							</Route>
							
							<Route  exact  path="/reset_password_confirm">
								<ConfirmResetPasswordPage/>
							</Route>
							
							<Route
								 exact 
								path="/login"
								render={() =>
										
state.reducer['isLoggedIn']
 == 
state.reducer['true']
 ? <Redirect to="/dashboard" /> :
								 <LoginPage/>
								}
							/>
							
							<Route
								 exact 
								path="/register"
								render={() =>
										
state.reducer['isLoggedIn']
 == 
state.reducer['true']
 ? <Redirect to="/dashboard" /> :
								 <RegisterPage/>
								}
							/>
							
							<Route  exact  path="/reset-password">
								<ResetPasswordPage/>
							</Route>
							
							<Route  exact  path="/forgot-password">
								<ForgotPasswordPage/>
							</Route>
							
							<Route  exact  path="/">
								<HomePage/>
							</Route>
							
							<Route
								 exact 
								path="/dashboard"
								render={() =>
										
state.reducer['isLoggedIn']
 == 
state.reducer['false']
 ? <Redirect to="/login" /> :
								 <DashboardPage/>
								}
							/>
							
							<Route  exact  path="/resources">
								<ResourcesPage/>
							</Route>
					</Switch>
			</div>
		);
	}
}

const mapStateToProps = function(state){
		return {
			state: state
		}
}

const AppRouter = connect(mapStateToProps, null)( _AppRouter );

ReactDOM.render(
	<StoreProvider>
		<Router>
			<Components.ErrorBoundary>
				<App>
					<AppRouter />
				</App>
			</Components.ErrorBoundary>
		</Router>
	</StoreProvider>, document.getElementById('root')
);

