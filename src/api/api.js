import { makeRequest } from './restApi.js';
export function Action46465Endpoint(payload) {
    return makeRequest('/v1/users/password', 'PUT', 'application/json;charset=UTF-8', payload);
}

export function Action47118Endpoint(payload) {
    return makeRequest('/v1/users', 'DELETE', 'application/json;charset=UTF-8', payload);
}

export function Action47159Endpoint(payload) {
    return makeRequest('/v1/users/confirm_email', 'GET', 'application/json;charset=UTF-8', payload);
}

export function GetMeEndpoint(payload) {
    return makeRequest('/v1/me', 'GET', 'application/json;charset=UTF-8', payload);
}

export function GetUsersEndpoint(payload) {
    return makeRequest('/v1/users', 'GET', 'application/json;charset=UTF-8', payload);
}

export function LoginEndpoint(payload) {
    return makeRequest('/v1/login', 'POST', 'application/json;charset=UTF-8', payload);
}

export function LogoutEndpoint(payload) {
    return makeRequest('/v1/logout', 'GET', 'application/json;charset=UTF-8', payload);
}

export function RequestPasswordResetEndpoint(payload) {
    return makeRequest('/v1/request_password_reset', 'GET', 'application/json;charset=UTF-8', payload);
}

export function ResetPasswordEndpoint(payload) {
    return makeRequest('/v1/reset_password', 'GET', 'application/json;charset=UTF-8', payload);
}

export function SignUpEndpoint(payload) {
    return makeRequest('/v1/signup', 'POST', 'application/json;charset=UTF-8', payload);
}
