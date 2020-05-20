import { takeEvery } from 'redux-saga/effects';
import { logOutSaga, checkAuthTimeOutSaga, authSaga, authCheckStateSaga } from './auth-sagas';
import { initIngredientsSaga } from './burger-builder-sagas';
import { purchaseBurgerSaga, fetchOrdersSaga } from './orders-sagas';
import * as actionTypes from '../actions/action-types';

export function* watchAuth(){
    yield takeEvery(actionTypes.AUTH_LOGOUT_INITIATE, logOutSaga);
    yield takeEvery(actionTypes.CHECK_AUTH_TIMEOUT, checkAuthTimeOutSaga);
    yield takeEvery(actionTypes.AUTH_USER, authSaga);
    yield takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga);
}

export function* watchBurgerBuilder() {
    yield takeEvery(actionTypes.INIT_INGREDIENTS, initIngredientsSaga);
}

export function* watchOrders() {
    yield takeEvery(actionTypes.PURCHASE_BURGER, purchaseBurgerSaga);
    yield takeEvery(actionTypes.FETCH_ORDERS, fetchOrdersSaga);
}
