import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DELETE_FAIL,
    PRODUCT_UPDATE_REQUEST,
    PRODUCT_UPDATE_SUCCESS,
    PRODUCT_UPDATE_FAIL,
    PRODUCT_UPDATE_RESET,
    PRODUCT_CREATE_REVIEW_REQUEST,
    PRODUCT_CREATE_REVIEW_SUCCESS,
    PRODUCT_CREATE_REVIEW_FAIL,
    PRODUCT_CREATE_REVIEW_RESET,
    PRODUCT_TOP_REQUEST,
    PRODUCT_TOP_SUCCESS,
    PRODUCT_TOP_FAIL,
    PRODUCT_CREATE_REQUEST,
    PRODUCT_CREATE_SUCCESS,
    PRODUCT_CREATE_FAIL,
    PRODUCT_CREATE_RESET
} from 'constants/product.constants'
import { IUser } from './user.interfaces';

export interface IProduct {
    _id: string
    name: string
    image: string
    description: string
    brand: string
    category: string
    price: number
    countInStock: number
    rating?: number
    numReviews?: number
    reviews?: any
}

export interface IReview {
    _id: string
    product: IProduct
    user: IUser
    name: string
    rating: number
    comment: string
    createdAt: Date
}

export interface IProductForm {
    _id?: string
    name: string
    price: number
    brand: string
    category: string
    countInStock: number
    description: string,
    image?: any 
}

export interface ProductState {
    products: IProduct[]
    product: IProduct | null
    loading: boolean
    page: number
    pages: number
    error?: string
    success?: boolean
}

// actions 
interface ProductListRequest { type: typeof PRODUCT_LIST_REQUEST }
interface ProductListSuccess {
    type: typeof PRODUCT_LIST_SUCCESS
    payload: ProductState
}
interface ProductListFail {
    type: typeof PRODUCT_LIST_FAIL
    payload: string
}



interface ProductDetailsRequest { type: typeof PRODUCT_DETAILS_REQUEST }
interface ProductDetailsSuccess {
    type: typeof PRODUCT_DETAILS_SUCCESS
    payload: IProduct
}
interface ProductDetailsFail {
    type: typeof PRODUCT_DETAILS_FAIL
    payload: string
}



interface ProductDeleteRequest { type: typeof PRODUCT_DELETE_REQUEST }
interface ProductDeleteSuccess { 
    type: typeof PRODUCT_DELETE_SUCCESS
    payload: IProduct
}
interface ProductDeleteFail {
    type: typeof PRODUCT_DELETE_FAIL
    payload: string
}



interface ProductCreateRequest {type: typeof PRODUCT_CREATE_REQUEST }
interface ProductCreateSuccess {
    type: typeof PRODUCT_CREATE_SUCCESS
    payload: IProduct
}
interface ProductCreateFail {
    type: typeof PRODUCT_CREATE_FAIL
    payload: string
}
interface ProductCreateReset { type: typeof PRODUCT_CREATE_RESET }



interface ProductUpdateRequest { type: typeof PRODUCT_UPDATE_REQUEST }
interface ProductUpdateSuccess {
    type: typeof PRODUCT_UPDATE_SUCCESS
    payload: IProduct
}
interface ProductUpdateFail {
    type: typeof PRODUCT_UPDATE_FAIL
    payload: string
}
interface ProductUpdateReset { type: typeof PRODUCT_UPDATE_RESET }



interface ProductCreateReviewRequest { type: typeof PRODUCT_CREATE_REVIEW_REQUEST }
interface ProductCreateReviewSuccess { 
    type: typeof PRODUCT_CREATE_REVIEW_SUCCESS 
    payload: IReview
}
interface ProductCreateReviewFail {
    type: typeof PRODUCT_CREATE_REVIEW_FAIL
    payload: string
}
interface ProductCreateReviewReset {
    type: typeof PRODUCT_CREATE_REVIEW_RESET
}



interface ProductTopRequest { type: typeof PRODUCT_TOP_REQUEST }
interface ProductTopSuccess {
    type: typeof PRODUCT_TOP_SUCCESS
    payload: IProduct[]
}
interface ProductTopFail {
    type: typeof PRODUCT_TOP_FAIL
    payload: string
}


export type ProductActions = ProductListRequest | ProductListSuccess | ProductListFail | ProductDetailsRequest | ProductDetailsSuccess | ProductDetailsFail | ProductDeleteRequest | ProductDeleteFail | ProductDeleteSuccess | ProductCreateRequest | ProductCreateSuccess | ProductCreateFail | ProductCreateReset | ProductUpdateRequest | ProductUpdateSuccess | ProductUpdateFail | ProductUpdateReset | ProductCreateReviewRequest | ProductCreateReviewSuccess | ProductCreateReviewFail | ProductCreateReviewReset | ProductTopRequest | ProductTopSuccess | ProductTopFail;