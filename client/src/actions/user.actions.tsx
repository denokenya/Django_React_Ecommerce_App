import {
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_SUCCESS,
    USER_UPDATE_PROFILE_FAIL,
    USER_LIST_REQUEST,
    USER_LIST_SUCCESS,
    USER_LIST_FAIL,
    USER_DELETE_REQUEST,
    USER_DELETE_SUCCESS,
    USER_DELETE_FAIL,
    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS,
    USER_UPDATE_FAIL,
} from 'constants/user.constants';
import { LOGIN_SUCCESS } from 'constants/auth.constants';
import { IUser, UserActions } from 'interfaces/user.interfaces';
import { Dispatch } from 'react';
import axios from 'axios';
import { AuthActions } from 'interfaces/auth.interfaces';
import { config } from 'utils';


export const getUserDetails = (id: string) => async (dispatch: Dispatch<UserActions>) => {
    try {
        dispatch({ type: USER_DETAILS_REQUEST });

        // get user details
        const { data } = await axios.get(
            `/api/users/${id}/`,
            config
        )

        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: USER_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const getUsers = () => async (dispatch: Dispatch<UserActions>) => {
    try {
        dispatch({ type: USER_LIST_REQUEST });

        // get users
        const { data } = await axios.get(`/api/users/`, config);
        console.log(data);

        dispatch({
            type: USER_LIST_SUCCESS,
            payload: data
        });

        return Promise.resolve(data);
    } catch (error) {
        dispatch({
            type: USER_LIST_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        });
        return Promise.reject(error);
    }
}

export const updateProfile = (user: IUser) => async (dispatch: Dispatch<UserActions | AuthActions>) => {
    try {
        dispatch({ type: USER_UPDATE_PROFILE_REQUEST });

        // update user
        const { data } = await axios.put(
            `/api/users/profile/update/`,
            user,
            config
        );

        dispatch({
            type: USER_UPDATE_PROFILE_SUCCESS,
            payload: data
        })

        dispatch({
            type: LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
        dispatch({
            type: USER_UPDATE_PROFILE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const deleteUser = (id: string) => async (dispatch: Dispatch<UserActions>) => {
    try {
        dispatch({ type: USER_DELETE_REQUEST });

        // delete user
        const { data } = await axios.delete(
            `/api/users/delete/${id}/`,
            config
        );

        dispatch({
            type: USER_DELETE_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: USER_DELETE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

// update user 
export const updateUser = (user: IUser) => async (dispatch: Dispatch<UserActions>) => {
    try {
        dispatch({ type: USER_UPDATE_REQUEST });

        // update user for admin 
        const { data } = await axios.put(
            `/api/users/update/${user._id}/`,
            user,
            config
        )

        dispatch({
            type: USER_UPDATE_SUCCESS,
        });

        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: USER_UPDATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}