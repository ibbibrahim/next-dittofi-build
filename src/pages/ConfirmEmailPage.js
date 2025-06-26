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
	} = props;

	const [tasks, setTasks] = useState({});
	const { pathname, search } = useLocation();
	let { confirmEmailToken, } = Object.fromEntries(new URLSearchParams(search));
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
				params: { confirmEmailToken, 
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
			
				
	<div className="position-absolute top-0 bottom-0 start-0 end-0 d-flex"
	>
			
	<div className="col d-flex flex-column px-5 col-md-8"
	>
			
	<div
	>
			
	<a className="d-inline-block w-100 d-flex align-items-center text-decoration-none text-dark py-3" href="#" target="_self" type="external"
	>
			
	<img className="me-3" src=" https://dittofipublicfiles.s3.us-west-2.amazonaws.com/5621/11431-logo-purple.png"
	>
	</img>

			
	<div
	>
			
	<div
	>
			
	<h4 className="m-0"
	>
			Starter
	</h4>

	</div>

			
	<div
	>
			
	<h4 className="m-0"
	>
			App
	</h4>

	</div>

	</div>

	</a>

	</div>

			
	<div className="flex-grow-1 d-flex align-items-center justify-content-center"
	>
			
	<div className="col-md-6"
	>
			
	<div id="iuxfv"
	>
			
	<div id="ixtnh"
	>
			
	<h4 className="fw-bold"
	>
			Confirm your email address
	</h4>

			
	<h6 id="impey"
	>
			Please check your email for the next steps to sign up
	</h6>

			
	<Link className="d-inline-block w-100" id="it6kc" target="_self" to="/register" type="spa"
	>
			
	<div className="btn text-uppercase btn-lg w-100 btn-dark"
	>
			
	<span id="it6n3"
	>
			Back to sign up
	</span>

	</div>

	</Link>

	</div>

	</div>

			
	<div id="i2iei"
	>
			
	<div className="mt-5" id="i25js"
	>
			
	<h5 className="fw-bold"
	>
			Did not receive an email? Contact our support team
	</h5>

			
	<h6 id="iacq4"
	>
			Please check your email for the next steps to sign up
	</h6>

			
	<div id="ip3ff"
	>
			
	<div className="btn btn-primary text-uppercase btn-lg"
	>
			
	<span id="ipw1g"
	>
			contact support
	</span>

	</div>

	</div>

	</div>

	</div>

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
			Privacy policy
	</a>

	</div>

	</div>

			
	<div className="col col-md-4 bg-primary d-flex flex-column justify-content-end"
	>
			
	<div className="d-flex justify-content-end p-3"
	>
			
	<img src="https://dittofipublicfiles.s3.us-west-2.amazonaws.com/5621/11492-dittofi-logo-white.svg"
	>
	</img>

	</div>

	</div>

	</div>

			
		</ErrorBoundary>
	);
}

const mapStateToProps = function(state){
    return state.reducer
}

export default connect(mapStateToProps, null) ( Container );
