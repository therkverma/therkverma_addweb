import React, { Fragment, Component } from 'react'
import { connect } from 'react-redux'

class Users extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Fragment>
       <h2>Users List</h2>
      </Fragment>
    )
  }
}

export default connect(null, null)(Users)