import { combineReducers } from 'redux';
import user from './user.reducers';
import { authReducer } from './auth.reducers';
import cart from './cart.reducers';
import product from './product.reducers';
import order from './product.reducers';

const rootReducer = combineReducers({
    user,
    auth: authReducer,
    cart,
    product,
    order
});

export default rootReducer;