import { FC } from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from 'store';

interface Props extends RouteProps {
    component: any
    restricted: boolean
}

const PublicRoute: FC<Props> = ({ component: Component, restricted, ...rest }) => {
    const { isAuth } = useSelector((state: RootState) => state.auth);

    return (
        <Route {...rest} render={props => (
            isAuth && restricted ?
                <Redirect to="/" />
                : <Component {...props} />
        )} />
    );
}


export default PublicRoute;