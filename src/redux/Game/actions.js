import axios from 'axios';
import {
    REQUEST,
    GET_ROLES,
    FAILURE
} from './types';
import {SERVER_IP} from '../index';

const Request = (response) => {
    return ({
        type:REQUEST,
        payload: response
    })
}

const getRolesType = (roles) => {
    return ({
        type:GET_ROLES,
        roles:roles
    })
}

const sendFailure = (error) => {
    return ({
        type: FAILURE,
        payload: error
    })
}


export const getRoles = (url) => {
    return (dispatch) => {
        dispatch(Request);
        axios.get(SERVER_IP + url)
        .then(response => {
            dispatch(getRolesType(response.data));
        })
        .catch(error => {
            const error_msg = error.message;
            dispatch(sendFailure(error_msg));
        })
    }
}
