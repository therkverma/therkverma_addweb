import React from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import AuthenticateRoute from './common/Routes/AuthenticateRoute'
import { fetchAuthInfo } from '../action/auth'
import NotFound from "./common/NotFound"
import Login from './login'
import Layout from './common/Layout'
import UserMain from './users/UserMain'
import SignUp from './signup'

class App extends React.Component {
  constructor(props) {
    super(props)
    const expireDate = localStorage.getItem("expirydate")
    const token = localStorage.getItem('token')
    if (!!expireDate && !!token &&
      parseInt(expireDate, 10) > Date.now()) {
      props.fetchAuthInfo(props.history)
    }
  }

  render() {
    const { loggedIn } = this.props
    return (
      <Layout loggedIn={loggedIn}>
        <Switch>
          <Route path='/login' component={Login} />
          <Route path='/signup' component={SignUp} />
          <AuthenticateRoute path='/dashboard' component={() => <h1>dashboard</h1>} />
          <AuthenticateRoute path='/users' component={UserMain} />
          <Route component={NotFound} />
        </Switch>
      </Layout>
    )
  }
}

const mapStateToProps = state => ({
  loggedIn: state.auth.loginAuthSuccess
})

const mapDispatchToProps = dispatch => ({
  fetchAuthInfo: history => dispatch(fetchAuthInfo(history))
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App))