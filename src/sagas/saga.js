import * as actions from '../redux/actions.js';
import * as serverApi from '../api/api.js';
import { makePath } from '../api/restApi.js';
import _ from "lodash";
import { eventChannel, END } from 'redux-saga';
import * as Yup from 'yup';
import * as functions from '../utils/functions.js';
import { toLocalStorage, fromLocalStorage } from '../components/dittofi-components';
import { call, put, take, fork, select } from 'redux-saga/effects';

import { api } from '../api/rtkQuery';

const _sounds = {};
const _paginatedEndpoints = {};

async function _runPaginatedEndpoint({ id, idx, srcEndpoint, paginatedEndpoint, srcPayload, pathKey, pathIdx } ) {
	let response;
	if(_paginatedEndpoints[id]) {
		console.log("Found paginated id. Running paginated endpoint.");
		response = await paginatedEndpoint({path_variables: { [pathKey]: _paginatedEndpoints[id], [pathIdx]: idx }});
		if(response.status === 200) {
			console.log(response);
			return response;
		} else {
			console.log("Error running paginated id");
			delete _paginatedEndpoints[id];
		}
	}
	
	// No valid pagination id try running source endpoint & then running the paginated endpoint.
	console.log("No paginated id. Running src endpoint");
	response = await srcEndpoint(srcPayload);
	if(!response || response.status !== 200) {
		return response;
	}

	const paginatedId = response.data;

	response = await paginatedEndpoint({path_variables: { [pathKey]: response.data, [pathIdx]: idx }})
	if(response.status === 200 && response.data) {
		_paginatedEndpoints[id] = paginatedId;
	}
	
	return response;
}

async function _getValidationErrors(schema, obj) {
	let validationErrors = {};
	try {
		await schema.validate(obj);
	} catch(err) {
		validationErrors = err;
	}

	return validationErrors;
}

function* log_event() {
	while(true) {
		let payload = yield take(actions.log_event);
		try {
			console.log(payload)
		} catch(error) {
			console.warn(error);
		}
	}
}

let ws;
function* createEventChannel(path) {
	return eventChannel(emit => {
		function createWs() {
			let { hostname, port, protocol } = window.location;
			protocol = protocol === "https:" ? "wss:" : "ws:";
			ws = new WebSocket( `${protocol}//${hostname}:${port}/iapi${path}`);
			
			ws.onmessage = function(message) {
				let data;
				try {
					data = JSON.parse(message.data)
				} catch (e) {
					console.warn("Could not parse websocket data - expected json data.")
				}
				
				emit(data);
			};

			ws.onopen = function(evt) {
				console.log("websocket connected...");
			};

			ws.onerror = function() { 
				console.log("websocket errored...");
			};

			ws.onclose = function(e) {
				if(e.code === 1005) {
					console.log("websocket closed...");
					emit(END);
				} else {
					console.log("websocket closed unexpectedly. Attempting to reconnect in 4 seconds...");
					setTimeout(() =>  {
	                    createWs();
	                }, 4000);
				}
			}
		}

		createWs();

		return () => {
			console.log("websocket closed...");
			ws.close();
		};
	});
}

function* _initializeWebSocketsChannel() {
	while(true) {
		let { path, payload } = yield take(actions.init_websocket);
		path = makePath(path, payload);

		const channel = yield call(createEventChannel, path);
		while (true) {
			const { message, type } = yield take(channel);
			console.log(message);
			console.log(type);
		}
	}
}

const delay = ms => new Promise(resolve => setTimeout(() => resolve('timed out'), ms));

function* RequestPasswordReset() {
	while(true) {
		let { inputVariables, params, history } = yield take(actions.RequestPasswordReset);
		
		// Write page parameters to temporary state for standard access.
		let state = yield select();
		params && Object.keys(params).forEach((k) => state.reducer[k] = params[k]);
		
		let payload;
		
		try {
			
			
			
			
var RequestPasswordResetErrorMessageVariable = "Error resetting password! Ensure you use a valid email!"

			
			
var RequestPasswordResetSuccessMessageVariable = "Check your email for a reset link"

			
			
			
payload = {};
payload['query_variables'] = {};
payload.query_variables['email'] = state.reducer?.['requestPasswordResetEPI'];

const response1236728 = yield call(serverApi.RequestPasswordResetEndpoint, payload);

const RequestPasswordResetEndpointResponseCodeAsVariable = response1236728.status;
if (RequestPasswordResetEndpointResponseCodeAsVariable == 
state.reducer['httpSuccessCode']
) {
window.alert(RequestPasswordResetSuccessMessageVariable)
}
if (RequestPasswordResetEndpointResponseCodeAsVariable != 
state.reducer['httpSuccessCode']
) {
window.alert(RequestPasswordResetErrorMessageVariable)
}
		} catch(error) {
            console.warn(error)
		}
	}
}
function* CloseSidebar() {
	while(true) {
		let { inputVariables, params, history } = yield take(actions.CloseSidebar);
		
		// Write page parameters to temporary state for standard access.
		let state = yield select();
		params && Object.keys(params).forEach((k) => state.reducer[k] = params[k]);
		
		let payload;
		
		try {
			
			
			if (
state.reducer['sidebarOpen']
 == 
state.reducer['true']
) {
yield put(actions.changeInput('sidebarOpen', state.reducer['false']));
}
		} catch(error) {
            console.warn(error)
		}
	}
}
function* ToggleSidebar() {
	while(true) {
		let { inputVariables, params, history } = yield take(actions.ToggleSidebar);
		
		// Write page parameters to temporary state for standard access.
		let state = yield select();
		params && Object.keys(params).forEach((k) => state.reducer[k] = params[k]);
		
		let payload;
		
		try {
			
			
			if (
state.reducer['sidebarOpen']
 == 
state.reducer['true']
) {
yield put(actions.changeInput('sidebarOpen', state.reducer['false']));
}
if (
state.reducer['sidebarOpen']
 == 
state.reducer['false']
) {
yield put(actions.changeInput('sidebarOpen', state.reducer['true']));
}
		} catch(error) {
            console.warn(error)
		}
	}
}
function* GetMe() {
	while(true) {
		let { inputVariables, params, history } = yield take(actions.GetMe);
		
		// Write page parameters to temporary state for standard access.
		let state = yield select();
		params && Object.keys(params).forEach((k) => state.reducer[k] = params[k]);
		
		let payload;
		
		try {
			
			
			
yield put(actions.changeInput('loginEPI.email', state.reducer['emptyStr']));




yield put(actions.changeInput('loginEPI.password', state.reducer['emptyStr']));




yield put(actions.changeInput('signUpEPI.email', state.reducer['emptyStr']));




yield put(actions.changeInput('signUpEPI.password', state.reducer['emptyStr']));





const response1236690 = yield call(serverApi.GetMeEndpoint, null);
const GetMeEndpointResponseAsVariable = response1236690.data;
const GetMeEndpointResponseCodeAsVariable = response1236690.status;
if (GetMeEndpointResponseCodeAsVariable == 
state.reducer['httpSuccessCode']
) {
yield put(actions.changeInput('currentUser', GetMeEndpointResponseAsVariable));




yield put(actions.changeInput('isLoggedIn', state.reducer['true']));
}
if (GetMeEndpointResponseCodeAsVariable != 
state.reducer['httpSuccessCode']
) {
yield put(actions.changeInput('isLoggedIn', state.reducer['false']));




yield put(actions.removeField('currentUser'));
}
		} catch(error) {
            console.warn(error)
		}
	}
}
function* Logout() {
	while(true) {
		let { inputVariables, params, history } = yield take(actions.Logout);
		
		// Write page parameters to temporary state for standard access.
		let state = yield select();
		params && Object.keys(params).forEach((k) => state.reducer[k] = params[k]);
		
		let payload;
		
		try {
			
			
			

const response1236702 = yield call(serverApi.LogoutEndpoint, null);

const LogoutEndpointResponseCodeAsVariable = response1236702.status;
if (LogoutEndpointResponseCodeAsVariable == 
state.reducer['httpSuccessCode']
) {
yield put(actions.changeInput('isLoggedIn', state.reducer['false']));




yield put(actions.removeField('currentUser'));
}
		} catch(error) {
            console.warn(error)
		}
	}
}
function* ResetPassword() {
	while(true) {
		let { inputVariables, params, history } = yield take(actions.ResetPassword);
		
		// Write page parameters to temporary state for standard access.
		let state = yield select();
		params && Object.keys(params).forEach((k) => state.reducer[k] = params[k]);
		
		let payload;
		
		try {
			
			
			let ResetPasswordTokenVariable = inputVariables["resetPasswordToken"]
			
			
			
			
			
var ResetPasswordErrorMessageVariable = "Could not reset password! Link may have expired or is not valid"

			
			
var ResetPasswordSuccessMessageVariable = "Successfully reset password!"

			
			
			
payload = {};
payload['query_variables'] = {};
payload.query_variables['password'] = state.reducer?.['resetPasswordEPI'];
payload.query_variables['token'] = ResetPasswordTokenVariable;

const response1236697 = yield call(serverApi.ResetPasswordEndpoint, payload);

const ResetPasswordResponseCodeVariable = response1236697.status;
if (ResetPasswordResponseCodeVariable == 
state.reducer['httpSuccessCode']
) {
window.alert(ResetPasswordSuccessMessageVariable)
}
if (ResetPasswordResponseCodeVariable != 
state.reducer['httpSuccessCode']
) {
window.alert(ResetPasswordErrorMessageVariable)
}
		} catch(error) {
            console.warn(error)
		}
	}
}
function* SignupWithValidation() {
	while(true) {
		let { inputVariables, params, history } = yield take(actions.SignupWithValidation);
		
		// Write page parameters to temporary state for standard access.
		let state = yield select();
		params && Object.keys(params).forEach((k) => state.reducer[k] = params[k]);
		
		let payload;
		
		try {
			
			
			if (
state.reducer['signUpEPI']['confirm_password']
 != 
state.reducer['signUpEPI']['password']
) {
yield put(actions.changeInput('error_signUpPasswordMismatch', state.reducer['true']));
}
if (
state.reducer['signUpEPI']['email']
.length > 
state.reducer['zero']
 && 
state.reducer['signUpEPI']['password']
.length > 
state.reducer['zero']
 && 
state.reducer['signUpEPI']['password']
 == 
state.reducer['signUpEPI']['confirm_password']
) {
yield put(actions.changeInput('error_signUpPasswordMismatch', state.reducer['false']));



yield put(actions.runAction("SignUp", { history: history, inputVariables:{} }));
}
		} catch(error) {
            console.warn(error)
		}
	}
}
function* UpdatePassword() {
	while(true) {
		let { inputVariables, params, history } = yield take(actions.UpdatePassword);
		
		// Write page parameters to temporary state for standard access.
		let state = yield select();
		params && Object.keys(params).forEach((k) => state.reducer[k] = params[k]);
		
		let payload;
		
		try {
			
			
			
payload = {};

payload['body_variables'] = {};
payload.body_variables['old_password'] = state.reducer?.['updatePasswordEPI']?.['old_password'];
payload.body_variables['new_password'] = state.reducer?.['updatePasswordEPI']?.['new_password'];
payload.body_variables['confirm_password'] = state.reducer?.['updatePasswordEPI']?.['confirm_password'];
const response1236712 = yield call(serverApi.Action46465Endpoint, payload);

const UpdatePasswordResponseCodeVariable = response1236712.status;
if (UpdatePasswordResponseCodeVariable == 
state.reducer['httpSuccessCode']
) {

}
		} catch(error) {
            console.warn(error)
		}
	}
}
function* Login() {
	while(true) {
		let { inputVariables, params, history } = yield take(actions.Login);
		
		// Write page parameters to temporary state for standard access.
		let state = yield select();
		params && Object.keys(params).forEach((k) => state.reducer[k] = params[k]);
		
		let payload;
		
		try {
			
			
			
			
var LoginErrorMessageVariable = "Invalid login credentials"

			
			
			
payload = {};

payload['body_variables'] = {};
payload.body_variables['email'] = state.reducer?.['loginEPI']?.['email'];
payload.body_variables['password'] = state.reducer?.['loginEPI']?.['password'];
const response1236714 = yield call(serverApi.LoginEndpoint, payload);

const LoginEndpointResponseCodeAsVariable = response1236714.status;
if (LoginEndpointResponseCodeAsVariable == 
state.reducer['httpSuccessCode']
) {
yield put(actions.runAction("GetMe", { history: history, inputVariables:{} }));
}
if (LoginEndpointResponseCodeAsVariable != 
state.reducer['httpSuccessCode']
) {
window.alert(LoginErrorMessageVariable)
}
		} catch(error) {
            console.warn(error)
		}
	}
}
function* SignUp() {
	while(true) {
		let { inputVariables, params, history } = yield take(actions.SignUp);
		
		// Write page parameters to temporary state for standard access.
		let state = yield select();
		params && Object.keys(params).forEach((k) => state.reducer[k] = params[k]);
		
		let payload;
		
		try {
			
			
			
			
var SignUpErrorMessageVariable = "Email already in use!"

			
			
			
payload = {};

payload['body_variables'] = {};
payload.body_variables['email'] = state.reducer?.['signUpEPI']?.['email'];
payload.body_variables['password'] = state.reducer?.['signUpEPI']?.['password'];
payload.body_variables['confirm_password'] = state.reducer?.['signUpEPI']?.['confirm_password'];
const response1236706 = yield call(serverApi.SignUpEndpoint, payload);

const SignUpEndpointResponseCodeAsVariable = response1236706.status;
if (SignUpEndpointResponseCodeAsVariable == 
state.reducer['httpSuccessCode']
) {
yield put(actions.changeInput('error_signUpEmailInUse', state.reducer['false']));



yield put(actions.runAction("GetMe", { history: history, inputVariables:{} }));
}
if (SignUpEndpointResponseCodeAsVariable != 
state.reducer['httpSuccessCode']
) {
yield put(actions.changeInput('error_signUpEmailInUse', state.reducer['true']));
}
		} catch(error) {
            console.warn(error)
		}
	}
}
function* on_app_started() {
	while(true) {
		let { inputVariables, params, history } = yield take(actions.on_app_started);
		
		// Write page parameters to temporary state for standard access.
		let state = yield select();
		params && Object.keys(params).forEach((k) => state.reducer[k] = params[k]);
		
		let payload;
		
		try {
			
			
			
yield put(actions.changeInput('loginEPI.email', state.reducer['emptyStr']));




yield put(actions.changeInput('loginEPI.password', state.reducer['emptyStr']));




yield put(actions.changeInput('signUpEPI.email', state.reducer['emptyStr']));




yield put(actions.changeInput('signUpEPI.password', state.reducer['emptyStr']));





const response1236690 = yield call(serverApi.GetMeEndpoint, null);
const GetMeEndpointResponseAsVariable = response1236690.data;
const GetMeEndpointResponseCodeAsVariable = response1236690.status;
if (GetMeEndpointResponseCodeAsVariable == 
state.reducer['httpSuccessCode']
) {
yield put(actions.changeInput('currentUser', GetMeEndpointResponseAsVariable));




yield put(actions.changeInput('isLoggedIn', state.reducer['true']));
}
if (GetMeEndpointResponseCodeAsVariable != 
state.reducer['httpSuccessCode']
) {
yield put(actions.changeInput('isLoggedIn', state.reducer['false']));




yield put(actions.removeField('currentUser'));
}
yield put(actions.changeInput("_app_initialized", true));
		} catch(error) {
            console.warn(error)
		}
	}
}

export default function* saga() {
	yield fork(log_event);
	yield fork(_initializeWebSocketsChannel);
	yield fork(RequestPasswordReset);
	yield fork(CloseSidebar);
	yield fork(ToggleSidebar);
	yield fork(GetMe);
	yield fork(Logout);
	yield fork(ResetPassword);
	yield fork(SignupWithValidation);
	yield fork(UpdatePassword);
	yield fork(Login);
	yield fork(SignUp);
	yield fork(on_app_started);
}
