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
			error_signUpEmailInUse,
			error_signUpPasswordMismatch,
			signUpEPI,
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
			
	<div className="col-md-6" id="iqpye"
	>
			
	<div id="i85km"
	>
			
	<h4 className="fw-bold mb-4"
	>
			Sign up to the Dittofi Starter App
	</h4>

	</div>

			
	<Form id="ix4wz" onSubmit={(e) => {
			var value = e.target.value; runAction({name: "SignupWithValidation"});
		}}
	>
			
	<div className="mb-2" id="iup1m"
	>
			
	<div className="d--form-group m-0" data-preview-valid="all" id="ivt0s"
	>
			
	<input className="form-control form-control-lg" name="signUpEPI.email" placeholder="Email *" required="true" type="email" onChange={(e) => {
			var value = e.target.value; dispatch({type: "change_input", payload:{name: e.target.name, value }});
		}} value={signUpEPI?.["email"] !== null ? signUpEPI?.["email"] : ""}
	>
	</input>

			
	<div className="d--invalid-feedback" id="iohwg"
	>
			
	<span id="iod2h"
	>
			Required field
	</span>

	</div>

	</div>

			
<Fragment>
{ error_signUpEmailInUse &&
	<div id="ik8eu"
	>
			
	<span className="small text-danger" id="i22oa"
	>
			Email in use
	</span>

	</div>}</Fragment>

	</div>

			
	<div className="mb-2" id="iyoze"
	>
			
	<div className="d--form-group mb-0" data-preview-valid="all" id="irq2v"
	>
			
	<input className="form-control form-control-lg" name="signUpEPI.password" placeholder="Password *" required="true" type="password" onChange={(e) => {
			var value = e.target.value; dispatch({type: "change_input", payload:{name: e.target.name, value }});
		}} value={signUpEPI?.["password"] !== null ? signUpEPI?.["password"] : ""}
	>
	</input>

			
	<div className="d--invalid-feedback" id="iy5be"
	>
			
	<span
	>
			Required field
	</span>

	</div>

	</div>

	</div>

			
	<div className="mb-2" id="imobm"
	>
			
	<div className="d--form-group m-0" data-preview-valid="all" id="iibqk"
	>
			
	<input className="form-control form-control-lg" name="signUpEPI.confirm_password" placeholder="Confirm password *" required="true" type="password" onChange={(e) => {
			var value = e.target.value; dispatch({type: "change_input", payload:{name: e.target.name, value }});
		}} value={signUpEPI?.["confirm_password"] !== null ? signUpEPI?.["confirm_password"] : ""}
	>
	</input>

			
	<div className="d--invalid-feedback" id="i0rje"
	>
			
	<span
	>
			Required field
	</span>

	</div>

	</div>

			
<Fragment>
{ error_signUpPasswordMismatch &&
	<div id="iebck"
	>
			
	<span className="small text-danger" id="ih4g5"
	>
			Passwords don't match
	</span>

	</div>}</Fragment>

	</div>

			
	<div className="mb-2" id="ije9k"
	>
			
	<button className="btn btn-primary text-uppercase btn-lg w-100" id="iytos" type="submit"
	>
			SIGN UP
	</button>

	</div>

	</Form>

			
	<Link className="d-inline-block w-100" target="_self" to="/login" type="spa"
	>
			
	<div className="btn text-uppercase btn-lg w-100 btn-dark"
	>
			
	<span id="ipau5"
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

			
	<div className="col col-md-4 bg-primary d-flex flex-column justify-content-end d-none d-md-flex"
	>
			
	<div className="d-flex justify-content-end p-2" id="iptsi"
	>
			
	<img id="i7b0g" src="https://dittofipublicfiles.s3.us-west-2.amazonaws.com/5621/11492-dittofi-logo-white.svg"
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
