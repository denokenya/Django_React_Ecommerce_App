import React, { FC } from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { isAuth } from 'utils';

interface Props extends RouteProps {
    component: any;
}

const PrivateRoute: FC<Props> = ({ component: Component, ...rest }) =>
(
    <Route {...rest} render={props => (
        isAuth ?
            <Component {...props} />
        : <Redirect to="/auth/login" />
    )} />
)


export default PrivateRoute;