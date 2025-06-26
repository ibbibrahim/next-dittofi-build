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
			
				
	<div className="dashboard" id="i8qg-2"
	>
			
	<div id="i0v6fb"
	>
			
	<nav className="sidebar border-end px-4 py-3 bg-white"
	>
			
	<Link className="d-inline-block w-100 d-flex align-items-center text-decoration-none text-dark mb-5" target="_self" to="/dashboard" type="spa"
	>
			
	<img className="me-3" src=" https://dittofipublicfiles.s3.us-west-2.amazonaws.com/5621/11431-logo-purple.png"
	>
	</img>

			
	<h4 id="iijr"
	>
			Starter App
	</h4>

	</Link>

			
	<div className="my-3 pb-3 border-bottom"
	>
			
	<h4 className="text-uppercase small"
	>
			getting started
	</h4>

			
	<a className="d-inline-block w-100 d-flex align-items-center text-decoration-none text-dark py-2" href="#" target="_self" type="external"
	>
			
	<i className="fas fa-check-square"
	>
	</i>

			
	<span className="ms-2"
	>
			Overview
	</span>

	</a>

	</div>

			
	<div className="my-3 pb-3"
	>
			
	<h4 className="text-uppercase small"
	>
			base
	</h4>

			
	<a className="d-inline-block w-100 d-flex align-items-center text-decoration-none text-dark py-2" href="#" target="_self" type="external"
	>
			
	<i className="fas fa-bell"
	>
	</i>

			
	<span className="ms-2"
	>
			Alerts
	</span>

	</a>

			
	<a className="d-inline-block w-100 d-flex align-items-center text-decoration-none text-dark py-2" href="#" target="_self" type="external"
	>
			
	<i className="fas fa-check-square"
	>
	</i>

			
	<span className="ms-2"
	>
			Badges
	</span>

	</a>

			
	<a className="d-inline-block w-100 d-flex align-items-center text-decoration-none text-dark py-2" href="#" target="_self" type="external"
	>
			
	<i className="fas fa-check-square"
	>
	</i>

			
	<span className="ms-2"
	>
			Buttons
	</span>

	</a>

			
	<a className="d-inline-block w-100 d-flex align-items-center text-decoration-none text-dark py-2" href="#" target="_self" type="external"
	>
			
	<i className="fas fa-check-square"
	>
	</i>

			
	<span className="ms-2"
	>
			Breadcrumb
	</span>

	</a>

			
	<a className="d-inline-block w-100 d-flex align-items-center text-decoration-none text-dark py-2" href="#" target="_self" type="external"
	>
			
	<i className="fas fa-check-square"
	>
	</i>

			
	<span className="ms-2"
	>
			Cards
	</span>

	</a>

			
	<a className="d-inline-block w-100 d-flex align-items-center text-decoration-none text-dark py-2" href="#" target="_self" type="external"
	>
			
	<i className="fas fa-check-square"
	>
	</i>

			
	<span className="ms-2"
	>
			Forms
	</span>

	</a>

			
	<a className="d-inline-block w-100 d-flex align-items-center text-decoration-none text-dark py-2" href="#" target="_self" type="external"
	>
			
	<i className="fas fa-check-square"
	>
	</i>

			
	<span className="ms-2"
	>
			Pagination
	</span>

	</a>

			
	<a className="d-inline-block w-100 d-flex align-items-center text-decoration-none text-dark py-2" href="#" target="_self" type="external"
	>
			
	<i className="fas fa-check-square"
	>
	</i>

			
	<span className="ms-2"
	>
			Tables
	</span>

	</a>

			
	<a className="d-inline-block w-100 d-flex align-items-center text-decoration-none text-dark py-2" href="#" target="_self" type="external"
	>
			
	<i className="fas fa-check-square"
	>
	</i>

			
	<span className="ms-2"
	>
			Toasts
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
			
	<div
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
			Resources
	</h3>

	</div>

	</div>

			
	<div className="mb-5" id="ij0iq6"
	>
			
	<h1 id="iadcxa"
	>
			Overview
	</h1>

			
	<p id="ihqz1z"
	>
			The core components extend bootstrap 5 to provide stylised accessible components for application design.
	</p>

	</div>

			
	<h1 id="izgnw2"
	>
			Base
	</h1>

			
	<div className="mb-5" id="ihxwt4"
	>
			
	<h2 className="mb-3" id="i65ff1"
	>
			Alerts
	</h2>

			
	<div className="card shadow-sm"
	>
			
	<div className="card-body"
	>
			
	<div className="pb-5"
	>
			
	<h3 id="i6h5rh"
	>
			Overview
	</h3>

			
	<p id="i17poa"
	>
			The core components library uses Bootstrap Alerts to provide a wide variant of alerts.
	</p>

	</div>

			
	<div className="pb-5"
	>
			
	<h3 id="i2536"
	>
			Basic
	</h3>

			
	<p id="i71igh"
	>
			Basic alert examples
	</p>

			
	<div className="rounded border d-flex flex-column p-3 pb-0"
	>
			
	<div className="alert alert-primary d-flex align-items-center"
	>
			
	<i className="text-primary me-4 fas fa-check"
	>
	</i>

			
	<div className="d-flex flex-column"
	>
			
	<h4 className="mb-1 text-primary"
	>
			This is an alert
	</h4>

			
	<span
	>
			The alert component can be used to highlight certain parts of your page for higher content visibility.
	</span>

	</div>

	</div>

			
	<div className="alert alert-success d-flex align-items-center"
	>
			
	<i className="me-4 fas fa-check text-success"
	>
	</i>

			
	<div className="d-flex flex-column"
	>
			
	<h4 className="mb-1 text-success"
	>
			This is an alert
	</h4>

			
	<span
	>
			The alert component can be used to highlight certain parts of your page for higher content visibility.
	</span>

	</div>

	</div>

			
	<div className="alert alert-info d-flex align-items-center"
	>
			
	<i className="me-4 fas fa-check text-info"
	>
	</i>

			
	<div className="d-flex flex-column"
	>
			
	<h4 className="mb-1 text-info"
	>
			This is an alert
	</h4>

			
	<span
	>
			The alert component can be used to highlight certain parts of your page for higher content visibility.
	</span>

	</div>

	</div>

			
	<div className="alert alert-warning d-flex align-items-center"
	>
			
	<i className="me-4 fas fa-check text-warning"
	>
	</i>

			
	<div className="d-flex flex-column"
	>
			
	<h4 className="mb-1 text-warning"
	>
			This is an alert
	</h4>

			
	<span
	>
			The alert component can be used to highlight certain parts of your page for higher content visibility.
	</span>

	</div>

	</div>

			
	<div className="alert alert-danger d-flex align-items-center"
	>
			
	<i className="me-4 fas fa-check text-danger"
	>
	</i>

			
	<div className="d-flex flex-column"
	>
			
	<h4 className="mb-1 text-danger"
	>
			This is an alert
	</h4>

			
	<span
	>
			The alert component can be used to highlight certain parts of your page for higher content visibility.
	</span>

	</div>

	</div>

	</div>

	</div>

	</div>

	</div>

	</div>

			
	<div className="mb-5"
	>
			
	<h2 className="mb-3"
	>
			Badges
	</h2>

			
	<div className="card shadow-sm"
	>
			
	<div className="card-body"
	>
			
	<div className="pb-5"
	>
			
	<h3
	>
			Overview
	</h3>

			
	<p id="il05v7"
	>
			The core components library uses Bootstrap Badges to provide a wide variant of badges.
	</p>

	</div>

			
	<div className="pb-5"
	>
			
	<h3
	>
			Basic
	</h3>

			
	<p id="i0gtfa"
	>
			Basic badge examples
	</p>

			
	<div className="rounded border p-3 d-flex flex-wrap"
	>
			
	<span className="badge bg-primary"
	>
			Primary
	</span>

			
	<span className="badge bg-secondary"
	>
			Secondary
	</span>

			
	<span className="badge bg-success"
	>
			Success
	</span>

			
	<span className="badge bg-danger"
	>
			Danger
	</span>

			
	<span className="badge bg-warning text-dark"
	>
			Warning
	</span>

			
	<span className="badge bg-info text-dark"
	>
			Info
	</span>

			
	<span className="badge bg-light text-dark"
	>
			Light
	</span>

			
	<span className="badge bg-dark"
	>
			Dark
	</span>

	</div>

	</div>

	</div>

	</div>

	</div>

			
	<div className="mb-5"
	>
			
	<h2 className="mb-3"
	>
			Buttons
	</h2>

			
	<div className="card shadow-sm"
	>
			
	<div className="card-body"
	>
			
	<div className="pb-5"
	>
			
	<h3
	>
			Overview
	</h3>

			
	<p id="inxs2p"
	>
			The core components library uses Bootstrap Buttons to provide a wide variant of buttons.
	</p>

	</div>

			
	<div className="pb-5"
	>
			
	<h3 id="i5gn78"
	>
			Basic
	</h3>

			
	<p id="i0w5v3"
	>
			Basic button examples
	</p>

			
	<div className="rounded border p-3"
	>
			
	<a className="btn btn-light"
	>
			Light
	</a>

			
	<a className="btn btn-primary"
	>
			Primary
	</a>

			
	<a className="btn btn-secondary"
	>
			Secondary
	</a>

			
	<a className="btn btn-success"
	>
			Success
	</a>

			
	<a className="btn btn-info"
	>
			Info
	</a>

			
	<a className="btn btn-warning"
	>
			Warning
	</a>

			
	<a className="btn btn-danger"
	>
			Danger
	</a>

			
	<a className="btn btn-dark"
	>
			Dark
	</a>

	</div>

	</div>

	</div>

	</div>

	</div>

			
	<div className="mb-5"
	>
			
	<h2 className="mb-3"
	>
			Breadcrumb
	</h2>

			
	<div className="card shadow-sm"
	>
			
	<div className="card-body"
	>
			
	<div className="pb-5"
	>
			
	<h3
	>
			Overview
	</h3>

			
	<p id="i4wnvf"
	>
			The core components library uses Bootstrap Breadcrumb
	</p>

	</div>

			
	<div className="pb-5"
	>
			
	<h3 id="igfc17"
	>
			Basic
	</h3>

			
	<p id="i0pk1c"
	>
			Use an ordered or unordered list with linked list items to create a minimally styled breadcrumb.
	</p>

			
	<div className="rounded border p-3 pb-0"
	>
			
	<ol className="breadcrumb text-muted fs-6 fw-semibold"
	>
			
	<li className="breadcrumb-item"
	>
			
	<a href="#" id="ilcevs"
	>
			Home
	</a>

	</li>

			
	<li className="breadcrumb-item"
	>
			
	<a href="#"
	>
			Library
	</a>

	</li>

			
	<li className="breadcrumb-item text-muted"
	>
			Active
	</li>

	</ol>

	</div>

	</div>

	</div>

	</div>

	</div>

			
	<div className="mb-5" id="igqlul"
	>
			
	<h2 className="mb-3" id="iq52tb"
	>
			Cards
	</h2>

			
	<div className="card shadow-sm"
	>
			
	<div className="card-body"
	>
			
	<div className="pb-5"
	>
			
	<h3 id="iby0sn"
	>
			Overview
	</h3>

			
	<p id="ixctum"
	>
			The core components library uses Bootstrap Cards to provide a wide variant of cards.
	</p>

	</div>

			
	<div className="pb-5"
	>
			
	<h3
	>
			Basic
	</h3>

			
	<p id="iuc7px"
	>
			Basic card example with action button
	</p>

			
	<div className="card shadow-sm"
	>
			
	<div className="card-header d-flex justify-content-between bg-white"
	>
			
	<h3 className="card-title m-0"
	>
			Card Title
	</h3>

			
	<div className="d-flex" id="isqjp"
	>
			
	<a className="btn btn-primary" id="ibqqj"
	>
			Action
	</a>

	</div>

	</div>

			
	<div className="card-body"
	>
			
	<div id="i3p0l8-2"
	>
	</div>

	</div>

			
	<div className="card-footer bg-white"
	>
			
	<span
	>
			Card Footer
	</span>

	</div>

	</div>

	</div>

			
	<div className="pb-5"
	>
			
	<div
	>
			
	<h3 id="inx8dg"
	>
			Linkable
	</h3>

			
	<p id="i0xe4l"
	>
			Basic linkable cards
	</p>

	</div>

			
	<div className="row" id="i9314i"
	>
			
	<div className="col-md-4" id="isw4c9"
	>
			
	<div className="card shadow"
	>
			
	<div className="card-body"
	>
			
	<div className="row align-items-center"
	>
			
	<div className="col col-md-6"
	>
			
	<div
	>
			
	<div
	>
			
	<h6 className="text-muted"
	>
			Statistic Header
	</h6>

	</div>

			
	<div
	>
			
	<h1 className="text-primary fw-bold"
	>
			100
	</h1>

	</div>

	</div>

	</div>

			
	<div className="col col-md-6 d-flex justify-content-end"
	>
			
	<div className="bg-primary d-flex align-items-center justify-content-center rounded p-3 px-4"
	>
			
	<img id="ijyqp" src="https://dittofipublicfiles.s3.us-west-2.amazonaws.com/5621/11430-logo-white.svg"
	>
	</img>

	</div>

	</div>

	</div>

	</div>

	</div>

	</div>

			
	<div className="col-md-4" id="ididi7"
	>
			
	<div className="card shadow"
	>
			
	<div className="card-body"
	>
			
	<div className="row align-items-center"
	>
			
	<div className="col col-md-6"
	>
			
	<div
	>
			
	<div
	>
			
	<h6 className="text-muted"
	>
			Statistic Header
	</h6>

	</div>

			
	<div
	>
			
	<h1 className="text-primary fw-bold"
	>
			100
	</h1>

	</div>

	</div>

	</div>

			
	<div className="col col-md-6 d-flex justify-content-end"
	>
			
	<div className="bg-primary d-flex align-items-center justify-content-center rounded p-3 px-4"
	>
			
	<img src="https://dittofipublicfiles.s3.us-west-2.amazonaws.com/5621/11430-logo-white.svg"
	>
	</img>

	</div>

	</div>

	</div>

	</div>

	</div>

	</div>

			
	<div className="col-md-4" id="iiy5jg"
	>
			
	<div className="card shadow"
	>
			
	<div className="card-body"
	>
			
	<div className="row align-items-center"
	>
			
	<div className="col col-md-6"
	>
			
	<div
	>
			
	<div
	>
			
	<h6 className="text-muted"
	>
			Statistic Header
	</h6>

	</div>

			
	<div
	>
			
	<h1 className="text-primary fw-bold"
	>
			100
	</h1>

	</div>

	</div>

	</div>

			
	<div className="col col-md-6 d-flex justify-content-end"
	>
			
	<div className="bg-primary d-flex align-items-center justify-content-center rounded p-3 px-4"
	>
			
	<img src="https://dittofipublicfiles.s3.us-west-2.amazonaws.com/5621/11430-logo-white.svg"
	>
	</img>

	</div>

	</div>

	</div>

	</div>

	</div>

	</div>

	</div>

	</div>

	</div>

	</div>

	</div>

			
	<div className="mb-5"
	>
			
	<h2 className="mb-3"
	>
			Forms
	</h2>

			
	<div className="card shadow-sm"
	>
			
	<div className="card-body"
	>
			
	<div className="pb-5"
	>
			
	<h3
	>
			Overview
	</h3>

			
	<p id="i7c43c"
	>
			The core components library uses Bootstrap Forms
	</p>

	</div>

			
	<div className="pb-5"
	>
			
	<h3 id="ie21yn"
	>
			Form Controls
	</h3>

			
	<p id="iizdly"
	>
			Basic form controls
	</p>

			
	<div className="p-3 border rounded" id="ijh24x"
	>
			
	<div className="mb-3"
	>
			
	<label className="form-label" for="exampleFormControlInput1"
	>
			Email address
	</label>

			
	<input className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" type="email"
	>
	</input>

	</div>

			
	<div className="mb-3"
	>
			
	<label className="form-label" for="exampleFormControlTextarea1"
	>
			Example textarea
	</label>

			
	<textarea className="form-control" id="exampleFormControlTextarea1" rows="3"
	>
	</textarea>

	</div>

	</div>

	</div>

			
	<div className="pb-5"
	>
			
	<h3 id="iab583"
	>
			Select
	</h3>

			
	<p id="idjmf5"
	>
			Basic form select
	</p>

			
	<div className="p-3 border rounded" id="i5gblu"
	>
			
	<div className="mb-3"
	>
			
	<label className="form-label" for="exampleFormControlTextarea1"
	>
			Example select menu
	</label>

			
	<Select className="form-select" aria-label="Default select example"
	>
			
	<option selected="true"
	>
			Open this select menu
	</option>

			
	<option value="1"
	>
			One
	</option>

			
	<option value="2"
	>
			Two
	</option>

			
	<option value="3"
	>
			Three
	</option>

	</Select>

	</div>

	</div>

	</div>

	</div>

	</div>

	</div>

			
	<div className="mb-5"
	>
			
	<h2 className="mb-3"
	>
			Pagination
	</h2>

			
	<div className="card shadow-sm"
	>
			
	<div className="card-body"
	>
			
	<div className="pb-5"
	>
			
	<h3
	>
			Overview
	</h3>

			
	<p id="ic0p2q"
	>
			The core components library uses Bootstrap Pagination
	</p>

	</div>

			
	<div className="pb-5"
	>
			
	<h3 id="i9cey8"
	>
			Basic
	</h3>

			
	<p id="imxnqt"
	>
			An example of basic pagination
	</p>

			
	<div className="rounded border p-3 pb-0"
	>
			
	<nav aria-label="Page navigation example" id="ibznjy"
	>
			
	<ul className="pagination"
	>
			
	<li className="page-item"
	>
			
	<a className="page-link" href="#"
	>
			Previous
	</a>

	</li>

			
	<li className="page-item"
	>
			
	<a className="page-link" href="#"
	>
			1
	</a>

	</li>

			
	<li className="page-item"
	>
			
	<a className="page-link" href="#"
	>
			2
	</a>

	</li>

			
	<li className="page-item"
	>
			
	<a className="page-link" href="#"
	>
			3
	</a>

	</li>

			
	<li className="page-item"
	>
			
	<a className="page-link" href="#"
	>
			Next
	</a>

	</li>

	</ul>

	</nav>

	</div>

	</div>

	</div>

	</div>

	</div>

			
	<div className="mb-5" id="ifbzs"
	>
			
	<h2 className="mb-3" id="izv7p9"
	>
			Tables
	</h2>

			
	<div className="card shadow-sm"
	>
			
	<div className="card-body"
	>
			
	<div className="pb-5" id="i3p0l8"
	>
			
	<h3 id="isjsf"
	>
			Overview
	</h3>

			
	<p id="i94gv"
	>
			The core components library uses Bootstrap Tables to provide a wide variant of tables.
	</p>

	</div>

			
	<div className="pb-5" id="ivrnk"
	>
			
	<h3 id="iyyxt"
	>
			Basic
	</h3>

			
	<p id="ij9sti"
	>
			Add table to create a basic table with borders
	</p>

			
	<table className="table"
	>
			
	<thead
	>
			
	<tr className="fw-bold"
	>
			
	<th id="illox"
	>
			
	<span
	>
			Name
	</span>

	</th>

			
	<th id="ibtli"
	>
			
	<span
	>
			Position
	</span>

	</th>

			
	<th id="i79g4"
	>
			
	<span
	>
			Office
	</span>

	</th>

			
	<th
	>
			
	<span
	>
			Age
	</span>

	</th>

			
	<th
	>
			
	<span
	>
			Start date
	</span>

	</th>

			
	<th
	>
			
	<span
	>
			Salary
	</span>

	</th>

	</tr>

	</thead>

			
	<tbody
	>
			
	<tr
	>
			
	<td id="i4a3h"
	>
			
	<span
	>
			Tiger Nixon
	</span>

	</td>

			
	<td
	>
			
	<span
	>
			System Architect
	</span>

	</td>

			
	<td id="is1f5"
	>
			
	<span
	>
			Edinburgh
	</span>

	</td>

			
	<td
	>
			
	<span
	>
			61
	</span>

	</td>

			
	<td
	>
			
	<span
	>
			2011/04/25
	</span>

	</td>

			
	<td
	>
			
	<span
	>
			$320,800
	</span>

	</td>

	</tr>

			
	<tr
	>
			
	<td id="ivhnr"
	>
			
	<span
	>
			Garrett Winters
	</span>

	</td>

			
	<td
	>
			
	<span
	>
			Accountant
	</span>

	</td>

			
	<td
	>
			
	<span
	>
			Tokyo
	</span>

	</td>

			
	<td
	>
			
	<span
	>
			63
	</span>

	</td>

			
	<td
	>
			
	<span
	>
			2011/07/25
	</span>

	</td>

			
	<td
	>
			
	<span
	>
			$170,750
	</span>

	</td>

	</tr>

	</tbody>

	</table>

	</div>

			
	<div className="pb-5" id="iohqsx"
	>
			
	<div id="iduorw"
	>
			
	<h3 id="i1cj9i"
	>
			Borderless
	</h3>

			
	<p id="izxxq9"
	>
			Use table-borderless  to remove borders from table rows inside the table body
	</p>

	</div>

			
	<table className="table table-borderless"
	>
			
	<thead
	>
			
	<tr className="fw-bold fs-6 text-gray-800"
	>
			
	<th id="ibjvpc"
	>
			
	<span
	>
			Name
	</span>

	</th>

			
	<th id="i8v9t1"
	>
			
	<span
	>
			Position
	</span>

	</th>

			
	<th
	>
			
	<span
	>
			Office
	</span>

	</th>

			
	<th
	>
			
	<span
	>
			Age
	</span>

	</th>

			
	<th
	>
			
	<span
	>
			Start date
	</span>

	</th>

			
	<th
	>
			
	<span
	>
			Salary
	</span>

	</th>

	</tr>

	</thead>

			
	<tbody
	>
			
	<tr
	>
			
	<td
	>
			
	<span
	>
			Tiger Nixon
	</span>

	</td>

			
	<td
	>
			
	<span
	>
			System Architect
	</span>

	</td>

			
	<td id="impka7"
	>
			
	<span
	>
			Edinburgh
	</span>

	</td>

			
	<td
	>
			
	<span
	>
			61
	</span>

	</td>

			
	<td
	>
			
	<span
	>
			2011/04/25
	</span>

	</td>

			
	<td
	>
			
	<span
	>
			$320,800
	</span>

	</td>

	</tr>

			
	<tr
	>
			
	<td id="i97qxw"
	>
			
	<span
	>
			Garrett Winters
	</span>

	</td>

			
	<td
	>
			
	<span
	>
			Accountant
	</span>

	</td>

			
	<td
	>
			
	<span
	>
			Tokyo
	</span>

	</td>

			
	<td
	>
			
	<span
	>
			63
	</span>

	</td>

			
	<td
	>
			
	<span
	>
			2011/07/25
	</span>

	</td>

			
	<td
	>
			
	<span
	>
			$170,750
	</span>

	</td>

	</tr>

	</tbody>

	</table>

	</div>

			
	<div className="pb-5" id="i1nm4m"
	>
			
	<div id="iv9qha"
	>
			
	<h3 id="ilu376"
	>
			Striped Rows
	</h3>

			
	<p id="ik3bmk"
	>
			Use table-striped to add zebra-striping to any table row within the table body
	</p>

	</div>

			
	<table className="table table-striped"
	>
			
	<thead
	>
			
	<tr className="fw-bold fs-6 text-gray-800"
	>
			
	<th id="ip72ta"
	>
			
	<span
	>
			Name
	</span>

	</th>

			
	<th id="iwmh4q"
	>
			
	<span
	>
			Position
	</span>

	</th>

			
	<th
	>
			
	<span
	>
			Office
	</span>

	</th>

			
	<th
	>
			
	<span
	>
			Age
	</span>

	</th>

			
	<th
	>
			
	<span
	>
			Start date
	</span>

	</th>

			
	<th
	>
			
	<span
	>
			Salary
	</span>

	</th>

	</tr>

	</thead>

			
	<tbody
	>
			
	<tr
	>
			
	<td id="ix486s"
	>
			
	<span
	>
			Tiger Nixon
	</span>

	</td>

			
	<td
	>
			
	<span
	>
			System Architect
	</span>

	</td>

			
	<td id="i85tgh"
	>
			
	<span
	>
			Edinburgh
	</span>

	</td>

			
	<td
	>
			
	<span
	>
			61
	</span>

	</td>

			
	<td
	>
			
	<span
	>
			2011/04/25
	</span>

	</td>

			
	<td
	>
			
	<span
	>
			$320,800
	</span>

	</td>

	</tr>

			
	<tr
	>
			
	<td id="ir6l29"
	>
			
	<span
	>
			Garrett Winters
	</span>

	</td>

			
	<td id="imrn2k"
	>
			
	<span
	>
			Accountant
	</span>

	</td>

			
	<td
	>
			
	<span
	>
			Tokyo
	</span>

	</td>

			
	<td
	>
			
	<span
	>
			63
	</span>

	</td>

			
	<td
	>
			
	<span
	>
			2011/07/25
	</span>

	</td>

			
	<td
	>
			
	<span id="ikd5xg"
	>
			$170,750
	</span>

	</td>

	</tr>

	</tbody>

	</table>

	</div>

			
	<div className="pb-5" id="iiwwzd"
	>
			
	<div id="i7f7ub"
	>
			
	<h3 id="ijsd3z"
	>
			Striped, Rounded & Bordered
	</h3>

			
	<p id="ieqjqx"
	>
			Use .border and .table-striped to set bordered table with striped rows and make it rounded with .table-rounded
	</p>

	</div>

			
	<table className="table table-striped border rounded"
	>
			
	<thead
	>
			
	<tr className="fw-bold fs-6 text-gray-800"
	>
			
	<th id="iudjt4"
	>
			
	<span
	>
			Name
	</span>

	</th>

			
	<th id="iwyu5l"
	>
			
	<span
	>
			Position
	</span>

	</th>

			
	<th
	>
			
	<span
	>
			Office
	</span>

	</th>

			
	<th
	>
			
	<span
	>
			Age
	</span>

	</th>

			
	<th
	>
			
	<span
	>
			Start date
	</span>

	</th>

			
	<th id="isqnkm"
	>
			
	<span
	>
			Salary
	</span>

	</th>

	</tr>

	</thead>

			
	<tbody
	>
			
	<tr
	>
			
	<td id="iz9umn"
	>
			
	<span
	>
			Tiger Nixon
	</span>

	</td>

			
	<td
	>
			
	<span
	>
			System Architect
	</span>

	</td>

			
	<td id="irl7uw"
	>
			
	<span
	>
			Edinburgh
	</span>

	</td>

			
	<td
	>
			
	<span
	>
			61
	</span>

	</td>

			
	<td
	>
			
	<span
	>
			2011/04/25
	</span>

	</td>

			
	<td id="ior7ge"
	>
			
	<span
	>
			$320,800
	</span>

	</td>

	</tr>

			
	<tr
	>
			
	<td id="i3zdzk"
	>
			
	<span
	>
			Garrett Winters
	</span>

	</td>

			
	<td id="i6y4f2"
	>
			
	<span
	>
			Accountant
	</span>

	</td>

			
	<td
	>
			
	<span
	>
			Tokyo
	</span>

	</td>

			
	<td
	>
			
	<span
	>
			63
	</span>

	</td>

			
	<td
	>
			
	<span
	>
			2011/07/25
	</span>

	</td>

			
	<td
	>
			
	<span
	>
			$170,750
	</span>

	</td>

	</tr>

	</tbody>

	</table>

	</div>

			
	<div className="pb-5" id="iw8yel"
	>
			
	<div id="iwl3qr"
	>
			
	<h3 id="inj2fo"
	>
			Hoverable Rows
	</h3>

			
	<p id="ixt8i6"
	>
			Add .table-hover to enable a hover state on table rows within a table body.
	</p>

	</div>

			
	<table className="table table-striped border rounded table-hover"
	>
			
	<thead
	>
			
	<tr className="fw-bold fs-6 text-gray-800"
	>
			
	<th id="ikepsg"
	>
			
	<span
	>
			Name
	</span>

	</th>

			
	<th id="i5xydi"
	>
			
	<span
	>
			Position
	</span>

	</th>

			
	<th
	>
			
	<span
	>
			Office
	</span>

	</th>

			
	<th
	>
			
	<span
	>
			Age
	</span>

	</th>

			
	<th
	>
			
	<span
	>
			Start date
	</span>

	</th>

			
	<th id="i6cr9e"
	>
			
	<span
	>
			Salary
	</span>

	</th>

	</tr>

	</thead>

			
	<tbody
	>
			
	<tr id="i1igvd"
	>
			
	<td id="i3l9br"
	>
			
	<span
	>
			Tiger Nixon
	</span>

	</td>

			
	<td id="ijbnlj"
	>
			
	<span
	>
			System Architect
	</span>

	</td>

			
	<td id="ibgura"
	>
			
	<span
	>
			Edinburgh
	</span>

	</td>

			
	<td
	>
			
	<span
	>
			61
	</span>

	</td>

			
	<td
	>
			
	<span
	>
			2011/04/25
	</span>

	</td>

			
	<td id="i2ewyp"
	>
			
	<span
	>
			$320,800
	</span>

	</td>

	</tr>

			
	<tr
	>
			
	<td id="igbgej"
	>
			
	<span
	>
			Garrett Winters
	</span>

	</td>

			
	<td id="idibfp"
	>
			
	<span
	>
			Accountant
	</span>

	</td>

			
	<td
	>
			
	<span
	>
			Tokyo
	</span>

	</td>

			
	<td
	>
			
	<span
	>
			63
	</span>

	</td>

			
	<td
	>
			
	<span
	>
			2011/07/25
	</span>

	</td>

			
	<td
	>
			
	<span
	>
			$170,750
	</span>

	</td>

	</tr>

	</tbody>

	</table>

	</div>

	</div>

	</div>

	</div>

			
	<div className="mb-5"
	>
			
	<h2 className="mb-3"
	>
			Toasts
	</h2>

			
	<div className="card shadow-sm"
	>
			
	<div className="card-body"
	>
			
	<div className="pb-5"
	>
			
	<h3
	>
			Overview
	</h3>

			
	<p id="i605j5"
	>
			The core components library uses Bootstrap Toasts
	</p>

	</div>

			
	<div className="pb-5"
	>
			
	<h3 id="iryhgf"
	>
			Basic
	</h3>

			
	<p id="ixlu5e"
	>
			Basic toast examples
	</p>

			
	<div className="rounded border p-3 d-flex flex-wrap"
	>
			
	<div className="toast fade show" aria-atomic="true" aria-live="assertive" role="alert"
	>
			
	<div className="toast-header"
	>
			
	<svg className="bd-placeholder-img rounded me-2" aria-hidden="true" focusable="false" height="20" preserveAspectRatio="xMidYMid slice" width="20" xmlns="http://www.w3.org/2000/svg"
	>
			
	<rect fill="#007aff" height="100%" width="100%"
	>
	</rect>

	</svg>

			
	<span className="me-auto"
	>
			Bootstrap
	</span>

			
	<span id="iv7bmk"
	>
			11 mins ago
	</span>

			
	<button className="btn-close" aria-label="Close" data-bs-dismiss="toast" type="button"
	>
	</button>

	</div>

			
	<div className="toast-body"
	>
			
	<span
	>
			Hello, world! This is a toast message.
	</span>

	</div>

	</div>

	</div>

	</div>

	</div>

	</div>

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
