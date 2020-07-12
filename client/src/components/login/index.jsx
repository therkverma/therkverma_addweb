import React, { Component } from 'react'
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form'
import { withRouter, Link } from 'react-router-dom'
import styled from 'styled-components'
import { devices } from "../../constant/devices"
import ReduxPrimaryInput from '../common/redux-form/ReduxPrimaryInput'
import { login, removeFieldError } from '../../action/auth'
import { email, required } from '../common/redux-form/validation'
import { authentication } from '../../action/auth'
import LoadingLayer from '../common/LoadingLayer'
import ErrorContainer from '../common/ErrorContainer'

const { tablet, mobile } = devices

const FORM_NAME = 'login_form'

const Container = styled.div`
width: 60%;
background: #FFFFFF;
margin: 50px auto;
@media ${tablet} {
  width: 80%;
}
`;

const Form = styled.form`
display: flex;
flex-direction: column;
justify-content: space-between;
@media ${tablet} {
  display: unset;
  flex-direction: column;
}
@media ${mobile} {
  display: unset;
}
`;

const LinkContainer = styled.div`
  display: flex;
  justify-content: space-around;
  @media ${mobile} {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const Anchor = styled(Link)`
cursor: pointer;
color: #808080;
@media ${mobile} {
  &:first-child {
    margin-bottom: 12px;
  }
}
`;

const SubmitButton = styled.button`
text-align: center;
align-self: center;
background: #ff5e2b;
border-radius: 5px;
font-size: 20px;
color: #FFFFFF;
margin-top: 40px;
margin: auto;
justify-content: center;

width: 100%;
height: 60px;
margin-bottom: 24px;
align-items: center;
border: none;
cursor: pointer;
outline: none;
&:hover {
  color: #FF9494;
  border: 1px solid #FF9494;
  background: #FFFFFF;
}
`;

class Login extends Component {
  constructor(props) {
    super(props)
    const token = authentication()
    if (!!token) props.history.push('/')
  }

  componentDidMount = () => {
    window.top.scrollTo(0, 0)
  }

  componentDidUpdate = (prevProp) => {
    const { loginAuthSuccess, history } = this.props
    if (loginAuthSuccess !== prevProp.loginAuthSuccess) {
      if (loginAuthSuccess === true) history.push('/dashboard')
    }
  }

  submitForm = info => this.props.login(info)

  handleOnFocus = e => {
    const { errMsg, removeFieldError } = this.props
    const fieldName = e.target.name
    if (!!errMsg && !!errMsg.otherError) removeFieldError('otherError')

    if (!!errMsg && errMsg[fieldName]) removeFieldError(fieldName)
  }

  render() {
    const { handleSubmit, errMsg, isProcessing } = this.props
    return (
      <Container>
        {!!isProcessing && <LoadingLayer />}
        {!!errMsg && !!errMsg.otherError && <ErrorContainer errors={errMsg.otherError} />}
        <Form onSubmit={handleSubmit(this.submitForm)}>
          <Field
            name="email"
            component={ReduxPrimaryInput}
            validate={[required, email]}
            errResp={!!errMsg && !!errMsg.email ? errMsg.email : false}
            id="email"
            handleOnFocus={this.handleOnFocus}
            label="Email"
          />
          <Field
            component={ReduxPrimaryInput}
            errResp={!!errMsg && !!errMsg.password ? errMsg.password : false}
            id="password"
            name="password"
            type="password"
            label="Password"
            handleOnFocus={this.handleOnFocus}
            validate={[required]}
          />
          <SubmitButton type="submit" onClick={this.handleSubmit}>
            SIGN IN
          </SubmitButton>
          <LinkContainer>
            <Anchor to={'/signup'}>New User Checkout</Anchor>
          </LinkContainer>
        </Form>
      </Container>
    )
  }
}

const LoginReduxForm = reduxForm({
  form: FORM_NAME
})(Login)

const mapStateToProps = (state) => ({
  errMsg: state.auth.errMsg,
  isProcessing: state.auth.isProcessing,
  loginAuthSuccess: state.auth.loginAuthSuccess,
})

const mapDispatchToProps = dispatch => ({
  login: info => dispatch(login(info)),
  removeFieldError: fieldName => dispatch(removeFieldError(fieldName))
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(LoginReduxForm));
