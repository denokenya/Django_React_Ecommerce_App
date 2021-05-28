import React, { Suspense } from 'react';
import { Container } from 'react-bootstrap';
// routes
import PrivateRoute from 'components/auth/PrivateRoute';
import PublicRoute from 'components/auth/PublicRoute';
// screens
const HomeScreen = React.lazy(() => import('screens/HomeScreen'));
const LoginScreen = React.lazy(() => import('screens/auth/LoginScreen'));
const RegisterScreen = React.lazy(() => import('screens/auth/RegisterScreen'));

const ProfileScreen = React.lazy(() => import('screens/ProfileScreen'));
const UserEditScreen = React.lazy(() => import('screens/admin/UserEditScreen'));
const UserListScreen = React.lazy(() => import('screens/admin/UserListScreen'));

const ProductScreen = React.lazy(() => import('screens/product/ProductScreen'));
const ProductListScreen = React.lazy(() => import('screens/product/ProductListScreen'));
const ProductEditScreen = React.lazy(() => import('screens/product/ProductEditScreen'));
const ProfileEditScreen = React.lazy(() => import('screens/ProfileEditScreen'));

const OrderScreen = React.lazy(() => import('screens/OrderScreen'));
const OrderListScreen = React.lazy(() => import('screens/admin/OrderListScreen'));

const ShippingScreen = React.lazy(() => import('screens/ShippingScreen'));
const PaymentScreen = React.lazy(() => import('screens/PaymentScreen'));
const PlaceOrderScreen = React.lazy(() => import('screens/PlaceOrderScreen'));
const CartScreen = React.lazy(() => import('screens/CartScreen'));


const AppRoutes = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Container>
                <PublicRoute restricted={false} path='/' component={HomeScreen} exact />
                <PublicRoute restricted={true} path="/auth/login" component={LoginScreen} />
                <PublicRoute restricted={true} path="/auth/register" component={RegisterScreen} />
                <PublicRoute restricted={false} path='/cart/:id?' component={CartScreen} />

                <PrivateRoute path='/profile' component={ProfileScreen} />
                <PrivateRoute path='/admin/:id/update' component={UserEditScreen} />
                <PrivateRoute path='/admin/userlist' component={UserListScreen} />
                <PrivateRoute path='/admin/user/:id/update' component={ProfileEditScreen} />

                <PrivateRoute path='/product/:id' component={ProductScreen} />
                <PrivateRoute path='/admin/productlist' component={ProductListScreen} />
                <PrivateRoute path="/admin/product/:id/edit" component={ProductEditScreen} />

                <PrivateRoute path='/admin/orderlist' component={OrderListScreen} />
                <PrivateRoute path='/order/:id' component={OrderScreen} />

                <PrivateRoute path='/placeorder' component={PlaceOrderScreen} />
                <PrivateRoute path='/payment' component={PaymentScreen} />
                <PrivateRoute path='/shipping' component={ShippingScreen} />
            </Container>
        </Suspense>
    )
}

export default AppRoutes
