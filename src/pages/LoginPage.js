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
			loginEPI,
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
			
				
	<a className="scroll-to-top rounded" href="#page-top"
	>
	</a>

			
				
	<div className="position-absolute top-0 bottom-0 start-0 end-0 d-flex" id="ideo8"
	>
			
	<div className="col d-flex flex-column col-md-4 px-5" id="i8vch"
	>
			
	<div id="ifatm"
	>
			
	<a className="d-inline-block w-100 d-flex align-items-center text-decoration-none text-dark py-3" href="#" target="_self" type="external"
	>
			
	<img className="me-3" src=" https://dittofipublicfiles.s3.us-west-2.amazonaws.com/5621/11431-logo-purple.png"
	>
	</img>

			
	<div id="iwgzj"
	>
			
	<div id="ichou"
	>
			
	<h4 className="m-0" id="i0k53"
	>
			Starter
	</h4>

	</div>

			
	<div id="ia065"
	>
			
	<h4 className="m-0" id="i6zlb"
	>
			App
	</h4>

	</div>

	</div>

	</a>

	</div>

			
	<div className="flex-grow-1 d-flex align-items-center justify-content-center" id="ijwbi"
	>
			
	<div className="w-100" id="i1l8j"
	>
			
	<div id="il39x"
	>
			
	<h4 className="fw-bold" id="i5hzh"
	>
			Sign In
	</h4>

	</div>

			
	<Form id="izhoz" onSubmit={(e) => {
			var value = e.target.value; runAction({name: "Login"});
		}}
	>
			
	<div className="d--form-group" data-preview-valid="all"
	>
			
	<input className="form-control form-control-lg" name="loginEPI.email" placeholder="Email Address *" required="true" type="email" onChange={(e) => {
			var value = e.target.value; dispatch({type: "change_input", payload:{name: e.target.name, value }});
		}} value={loginEPI?.["email"] !== null ? loginEPI?.["email"] : ""}
	>
	</input>

			
	<div className="d--invalid-feedback"
	>
			
	<span
	>
			Required field
	</span>

	</div>

	</div>

			
	<div className="d--form-group" data-preview-valid="all" id="i2k9u"
	>
			
	<input className="form-control form-control-lg" name="loginEPI.password" placeholder="Password *" required="true" type="password" onChange={(e) => {
			var value = e.target.value; dispatch({type: "change_input", payload:{name: e.target.name, value }});
		}} value={loginEPI?.["password"] !== null ? loginEPI?.["password"] : ""}
	>
	</input>

			
	<div className="d--invalid-feedback"
	>
			
	<span
	>
			Required field
	</span>

	</div>

	</div>

			
	<div className="d-flex align-items-center justify-content-between mb-3" id="imk2v"
	>
			
	<button className="btn btn-primary text-uppercase btn-lg" id="i9cij" type="submit"
	>
			LOGIN
	</button>

			
	<Link className="text-decoration-none text-dark fw-bold" to="/forgot-password" type="spa"
	>
			Forgot your password?
	</Link>

	</div>

	</Form>

			
	<Link className="d-inline-block w-100" id="ivbva" target="_self" to="/register" type="spa"
	>
			
	<div className="btn text-uppercase w-100 btn-dark btn-lg"
	>
			
	<span
	>
			Create account
	</span>

	</div>

	</Link>

	</div>

	</div>

			
	<div className="d-flex justify-content-center align-items-center py-2"
	>
			
	<a className="me-2 text-dark text-decoration-none"
	>
			Terms And Conditions
	</a>

			
	<i className="fas fa-circle small"
	>
	</i>

			
	<a className="text-dark text-decoration-none ms-2"
	>
			Privacy Policy
	</a>

	</div>

	</div>

			
	<div className="col col-md-8 bg-light dittofi-background d-none d-md-block" id="iqfvg"
	>
	</div>

	</div>

			
		</ErrorBoundary>
	);
}

const mapStateToProps = function(state){
    return state.reducer
}

export default connect(mapStateToProps, null) ( Container );
