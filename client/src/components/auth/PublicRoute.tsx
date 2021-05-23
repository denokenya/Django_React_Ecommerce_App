import { FC } from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { isAuth } from 'utils';

interface Props extends RouteProps {
    component: any
    restricted: boolean
}

const PublicRoute: FC<Props> = ({ component: Component, restricted, ...rest }) => (
    <Route {...rest} render={props => (
        isAuth && restricted ?
            <Redirect to="/" />
            : <Component {...props} />
    )} />
);


export default PublicRoute;