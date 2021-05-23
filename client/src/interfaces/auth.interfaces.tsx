import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
} from 'constants/auth.constants'; import { IUser } from './user.interfaces';

export interface IAuth {

}

export interface AuthState {
    authLoading: boolean
    loggedInUser: IUser | null
    isAuth: false
    authError: ''
}

// actions
interface LoginRequestAction { type: typeof LOGIN_REQUEST }
interface LoginSuccessAction {
    type: typeof LOGIN_SUCCESS
    payload: IUser
}
interface LoginFailAction {
    type: typeof LOGIN_FAIL
    payload: string
}




interface RegisterRquestlAction { type: typeof REGISTER_REQUEST }
interface RegisterSuccessAction {
    type: typeof REGISTER_SUCCESS
    payload: IUser
}
interface RegisterFailAction {
    type: typeof REGISTER_FAIL
    payload: string
}



interface LogoutAction { type: typeof LOGOUT }


export type AuthActions = LoginRequestAction | LoginSuccessAction | LoginFailAction | LogoutAction | RegisterFailAction | RegisterRquestlAction | RegisterSuccessAction;