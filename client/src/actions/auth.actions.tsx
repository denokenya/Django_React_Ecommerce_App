import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
} from 'constants/auth.constants';
import { ORDER_LIST_MY_RESET } from 'constants/order.constants';
import { USER_LIST_RESET, USER_DETAILS_RESET } from 'constants/user.constants';
import axios from 'axios';
import { AuthActions } from 'interfaces/auth.interfaces';
import { Dispatch } from 'react';
import { UserActions } from 'interfaces/user.interfaces';
import { OrderActions } from 'interfaces/order.interfaces';

// config
const config = {
    headers: {
        'Content-type': 'application/json'
    }
}

export const login = (email: string, password: string) => async (dispatch: Dispatch<AuthActions>) => {
    try {
        dispatch({ type: LOGIN_REQUEST });

        const { data } = await axios.post(
            '/api/users/login/',
            { 'username': email, 'password': password },
            config
        );

        dispatch({
            type: LOGIN_SUCCESS,
            payload: data
        })
        localStorage.setItem('my_token', data.token);
    } catch (error) {
        dispatch({
            type: LOGIN_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const register = (name: string, email: string, password: string) => async (dispatch: Dispatch<AuthActions>) => {
    try {
        dispatch({ type: REGISTER_REQUEST });

        const { data } = await axios.post(
            '/api/users/register/',
            { 'name': name, 'email': email, 'password': password },
            config
        );

        dispatch({
            type: REGISTER_SUCCESS,
            payload: data
        });

        dispatch({
            type: LOGIN_SUCCESS,
            payload: data
        });
        localStorage.setItem('my_token', data.token);
    } catch (error) {
        dispatch({
            type: REGISTER_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const logout = () => (dispatch: Dispatch<AuthActions | UserActions | OrderActions>) => {
    localStorage.removeItem('user')
    dispatch({ type: LOGOUT })
    dispatch({ type: USER_DETAILS_RESET })
    dispatch({ type: ORDER_LIST_MY_RESET })
    dispatch({ type: USER_LIST_RESET })
}