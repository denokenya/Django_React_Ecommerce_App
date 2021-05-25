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
} from 'constants/product.constants';
import { ProductActions, ProductState } from 'interfaces/product.interface';

const initialState: ProductState = {
    products: [],
    product: null,
    loading: false,
    page: 0,
    pages: 0,
    error: '',
    success: false
}

const productListReducer = (state = initialState, action: ProductActions) => {
    switch (action.type) {
        // product list
        case PRODUCT_LIST_REQUEST:
            return { ...state, loading: true, products: [] }

        case PRODUCT_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                products: action.payload.products,
                page: action.payload.page,
                pages: action.payload.pages
            }

        case PRODUCT_LIST_FAIL:
            return { ...state, loading: false, error: action.payload }

        // product detail
        case PRODUCT_DETAILS_REQUEST:
            return { ...state, loading: true }

        case PRODUCT_DETAILS_SUCCESS:
            return { 
                ...state,
                loading: false, 
                product: action.payload
            }

        case PRODUCT_DETAILS_FAIL:
            return { ...state, loading: false, error: action.payload }

        // delete product
        case PRODUCT_DELETE_REQUEST:
            return { ...state, loading: true }

        case PRODUCT_DELETE_SUCCESS:
            return { 
                ...state,
                loading: false,
                success: true,
                product: action.payload
            }
        case PRODUCT_DELETE_FAIL:
            return { ...state, loading: false, error: action.payload }

        // create product
        case PRODUCT_CREATE_REQUEST:
            return { ...state, loading: true }

        case PRODUCT_CREATE_SUCCESS:
            return { ...state, loading: false, success: true, product: action.payload }

        case PRODUCT_CREATE_FAIL:
            return { ...state, loading: false, error: action.payload }

        case PRODUCT_CREATE_RESET:
            return {}

        // product update
        case PRODUCT_UPDATE_REQUEST:
            return { ...state, loading: true }

        case PRODUCT_UPDATE_SUCCESS:
            return { ...state, loading: false, success: true, product: action.payload }

        case PRODUCT_UPDATE_FAIL:
            return { ...state, loading: false, error: action.payload }

        case PRODUCT_UPDATE_RESET:
            return { ...state, product: {} }

        // product review
        case PRODUCT_CREATE_REVIEW_REQUEST:
            return { ...state, loading: true }

        case PRODUCT_CREATE_REVIEW_SUCCESS:
            return { ...state, loading: false, success: true, }

        case PRODUCT_CREATE_REVIEW_FAIL:
            return { ...state, loading: false, error: action.payload }

        case PRODUCT_CREATE_REVIEW_RESET:
            return {}

        // top selling product
        case PRODUCT_TOP_REQUEST:
            return { ...state, loading: true, products: [] }

        case PRODUCT_TOP_SUCCESS:
            return { ...state, loading: false, products: action.payload, }

        case PRODUCT_TOP_FAIL:
            return { ...state, loading: false, error: action.payload }

        default:
            return state
    }
}


export default productListReducer;