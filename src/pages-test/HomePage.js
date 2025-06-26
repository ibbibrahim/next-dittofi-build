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
			
				
	<div
	>
			
	<div
	>
			
	<nav className="navbar navbar-expand-lg navbar-light"
	>
			
	<div className="container"
	>
			
	<a className="d-inline-block d-flex align-items-center text-decoration-none text-dark" href="#" target="_self" type="external"
	>
			
	<img className="me-3" src=" https://dittofipublicfiles.s3.us-west-2.amazonaws.com/5621/11431-logo-purple.png"
	>
	</img>

			
	<div id="ibp8"
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
			
	<div
	>
			
	<h4 id="ifho7"
	>
			App
	</h4>

	</div>

	</div>

	</div>

	</a>

			
	<button className="navbar-toggler" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" data-bs-target="#navbarSupportedContent" data-bs-toggle="collapse" type="button"
	>
			
	<span className="navbar-toggler-icon"
	>
	</span>

	</button>

			
	<div className="collapse navbar-collapse"
	>
			
	<ul className="navbar-nav mx-auto mb-2 mb-lg-0"
	>
			
	<li className="nav-item"
	>
			
	<Link className="nav-link text-primary fw-bold" aria-current="page" to="/" type="spa"
	>
			Products
	</Link>

	</li>

			
	<li className="nav-item"
	>
			
	<Link className="nav-link text-primary fw-bold" aria-current="page" to="/" type="spa"
	>
			Solutions
	</Link>

	</li>

			
	<li className="nav-item dropdown"
	>
			
	<Link className="nav-link text-primary fw-bolder" aria-current="page" to="/" type="spa"
	>
			Pricing
	</Link>

			
	<ul className="dropdown-menu" aria-labelledby="navbarDropdown"
	>
			
	<li
	>
			
	<a className="dropdown-item" href="#"
	>
			Action
	</a>

	</li>

			
	<li
	>
			
	<a className="dropdown-item" href="#"
	>
			Another action
	</a>

	</li>

			
	<li
	>
			
	<hr className="dropdown-divider"
	>
	</hr>

	</li>

			
	<li
	>
			
	<a className="dropdown-item" href="#"
	>
			Something else here
	</a>

	</li>

	</ul>

	</li>

			
	<Link className="nav-link text-primary fw-bold" aria-current="page" to="/resources" type="spa"
	>
			Resources
	</Link>

	</ul>

			
	<Form className="d-flex" method="get"
	>
			
	<Link className="btn text-primary" to="/login" type="spa"
	>
			Login
	</Link>

			
	<Link className="btn btn-primary ms-2" to="/register" type="spa"
	>
			Get started for free
	</Link>

	</Form>

	</div>

	</div>

	</nav>

	</div>

			
	<div className="container py-5"
	>
			
	<div className="row flex-lg-row-reverse align-items-center g-5 py-5"
	>
			
	<div className="col-10 col-sm-8 col-lg-6"
	>
			
	<img className="d-block mx-lg-auto img-fluid" alt="Bootstrap Themes" height="500" loading="lazy" src="https://dittofipublicfiles.s3.us-west-2.amazonaws.com/5621/11951-banner.png" width="700"
	>
	</img>

	</div>

			
	<div className="col-lg-6"
	>
			
	<h1 className="fw-bold lh-1 mb-3 display-4"
	>
			H1: "Add your company slogan here..."
	</h1>

			
	<p className="text-muted"
	>
			Paragraph: "Add your detailed value proposition here"
	</p>

			
	<div className="d-grid gap-2 d-md-flex justify-content-md-start"
	>
			
	<Link className="btn btn-primary btn-lg px-4 me-md-2" to="/register" type="spa"
	>
			Get started
	</Link>

	</div>

	</div>

	</div>

	</div>

			
	<div className="py-5"
	>
			
	<div className="container text-center py-3"
	>
			
	<h2 className="fw-bold mb-4 display-6"
	>
			More than 25,000 teams use Authentication App
	</h2>

			
	<div className="row d-flex justify-content-center"
	>
			
	<div className="col-lg-2 col-md-6 d-flex justify-content-center my-3"
	>
			
	<img className="img-fluid" src="https://dittofipublicfiles.s3.us-west-2.amazonaws.com/5621/11988-unsplash.svg"
	>
	</img>

	</div>

			
	<div className="col-lg-2 col-md-6 d-flex justify-content-center my-3"
	>
			
	<img className="img-fluid" src="https://dittofipublicfiles.s3.us-west-2.amazonaws.com/5621/11990-notion.svg"
	>
	</img>

	</div>

			
	<div className="col-lg-2 col-md-6 d-flex justify-content-center my-3"
	>
			
	<img className="img-fluid" src="https://dittofipublicfiles.s3.us-west-2.amazonaws.com/5621/11991-intercom.svg"
	>
	</img>

	</div>

			
	<div className="col-lg-2 col-md-6 d-flex justify-content-center my-3"
	>
			
	<img className="img-fluid" src="https://dittofipublicfiles.s3.us-west-2.amazonaws.com/5621/11989-descript.svg"
	>
	</img>

	</div>

			
	<div className="col-lg-2 col-md-6 d-flex justify-content-center"
	>
			
	<img className="img-fluid" src="https://dittofipublicfiles.s3.us-west-2.amazonaws.com/5621/11919-grammarly.svg"
	>
	</img>

	</div>

	</div>

	</div>

	</div>

			
	<div className="py-5 bg-light"
	>
			
	<div className="container py-3"
	>
			
	<div className="row"
	>
			
	<div className="col d-flex"
	>
			
	<div className="d-flex flex-column"
	>
			
	<h1 className="fw-bold display-4 mb-5"
	>
			How we support our partner all over the world
	</h1>

			
	<p className="text-muted flex-grow-1"
	>
			Lorem ipsum dolor sit amet consectetur. Pellentesque tellus purus in at mauris magna. Felis blandit magna ornare urna adipiscing. In in ante condimentum id quis proin. Ac ipsum nunc bibendum amet.
	</p>

			
	<div className="row"
	>
			
	<div className="col text-center"
	>
			
	<div className="d-flex align-items-center justify-content-center"
	>
			
	<i className="fas fa-star text-primary fs-5" aria-hidden="true"
	>
	</i>

			
	<i className="fas fa-star text-primary fs-5" aria-hidden="true"
	>
	</i>

			
	<i className="fas fa-star text-primary fs-5" aria-hidden="true"
	>
	</i>

			
	<i className="fas fa-star text-primary fs-5" aria-hidden="true"
	>
	</i>

			
	<i className="fas fa-star text-primary fs-5" aria-hidden="true"
	>
	</i>

	</div>

			
	<div className="my-2"
	>
			
	<span
	>
			4.9 / 5 rating
	</span>

	</div>

			
	<div
	>
			
	<span className="text-muted"
	>
			Client Company
	</span>

	</div>

	</div>

			
	<div className="col text-center"
	>
			
	<div className="d-flex align-items-center justify-content-center"
	>
			
	<i className="fas fa-star text-primary fs-5" aria-hidden="true"
	>
	</i>

			
	<i className="fas fa-star text-primary fs-5" aria-hidden="true"
	>
	</i>

			
	<i className="fas fa-star text-primary fs-5" aria-hidden="true"
	>
	</i>

			
	<i className="fas fa-star text-primary fs-5" aria-hidden="true"
	>
	</i>

			
	<i className="fas fa-star text-primary fs-5" aria-hidden="true"
	>
	</i>

	</div>

			
	<div className="my-2"
	>
			
	<span
	>
			4.9 / 5 rating
	</span>

	</div>

			
	<div
	>
			
	<span className="text-muted"
	>
			Client Company
	</span>

	</div>

	</div>

			
	<div className="col"
	>
	</div>

	</div>

	</div>

	</div>

			
	<div className="col"
	>
			
	<div className="d-flex align-items-start mb-4"
	>
			
	<div className="logo-small bg-primary d-flex align-items-center justify-content-center rounded"
	>
			
	<span className="d-none"
	>
			a
	</span>

	</div>

			
	<div className="ms-3"
	>
			
	<h3 className="fw-bold"
	>
			Heading 1
	</h3>

			
	<p className="text-muted"
	>
			Lorem ipsum dolor sit amet consectetur. Fringilla egestas dictum nulla varius adipiscing massa ornare.
	</p>

	</div>

	</div>

			
	<div className="d-flex align-items-start mb-4"
	>
			
	<div className="logo-small bg-primary d-flex align-items-center justify-content-center rounded"
	>
			
	<span className="d-none"
	>
			a
	</span>

	</div>

			
	<div className="ms-3"
	>
			
	<h3 className="fw-bold"
	>
			Heading 2
	</h3>

			
	<p className="text-muted"
	>
			Lorem ipsum dolor sit amet consectetur. Fringilla egestas dictum nulla varius adipiscing massa ornare.
	</p>

	</div>

	</div>

			
	<div className="d-flex align-items-start"
	>
			
	<div className="logo-small bg-primary d-flex align-items-center justify-content-center rounded"
	>
			
	<span className="d-none"
	>
			a
	</span>

	</div>

			
	<div className="ms-3"
	>
			
	<h3 className="fw-bold"
	>
			Heading 3
	</h3>

			
	<p className="text-muted"
	>
			Lorem ipsum dolor sit amet consectetur. Fringilla egestas dictum nulla varius adipiscing massa ornare.
	</p>

	</div>

	</div>

	</div>

	</div>

	</div>

	</div>

			
	<div className="py-5 bg-light"
	>
			
	<div className="container py-3"
	>
			
	<div className="row mb-5"
	>
			
	<div className="col-lg-3"
	>
			
	<h1 className="fw-bold display-5"
	>
			Our Features you can get
	</h1>

	</div>

			
	<div className="col d-flex align-items-center"
	>
			
	<p className="text-muted"
	>
			Lorem ipsum dolor sit amet consectetur. Suspendisse accumsan in risus magna. Lacinia porttitor congue mi volutpat nulla purus.
	</p>

			
	<Link className="btn btn-primary text-nowrap px-5 ms-2" to="/register" type="spa"
	>
			Get started
	</Link>

	</div>

	</div>

			
	<div className="row"
	>
			
	<div className="col"
	>
			
	<div
	>
			
	<img className="img-fluid" src="https://dittofipublicfiles.s3.us-west-2.amazonaws.com/5621/11992-feature.svg"
	>
	</img>

	</div>

			
	<div className="mt-3"
	>
			
	<h3 className="fw-bold"
	>
			Featured 1
	</h3>

			
	<p className="text-muted"
	>
			Lorem ipsum dolor sit amet consectetur. In suspendisse nascetur urna quam enim ut.
	</p>

	</div>

	</div>

			
	<div className="col"
	>
			
	<div
	>
			
	<img className="img-fluid" src="https://dittofipublicfiles.s3.us-west-2.amazonaws.com/5621/11992-feature.svg"
	>
	</img>

	</div>

			
	<div className="mt-3"
	>
			
	<h3 className="fw-bold"
	>
			Featured 2
	</h3>

			
	<p className="text-muted"
	>
			Lorem ipsum dolor sit amet consectetur. In suspendisse nascetur urna quam enim ut.
	</p>

	</div>

	</div>

			
	<div className="col"
	>
			
	<div
	>
			
	<img className="img-fluid" src="https://dittofipublicfiles.s3.us-west-2.amazonaws.com/5621/11992-feature.svg"
	>
	</img>

	</div>

			
	<div className="mt-3"
	>
			
	<h3 className="fw-bold"
	>
			Featured 3
	</h3>

			
	<p className="text-muted"
	>
			Lorem ipsum dolor sit amet consectetur. In suspendisse nascetur urna quam enim ut.
	</p>

	</div>

	</div>

	</div>

	</div>

	</div>

			
	<div className="py-5 text-center social-banner-background text-white"
	>
			
	<div className="container py-3"
	>
			
	<h1 className="fw-bold display-5"
	>
			How to use the starter app
	</h1>

			
	<div className="col-lg-6 mx-auto mb-3"
	>
			
	<span className="mb-4"
	>
			Lorem ipsum dolor sit amet consectetur. Semper feugiat mus nunc mauris donec risus nisl. Convallis nulla nec quisque tristique feugiat varius faucibus leo quam.
	</span>

	</div>

			
	<div className="overlapping-image-container"
	>
			
	<div className="overlapping-image-container-imgage"
	>
			
	<img className="img-fluid" src="https://dittofipublicfiles.s3.us-west-2.amazonaws.com/5621/12135-video.png"
	>
	</img>

	</div>

	</div>

	</div>

	</div>

			
	<div className="py-5"
	>
			
	<div className="container py-3"
	>
			
	<div className="text-center mb-4"
	>
			
	<h1 className="fw-bold mb-4 display-5"
	>
			Our recent blog
	</h1>

			
	<div className="col-lg-6 mx-auto"
	>
			
	<span className="text-muted mb-4"
	>
			Lorem ipsum dolor sit amet consectetur. Semper feugiat mus nunc mauris donec risus nisl. Convallis nulla nec quisque tristique feugiat varius faucibus leo quam.
	</span>

	</div>

	</div>

			
	<div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3"
	>
			
	<div className="col"
	>
			
	<div className="card shadow-sm"
	>
			
	<img className="card-img-top" src="https://dittofipublicfiles.s3.us-west-2.amazonaws.com/5621/11949-blog_placeholder_image.png"
	>
	</img>

			
	<div className="card-body"
	>
			
	<h4 className="fw-bold"
	>
			Blog Title: Lorem ipsum dolor
	</h4>

			
	<p className="card-text text-muted"
	>
			Lorem ipsum dolor sit amet, consectetur adipiscing elit. Viverra nunc ante velit vitae. Est tellus vitae, nullam lobortis enim.
	</p>

			
	<div className="d-flex justify-content-between align-items-center"
	>
			
	<div className="btn-group"
	>
			
	<a className="text-primary fw-bold text-decoration-none"
	>
			Read more
	</a>

	</div>

	</div>

	</div>

	</div>

	</div>

			
	<div className="col"
	>
			
	<div className="card shadow-sm"
	>
			
	<img className="card-img-top" src="https://dittofipublicfiles.s3.us-west-2.amazonaws.com/5621/11949-blog_placeholder_image.png"
	>
	</img>

			
	<div className="card-body"
	>
			
	<h4 className="fw-bold"
	>
			Blog Title: Lorem ipsum dolor
	</h4>

			
	<p className="card-text text-muted"
	>
			Lorem ipsum dolor sit amet, consectetur adipiscing elit. Viverra nunc ante velit vitae. Est tellus vitae, nullam lobortis enim.
	</p>

			
	<div className="d-flex justify-content-between align-items-center"
	>
			
	<div className="btn-group"
	>
			
	<a className="text-primary fw-bold text-decoration-none"
	>
			Read more
	</a>

	</div>

	</div>

	</div>

	</div>

	</div>

			
	<div className="col"
	>
			
	<div className="card shadow-sm"
	>
			
	<img className="card-img-top" src="https://dittofipublicfiles.s3.us-west-2.amazonaws.com/5621/11949-blog_placeholder_image.png"
	>
	</img>

			
	<div className="card-body"
	>
			
	<h4 className="fw-bold"
	>
			Blog Title: Lorem ipsum dolor
	</h4>

			
	<p className="card-text text-muted"
	>
			Lorem ipsum dolor sit amet, consectetur adipiscing elit. Viverra nunc ante velit vitae. Est tellus vitae, nullam lobortis enim.
	</p>

			
	<div className="d-flex justify-content-between align-items-center"
	>
			
	<div className="btn-group"
	>
			
	<a className="text-primary fw-bold text-decoration-none"
	>
			Read more
	</a>

	</div>

	</div>

	</div>

	</div>

	</div>

	</div>

	</div>

	</div>

			
	<div className="py-5 text-center px-4"
	>
			
	<div className="container py-3"
	>
			
	<h1 className="fw-bold display-5 mb-4"
	>
			Try our Starter App
	</h1>

			
	<div className="col-lg-6 mx-auto mb-4"
	>
			
	<span className="text-muted mb-4"
	>
			Lorem ipsum dolor sit amet consectetur. Semper feugiat mus nunc mauris donec risus nisl. Convallis nulla nec quisque tristique feugiat varius faucibus leo quam.
	</span>

	</div>

			
	<div className="col-lg-6 mx-auto"
	>
			
	<div className="d-flex justify-content-center"
	>
			
	<Link className="btn btn-primary me-2 px-4" to="/login" type="spa"
	>
			Login
	</Link>

			
	<Link className="btn text-primary border-primary ms-2 px-4" to="/register" type="spa"
	>
			Get started
	</Link>

	</div>

	</div>

	</div>

	</div>

			
	<div
	>
			
	<footer className="text-center text-lg-start text-white bg-primary"
	>
			
	<section className="py-5"
	>
			
	<div className="container text-center text-md-start py-3"
	>
			
	<div className="row mt-3"
	>
			
	<div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4"
	>
			
	<Link className="d-inline-block d-flex align-items-center text-decoration-none text-white" target="_self" to="/" type="spa"
	>
			
	<img className="me-3" src="https://dittofipublicfiles.s3.us-west-2.amazonaws.com/5621/11993-logo-d-white-large.svg"
	>
	</img>

			
	<div id="imuhym"
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
			
	<div
	>
			
	<h4 id="iynk4r"
	>
			App
	</h4>

	</div>

	</div>

	</div>

	</Link>

			
	<hr className="mb-4 mt-0 d-inline-block mx-auto"
	>
	</hr>

			
	<p
	>
			Get started new try our product
	</p>

			
	<p className="mt-3"
	>
			© 2023 Starter App All rights Reserved
	</p>

	</div>

			
	<div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4"
	>
			
	<h6 className="text-uppercase fw-bold"
	>
			footer 1
	</h6>

			
	<hr className="mb-4 mt-0 d-inline-block mx-auto"
	>
	</hr>

			
	<p
	>
			Page 1
	</p>

			
	<p
	>
			Page 2
	</p>

			
	<p
	>
			Page 3
	</p>

	</div>

			
	<div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4"
	>
			
	<h6 className="text-uppercase fw-bold"
	>
			footer 2
	</h6>

			
	<hr className="mb-4 mt-0 d-inline-block mx-auto"
	>
	</hr>

			
	<p
	>
			Page 1
	</p>

			
	<p
	>
			Page 2
	</p>

			
	<p
	>
			Page 3
	</p>

	</div>

			
	<div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4"
	>
			
	<h6 className="text-uppercase fw-bold"
	>
			footer 3
	</h6>

			
	<hr className="mb-4 mt-0 d-inline-block mx-auto"
	>
	</hr>

			
	<p
	>
			Page 1
	</p>

			
	<p
	>
			Page 2
	</p>

			
	<p
	>
			Page 3
	</p>

	</div>

	</div>

	</div>

	</section>

	</footer>

	</div>

	</div>

			
		</ErrorBoundary>
	);
}

const mapStateToProps = function(state){
    return state.reducer
}

export default connect(mapStateToProps, null) ( Container );
