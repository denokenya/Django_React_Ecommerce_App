import { auth_constants } from 'constants/auth.constants';

export interface IUser {

}

export interface UserState {
    loading: boolean
    userInfo: IUser
    error?: ''
}

// actions
interface LoginRequestAction {
    type: typeof auth_constants.LOGIN_REQUEST
    payload: boolean
}

interface LoginSuccessAction {
    type: typeof auth_constants.LOGIN_SUCCESS
    payload: UserState
}

interface LoginFailAction {
    type: typeof auth_constants.LOGIN_FAIL
    payload: {
        loading: boolean
        error: string
    }
}

interface RegisterRquestlAction {
    type: typeof auth_constants.REGISTER_REQUEST
    payload: {
        loading: boolean
        error: string
    }
}

interface RegisterSuccessAction {
    type: typeof auth_constants.REGISTER_SUCCESS
    payload: UserState
}

interface RegisterFailAction {
    type: typeof auth_constants.REGISTER_FAIL
    payload: {
        loading: boolean
        error: string
    }
}

interface LogoutAction {
    type: typeof auth_constants.LOGOUT
    payload: {}
}

export type AuthActions = LoginRequestAction | LoginSuccessAction | LoginFailAction | LogoutAction | RegisterFailAction | RegisterRquestlAction | RegisterSuccessAction;