import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension'
import reducers from 'reducers';

// local storage
const cartItemsFromStorage = localStorage.getItem('cartItems') ?
    JSON.parse(localStorage.getItem('cartItems') as string) : []

const userInfoFromStorage = localStorage.getItem('userInfo') ?
    JSON.parse(localStorage.getItem('userInfo') as string) : null


const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ?
    JSON.parse(localStorage.getItem('shippingAddress') as string) : {}

const initialState = {
    cart: {
        cartItems: cartItemsFromStorage,
        shippingAddress: shippingAddressFromStorage,
    },
    auth: { userInfo: userInfoFromStorage },
}

const middleware = [thunk]

// @ts-ignore
const store = createStore(reducers, initialState,
    composeWithDevTools(applyMiddleware(...middleware)))
export type RootState = ReturnType<typeof reducers>

export default store