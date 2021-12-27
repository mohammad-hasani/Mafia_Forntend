import axios from 'axios';
import {
    REQUEST,
    LOGIN_SEND_SUCCESS,
    LOGIN_SEND_SUCCESS_CONFIRM,
    LOGOUT_SEND_SUCCESS,
    PROFILE_READ_DATA,
    FAILURE,
    CHANGED,
    WITHDRAW_SEND_SUCCESS,
    CHARGE_GET_SUCCESS,
    CHARGE_POST_SUCCESS,
    GET_STREAM_SUCCESS,
    GET_PLAYER_SUCCESS
} from "./types";
import {SERVER_IP} from '../index'


const Request = (response) => {
    return ({
        type:REQUEST,
        payload: response
    })
}

const sendLoginSuccess = (token, phonenumber) => {
    return ({
        type:LOGIN_SEND_SUCCESS,
        token:token,
        phonenumber: phonenumber
    })
}
const sendLoginSuccessConfirm = (token) => {
    return ({
        type: LOGIN_SEND_SUCCESS_CONFIRM,
        token: token
    })
}

const sendLogoutSuccess = (payload) => {
    return ({
        type: LOGOUT_SEND_SUCCESS,
        payload: payload
    })
}

const getProfileDataSuccess = (username, phonenumber, email, money) => {
    return ({
        type: PROFILE_READ_DATA,
        username: username,
        phonenumber: phonenumber,
        email: email,
        money: money
    })
}

const setProfileDataSuccess = (payload) => {
    return ({
        type: PROFILE_READ_DATA,
        payload: payload
    })
}

const setChangedSuccess = (changed) => {
    return ({
        type:CHANGED,
        changed: changed
    })
}

const sendFailure = (error) => {
    return ({
        type: FAILURE,
        payload: error
    })
}

const sendWithdrawSuccess = (payload) => {
    return ({
        type: WITHDRAW_SEND_SUCCESS,
        payload: payload
    })
}

const recieveChargeSuccess = (payload) => {
    return ({
        type: CHARGE_GET_SUCCESS,
        payload: payload
    })
}
const sendChargeSuccess = () => {
    return ({
        type: CHARGE_POST_SUCCESS
    })
}

const getStreamSuccess = (stream) => {
    return ({
        type: GET_STREAM_SUCCESS,
        stream: stream
    })
}

const getPlayerSuccess = (money, score, rank) => {
    return ({
        type: GET_PLAYER_SUCCESS,
        money: money,
        score: score,
        rank: rank
    })
}


export const sendLogin = (data, url) => {
    return (dispatch) => {
        dispatch(Request);
        axios.post(SERVER_IP + url, data)
        .then(response => {
            const login = response.data;

            dispatch(sendLoginSuccess(login, data.phonenumber));
            
        })
        .catch(error => {
            const error_msg = error.message;
            dispatch(sendFailure(error_msg));
        })
    }
}

export const sendLoginConfirm = (data, url) => {
    return (dispatch) => {
        dispatch(Request);
        axios.post(SERVER_IP + url, data)
        .then(response => {
            const login = response.data;
                console.log(data);
                dispatch(sendLoginSuccessConfirm(login));
            
        })
        .catch(error => {
            const error_msg = error.message;
            dispatch(sendFailure(error_msg));
        })
    }
}

export const sendLogout = (url) => {
    return (dispatch) => {
        dispatch(Request);
        axios.post(url)
        .then(response => {
            const logout = response.data;
            dispatch(sendLogoutSuccess(logout));
        })
        .catch(error => {
            const error_msg = error.message;
            dispatch();
        })
    }
}


export const getProfileData = (data, url) => {
    return (dispatch) => {
        dispatch(Request);
        axios.get(SERVER_IP + url, {params:data})
        .then(response => {
            const username    = response.data.username;
            const phonenumber = response.data.phonenumber;
            const email       = response.data.email;
            const money       = response.data.money;
            dispatch(getProfileDataSuccess(username, phonenumber, email, money));
            dispatch(setChangedSuccess(1));
        })
        .catch(error => {
            const error_msg = error.message;
            dispatch(sendFailure(error_msg));
        })
    }
}

export const setProfileData = (data, url) => {
    return (dispatch) => {
        dispatch(Request);
        axios.post(SERVER_IP + url, data)
        .then(response => {
            
            dispatch(setProfileDataSuccess(response.data));
        })
        .catch(error => {
            const error_msg = error.message;
            dispatch(sendFailure(error_msg));
        })
    }
}

export const setChanged = (data) => {
    return (dispatch) => {
        dispatch(setChangedSuccess(data));
    }
}

export const sendWithdraw = (data, url) => {
    return (dispatch) => {
        dispatch(Request);
        axios.post(SERVER_IP + url, data)
        .then(response => {
            
            dispatch(sendWithdrawSuccess(response.data));
        })
        .catch(error => {
            const error_msg = error.message;
            dispatch(sendFailure(error_msg));
        })
    }
}

export const recieveCharge = (url) => {
    return (dispatch) => {
        dispatch(Request);
        axios.get(SERVER_IP + url)
        .then(response => {
            dispatch(recieveChargeSuccess(response.data));
        })
        .catch(error => {
            const error_msg = error.message;
            dispatch(sendFailure(error_msg));
        })
    }
}

export const sendCharge = (url, data) => {
    return (dispatch) => {
        dispatch(Request);
        axios.post(SERVER_IP + url, data)
        .then(response => {
            dispatch(sendChargeSuccess(response.data));
        })
        .catch(error => {
            const error_msg = error.message;
            dispatch(sendFailure(error_msg));
        })
    }
}

export const getStream = (url) => {
    return (dispatch) => {
        dispatch(Request);
        axios.get(SERVER_IP + url)
        .then(response => {
            console.log(response.data);
            dispatch(getStreamSuccess(response.data.stream));
        })
        .catch(error => {
            const error_msg = error.message;
            dispatch(sendFailure(error_msg));
        })
    }
}

export const getPlayer = (url, data) => {
    return (dispatch) => {
        dispatch(Request);
        axios.get(SERVER_IP + url, {params: data})
        .then(response => {
            const money = response.data.money;
            const score = response.data.score;
            const rank = response.data.rank;
            dispatch(getPlayerSuccess(money, score, rank));
        })
        .catch(error => {
            const error_msg = error.message;
            dispatch(sendFailure(error_msg));
        })
    }
}
