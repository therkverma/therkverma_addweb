import * as React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { authentication } from '../../../action/auth'

const AuthenticateRoute = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={(props) => authentication() === true
                ? <Component {...props} />
                : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
            }
        />
    )
}

export default AuthenticateRoute