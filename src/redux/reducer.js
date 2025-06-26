import * as actions from './actions.js';
import _ from 'lodash';
import { combineReducers } from 'redux';
import { api } from '../api/rtkQuery';

const initialState = {
    _app_initialized: false,
    "emptyStr": "",
    "error_signUpEmailInUse": false,
    "error_signUpPasswordMismatch": false,
    "false": false,
    "httpSuccessCode": 200,
    "isLoggedIn": false,
    "loginEPI": {"email":null,
"password":null},
    "requestPasswordResetEPI": "",
    "resetPasswordEPI": "",
    "sidebarClosedClass": "sidebar border-end px-4 py-3 bg-white",
    "sidebarOpen": false,
    "sidebarOpenClass": "sidebar border-end px-4 py-3 bg-white open",
    "signUpEPI": {"email":null,
"password":null,
"confirm_password":null},
    "true": true,
    "updatePasswordEPI": {"old_password":null,
"new_password":null,
"confirm_password":null},
    "zero": 0,
};

// Define Array constants
const ArrayAddBeginning = "beginning";
const ArrayAddEnd = "end";

// Define MathOperator constants
const MathAdd = "add";
const MathSubtract = "subtract";
const MathMultiply = "multiply";
const MathDivide = "divide";
const MathModulus = "modulus";

// Helper function to perform math operations
const performMathOperation = (operator, value1, value2) => {
    switch (operator) {
        case MathAdd:
            return value1 + value2;
        case MathSubtract:
            return value1 - value2;
        case MathMultiply:
            return value1 * value2;
        case MathDivide:
            return value1 / value2;
        case MathModulus:
            return value1 % value2;
        default:
            return 0;
    }
};

const reducerMain = (state = initialState, action = {}) => {
    const {type, payload} = action;
    if(type === actions.remove_field) {
        const newState = _.cloneDeep(state);
        const deleted = _.unset(newState, payload.key);
        if(!deleted) {
            console.warn(`Could not remove field at ${payload.key}`);
        }

        return newState;
    } else if (type === actions.change_input) {
        return _.setWith(_.clone(state), payload.name, payload.value, _.clone)
    } else if (type === actions.perform_math_operation) {
        const { name, operator, variable, value } = payload;
        return _.setWith(_.clone(state), name, performMathOperation(operator, variable, value), _.clone)
    } else if (type === actions.array_add) {
        const { arrayKey, item, position } = payload;
        
        const existingArray = _.get(state, arrayKey, []);
        const newArray = Array.isArray(existingArray) ? _.clone(existingArray) : [];
    
        if (position === ArrayAddBeginning) {
            newArray.unshift(item);
        } else if (position === ArrayAddEnd) {
            newArray.push(item);
        }
        
        return _.setWith(_.clone(state), arrayKey, newArray, _.clone);
    } else if (type === actions.remove_at) {
        const { arrayKey, index } = payload;

        const existingArray = _.get(state, arrayKey, []);
        const newArray = Array.isArray(existingArray) ? _.clone(existingArray) : [];

        if (index >= 0 && index < newArray.length) {
            newArray.splice(index, 1); // Remove one element at the given index
        } else {
            console.warn(`Index ${index} is out of range for array ${arrayKey}`);
        }

        return _.setWith(_.clone(state), arrayKey, newArray, _.clone);
    }

   
    return state;
}

const reducer = combineReducers({
    reducer: reducerMain,
    [api.reducerPath]: api.reducer
});

export default reducer;
