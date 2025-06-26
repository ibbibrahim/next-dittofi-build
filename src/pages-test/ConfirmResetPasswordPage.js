import React, { Children, cloneElement, Fragment, isValidElement, PureComponent, useEffect, useRef, useState, useCallback } from "react";
import ReactDOM from 'react-dom';
import { connect } from "react-redux";
import { useLocation, useParams, useHistory } from "react-router-dom";
import { get } from 'lodash';
import _ from 'lodash';
import { Area, Bar, CartesianGrid, ComposedChart, Legend, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { useRouter } from "next/navigation";
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
	let history;
	if(true){
		history = useRouter();
	}else{
		history = useHistory();
	}

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
			
				
	<div className="position-absolute top-0 bottom-0 start-0 end-0 d-flex justify-content-center"
	>
			
	<div className="col d-flex flex-column px-5 col-md-8"
	>
			
	<div className="flex-grow-1 d-flex align-items-center justify-content-center"
	>
			
	<div className="col-md-6"
	>
			
	<a className="d-inline-block w-100 d-flex align-items-center text-decoration-none text-dark py-3 justify-content-center mb-5" href="#" target="_self" type="external"
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

			
	<div
	>
			
	<h4 className="fw-bold"
	>
			Recovery Email Sent!
	</h4>

			
	<h6 className="fw-bold mb-4"
	>
			Please check your email for next steps to reset your password
	</h6>

	</div>

			
	<div className="mb-5"
	>
			
	<div className="btn btn-primary text-uppercase btn-lg"
	>
			
	<span
	>
			contact support
	</span>

	</div>

	</div>

			
	<Link className="d-inline-block w-100" target="_self" to="/login" type="spa"
	>
			
	<div className="btn text-uppercase btn-lg w-100 btn-dark"
	>
			
	<span
	>
			login
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

	</div>

			
		</ErrorBoundary>
	);
}

const mapStateToProps = function(state){
    return state.reducer
}

export default connect(mapStateToProps, null) ( Container );
