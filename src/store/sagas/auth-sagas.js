import { put, delay } from 'redux-saga/effects';
import axios from 'axios';
import * as actions from '../actions/exported-actions';

export function* logOutSaga(action){
    yield localStorage.removeItem('token');
    yield localStorage.removeItem('expirationDate');
    yield localStorage.removeItem('userId');    
    yield put(actions.logOutSucceed())
}

export function* checkAuthTimeOutSaga(action){
    yield delay(action.expirationTime * 1000);
    yield put(actions.logOut())
}

export function* authSaga(action) {
    yield put(actions.authStart());
    const authData = {
        email: action.email,
        password: action.password,
        returnSecureToken: true
    }

    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAFE7BC9YL-2ZJgkSBIcO4QQzeKm_MoWg0'
    if (!action.signUp) {
        url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAFE7BC9YL-2ZJgkSBIcO4QQzeKm_MoWg0'
    }
    try{
        const response = yield axios.post(url, authData)

        const expirationDate = yield new Date(new Date().getTime() + response.data.expiresIn * 1000);
        yield localStorage.setItem('token', response.data.idToken);
        yield localStorage.setItem('userId', response.data.localId);
        yield localStorage.setItem('expirationDate', expirationDate);

        yield put(actions.authSuccess(response.data.idToken, response.data.localId));
        yield put(actions.checkAuthTimeOut(response.data.expiresIn));
    }catch(error){
        yield put(actions.authFail(error.response.data.error));
    }
}

export function* authCheckStateSaga(){
    const token = yield localStorage.getItem('token');
    if (!token) {
        yield put(actions.logOut());
    } else {
        const expirationDate = new Date(localStorage.getItem('expirationDate'));
        if (expirationDate > new Date()) {
            const userId = yield localStorage.getItem('userId');
            yield put(actions.authSuccess(token, userId));
            yield put(actions.checkAuthTimeOut((expirationDate.getTime() - new Date().getTime()) / 1000));
        } else {
            yield put(actions.logOut());
        }
    }
}