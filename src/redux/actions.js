export const remove_field = 'remove_field';
export const change_input = 'change_input';
export const perform_math_operation = 'perform_math_operation';
export const array_add = 'array_add';
export const remove_at = 'remove_at';

export const on_app_started = 'on_app_started';

export const log_event = 'log_event';

export const init_websocket = 'init_websocket';
export const ws_msg_recieved = 'ws_msg_recieved';
export const CloseSidebar = 'CloseSidebar';
export const GetMe = 'GetMe';
export const Login = 'Login';
export const Logout = 'Logout';
export const RequestPasswordReset = 'RequestPasswordReset';
export const ResetPassword = 'ResetPassword';
export const SignUp = 'SignUp';
export const SignupWithValidation = 'SignupWithValidation';
export const ToggleSidebar = 'ToggleSidebar';
export const UpdatePassword = 'UpdatePassword';

export const initWebsocket = (path) => {
    return ({
        type: init_websocket,
        payload: {
            path: path
        },
    })
}

export const removeField = (key, index) => {
	return ({
        type: remove_field,
        payload: {
            key: key,
            index: index,
        },
    })
};

export const changeInput = (key, value) => {
    return ({
        type: change_input,
        payload: {
            name: key,
            value: value,
        },
    })
};

export const performMathOperation = (name, operator, variable, value) => {
     return ({
        type: perform_math_operation,
        payload: {
            name: name,
            operator: operator,
            variable: variable,
            value: value,
        },
    })
};

export const arrayAdd = (arrayKey, item, position) => ({
	type: array_add,
	payload: { arrayKey, item, position },
});

export const removeAt = (arrayKey, index) => ({
    type: remove_at,
    payload: { arrayKey, index },
});


export const runAction = (type, payload) =>  ({ type: type, ...payload });

export const logEvent = (payload) =>  ({ type: log_event, payload });
