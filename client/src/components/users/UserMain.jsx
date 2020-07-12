import * as React from 'react'
import { Switch, Route } from 'react-router-dom'
import Users from '.'
import ViewUser from './ViewUser'

class UserMain extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path='/users' component={Users} />
        <Route exact path='/users/view/:id' component={ViewUser} />
      </Switch>
    )
  }
}

export default UserMain