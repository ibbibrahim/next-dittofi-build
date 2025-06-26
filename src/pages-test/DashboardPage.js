import React, { Children, cloneElement, Fragment, isValidElement, PureComponent, useEffect, useRef, useState, useCallback } from "react";
import ReactDOM from 'react-dom';
import { connect } from "react-redux";
import { useLocation, useParams, useHistory } from "react-router-dom";
import { get } from 'lodash';
import _ from 'lodash';
import { Area, Bar, CartesianGrid, ComposedChart, Legend, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import { 
	Chart, PieChart, RichTextEditor, RichText, 
	ToggleWrapper, Tabs, Slider, Form, MountHandler,
	Draggable, ErrorBoundary, toISOString, 
	toLocalString, ZoomablePannable, Progress, RangeSlider,
	getFileUrl, Select, MapBox, Marker, DynamicComponent,
	Link
} from "../components/dittofi-components";

function Container(props) {
	let {
		dispatch,
			currentUser,
	} = props;

	const [tasks, setTasks] = useState({});
	let history = useHistory();

	var startPoll = (action) => {
	    console.log(`Starting poll for action ${action.name}`);

	    // Prevent polling the same action more than once.
	    if(tasks[action.name]) {
	        console.warn(`You're attempting to poll ${action.name} but it is already being polled.`);
	        return;
	    }
	    
	    // Handle stopping poll.
	    let canceled = false;
	    const cancel = () => canceled = true;

	    // Poll action.
	    const poll = () => {
	        console.log(`Polling action ${action.name}`);

	        if(canceled) {
	            return;
	        }

	        dispatch({ 
		        type: action.name, 
		        history: history, 
		        inputVariables: action.payload ? action.payload : {}
	        });
	        
	        setTimeout(() => poll(), action.pollingPeriod);
	    }

	    setTasks({...tasks, [action.name]: cancel});
	    poll();
	}

	var stopPoll = (actionName) => {	    
	    console.log(`Stopping poll for action ${actionName}`);

	    // Check task exists.
	    if(!tasks[actionName]) {
	        console.warn(`You're attempting to stop polling ${actionName} but this action is not running.`);
	        return;
	    }

	    tasks[actionName]();
	}

	var runAction = (action) => {
		if(action.pollingPeriod && action.pollingPeriod > 0) {
			startPoll(action);
		} else {
			dispatch({
				inputVariables: action.payload ? action.payload : {},
				params: { 
				},
				history: history,
				type: action.name,
				timeout: action.timeout && action.timeout > 0 ? action.timeout : null,
			});
		}
	}

	useEffect(() => {
		return () => {
			Object.keys(tasks).forEach((t) => stopPoll(t));
		}
	}, [tasks]);

	useEffect(() => {
		window.scrollTo(0, 0);
		/* TODO - run sagas on page mount (be sure not to rerun in page parameter change hook) */
	}, []);

	return (
		<ErrorBoundary>
			
				
	<div className="dashboard"
	>
			
	<div
	>
			
	<nav className="sidebar border-end px-4 py-3 bg-white"
	>
			
	<a className="d-inline-block w-100 d-flex align-items-center text-decoration-none text-dark mb-5" href="#" target="_self" type="external"
	>
			
	<img className="me-3" src=" https://dittofipublicfiles.s3.us-west-2.amazonaws.com/5621/11431-logo-purple.png"
	>
	</img>

			
	<h4 id="iw5i"
	>
			Starter App
	</h4>

	</a>

			
	<div className="my-3 pb-3 border-bottom"
	>
			
	<h4 className="text-uppercase small"
	>
			Dashboards
	</h4>

			
	<a className="d-inline-block w-100 d-flex align-items-center text-decoration-none text-dark py-2" href="#" target="_self" type="external"
	>
			
	<i className="fas fa-check-square"
	>
	</i>

			
	<span className="ms-2"
	>
			Menu Item
	</span>

	</a>

			
	<a className="d-inline-block w-100 d-flex align-items-center text-decoration-none text-dark py-2" href="#" target="_self" type="external"
	>
			
	<i className="fas fa-check-square"
	>
	</i>

			
	<span className="ms-2"
	>
			Menu Item
	</span>

	</a>

			
	<a className="d-inline-block w-100 d-flex align-items-center text-decoration-none text-dark py-2" href="#" target="_self" type="external"
	>
			
	<i className="fas fa-check-square"
	>
	</i>

			
	<span className="ms-2"
	>
			Menu Item
	</span>

	</a>

	</div>

			
	<div className="my-3 pb-3"
	>
			
	<h4 className="text-uppercase small"
	>
			Dashboard
	</h4>

			
	<a className="d-inline-block w-100 d-flex align-items-center text-decoration-none text-dark py-2" href="#" target="_self" type="external"
	>
			
	<i className="fas fa-check-square"
	>
	</i>

			
	<span className="ms-2"
	>
			Menu Item
	</span>

	</a>

	</div>

	</nav>

			
	<div className="mobile-backdrop" onClick={(e) => {
			var value = e.target.value; runAction({name: "ToggleSidebar"});
		}}
	>
	</div>

			
	<main className="content p-4 p-lg-5"
	>
			
	<div id="izbye"
	>
			
	<div id="i9gyc"
	>
			
	<div className="d-flex align-items-center mb-5"
	>
			
	<div className="btn me-2 d-md-none" onClick={(e) => {
			var value = e.target.value; runAction({name: "ToggleSidebar"});
		}}
	>
			
	<i className="fas fa-bars"
	>
	</i>

	</div>

			
	<div className="logo-small bg-primary d-flex align-items-center justify-content-center me-2"
	>
			
	<img src="https://dittofipublicfiles.s3.us-west-2.amazonaws.com/5621/11430-logo-white.svg"
	>
	</img>

	</div>

			
	<h3 className="m-0 fw-bold"
	>
			Welcome back!
	</h3>

			
	<div className="ms-auto"
	>
			
	<ToggleWrapper className="d-dropdown d--open"
	>
			
	<div className="d-dropdown-toggle p-0" role="d-toggle-button"
	>
			
	<div className="logo-small bg-primary d-flex align-items-center justify-content-center me-2 text-white fw-bold"
	>
			
	<i className="fas fa-user"
	>
	</i>

	</div>

	</div>

			
	<div className="d-dropdown-list bg-white rounded border end-0 py-2 px-2" role="d-toggle-wrapper"
	>
			
	<div
	>
			
	<div className="list-group list-group-flush"
	>
			
	<Link className="d-inline-block list-group-item d-flex align-items-center list-group-item-action" target="_self" to="/" type="spa"
	>
			
	<i className="fas fa-user"
	>
	</i>

			
	<div className="ms-3"
	>
			
	<div className="fw-bold" id="i3opw"
	>
			
	<span className="text-nowrap me-1"
	>
			First
	</span>

			
	<span className="text-nowrap"
	>
			Last
	</span>

	</div>

			
	<div
	>
			
	<span className="text-muted small"
	>
			{currentUser?.["email"] !== null ? currentUser?.["email"] : ""}
	</span>

	</div>

	</div>

	</Link>

			
	<Link className="d-inline-block list-group-item d-flex align-items-center border-bottom-0 list-group-item-action" target="_self" to="/" type="spa"
	>
			
	<i className="fas fa-cog"
	>
	</i>

			
	<span className="text-nowrap fw-bold ms-3"
	>
			Profile Settings
	</span>

	</Link>

			
	<Link className="d-inline-block list-group-item d-flex align-items-center list-group-item-action" target="_self" to="/" type="spa"
	>
			
	<i className="fas fa-question"
	>
	</i>

			
	<span className="text-nowrap fw-bold ms-3"
	>
			Help Center
	</span>

	</Link>

			
	<div className="d-inline-block list-group-item d-flex align-items-center list-group-item-action" onClick={(e) => {
			var value = e.target.value; runAction({name: "Logout"});
		}}
	>
			
	<i className="fas fa-sign-out"
	>
	</i>

			
	<span className="text-nowrap fw-bold ms-3"
	>
			Sign out
	</span>

	</div>

	</div>

	</div>

	</div>

	</ToggleWrapper>

	</div>

	</div>

	</div>

	</div>

			
	<div
	>
	</div>

	</main>

	</div>

	</div>

			
		</ErrorBoundary>
	);
}

const mapStateToProps = function(state){
    return state.reducer
}

export default connect(mapStateToProps, null) ( Container );
