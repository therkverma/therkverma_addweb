import React, { Fragment, Component } from 'react'
import { connect } from 'react-redux'

class ViewUser extends Component {
  render() {
    return (
      <Fragment>
        <div className="container">
          <div className="row">
            <div className="" id="content" data-hook="">
              View User
            </div>
          </div>
        </div>
      </Fragment>
    )
  }
}

export default connect(null, null)(ViewUser)