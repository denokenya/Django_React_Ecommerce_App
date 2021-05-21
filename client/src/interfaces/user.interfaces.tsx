import { 
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    USER_DETAILS_RESET,
    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_SUCCESS,
    USER_UPDATE_PROFILE_FAIL,
    USER_UPDATE_PROFILE_RESET,
    USER_LIST_REQUEST,
    USER_LIST_SUCCESS,
    USER_LIST_FAIL,
    USER_LIST_RESET,
    USER_DELETE_REQUEST,
    USER_DELETE_SUCCESS,
    USER_DELETE_FAIL,
    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS,
    USER_UPDATE_FAIL,
    USER_UPDATE_RESET,
 } from 'constants/user.constants';
 
export interface IUser {
    id: string
    username: string
    name: string
    email: string
    password: string
    confirmationPassword: string
}

export interface UserInfo {
    username: string
    firstname: string
    lastname: string
}

export interface UserState {
    success: boolean
    loading: boolean
    users: IUser[]
    user: IUser
    userInfo: IUser
    error: string
}

// actions
interface UserDetailRequest { type: typeof USER_DETAILS_REQUEST }
interface UserDetailSuccesst {
    type: typeof USER_DETAILS_SUCCESS
    payload: IUser
}
interface UserDetailFail {
    type: typeof USER_DETAILS_FAIL
    payload: string
}
interface UserDetailReset { type: typeof USER_DETAILS_RESET }



interface UpdateProfileRequest { type: typeof USER_UPDATE_PROFILE_REQUEST }
interface UpdateProfileSuccess {
    type: typeof USER_UPDATE_PROFILE_SUCCESS
    payload: IUser
}
interface UpdateProfileFail {
    type: typeof USER_UPDATE_PROFILE_FAIL
    payload: string
}
interface UpdateProfileReset { type: typeof USER_UPDATE_PROFILE_RESET }



interface GetUsersRequest { type: typeof USER_LIST_REQUEST }
interface GetUsersSuccess {
    type: typeof USER_LIST_SUCCESS
    payload: IUser[]
}
interface GetUsersFail {
    type: typeof USER_LIST_FAIL
    payload: string
}
interface GetUsersReset { type: typeof USER_LIST_RESET }



interface DeleteUserRequest { type: typeof USER_DELETE_REQUEST }
interface DeleteUserSuccess { type: typeof USER_DELETE_SUCCESS }
interface DeleteUserFail {
    type: typeof USER_DELETE_FAIL
    payload: string
}



interface UpdateUserRequest { type: typeof USER_UPDATE_REQUEST }
interface UpdateUserSuccess { type: typeof USER_UPDATE_SUCCESS }
interface UpdateUserFail {
    type: typeof USER_UPDATE_FAIL
    payload: string
}
interface UpdateUserReset { type: typeof USER_UPDATE_RESET }



export type UserActions = UserDetailRequest | UserDetailSuccesst | UserDetailFail | UpdateProfileRequest | UpdateProfileSuccess | UpdateProfileFail | UpdateProfileReset | GetUsersSuccess | GetUsersRequest | GetUsersFail | GetUsersReset | DeleteUserRequest | DeleteUserSuccess | DeleteUserFail | UpdateUserRequest | UpdateUserSuccess | UpdateUserFail | UpdateUserReset| UserDetailReset;