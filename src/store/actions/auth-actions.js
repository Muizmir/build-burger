import * as actionTypes from './action-types';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (tokenId, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        tokenId: tokenId,
        userId: userId
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const logOut = () => {
    return {
        type: actionTypes.AUTH_LOGOUT_INITIATE
    }
}

export const logOutSucceed = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeOut = (expirationTime) => {
    return {
        type: actionTypes.CHECK_AUTH_TIMEOUT,
        expirationTime: expirationTime
    }
}

export const auth = (email, password, signUp) => {
    return{
        type: actionTypes.AUTH_USER,
        email: email,
        password: password,
        signUp: signUp
    }
}

export const setAuthRedirectPage = path => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
}

export const authCheckState = () => {
    return {
        type: actionTypes.AUTH_CHECK_STATE
    }
}