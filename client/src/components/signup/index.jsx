import React, { Component } from 'react'
import { connect } from 'react-redux';
import { reduxForm, Field, reset } from 'redux-form'
import { withRouter, Link } from 'react-router-dom'
import styled from 'styled-components'
import { devices } from "../../constant/devices"
import ReduxPrimaryInput from '../common/redux-form/ReduxPrimaryInput'
import { signUp, removeFieldError } from '../../action/signUp'
import { email, required, passwordsMatch, passwordPattern, number } from '../common/redux-form/validation'
import LoadingLayer from '../common/LoadingLayer'
import ErrorContainer from '../common/ErrorContainer'
import ReduxPrimaryTextArea from '../common/redux-form/ReduxPrimaryTextArea'

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
`;

const GenderOptionList = styled.div`
display: flex;
justify-content: space-around;
`;


const CountryHolder = styled.div`
display: flex;
flex-direction: column;
min-height: 60px;
justify-content: space-around;
`;

class SignUp extends Component {
  componentDidMount = () => {
    window.top.scrollTo(0, 0)
  }

  submitForm = async info => {
    const { signUp, resetForm } = this.props
    const resp = await signUp(info)
    if (!!resp) {
      resetForm()
    }
  }

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
        <Form onSubmit={handleSubmit(this.submitForm)} enctype="multipart/form-data">
          <Field
            name="first_name"
            component={ReduxPrimaryInput}
            validate={[required]}
            errResp={!!errMsg && !!errMsg.first_name ? errMsg.first_name : false}
            id="first_name"
            handleOnFocus={this.handleOnFocus}
            label="First Name"
          />
          <Field
            name="last_name"
            component={ReduxPrimaryInput}
            validate={[required]}
            errResp={!!errMsg && !!errMsg.last_name ? errMsg.last_name : false}
            id="last_name"
            handleOnFocus={this.handleOnFocus}
            label="Last Name"
          />
          <Field
            name="father_name"
            component={ReduxPrimaryInput}
            validate={[required]}
            errResp={!!errMsg && !!errMsg.father_name ? errMsg.father_name : false}
            id="father_name"
            handleOnFocus={this.handleOnFocus}
            label="Father Name"
          />
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
            validate={[required, passwordPattern]}
          />
          <Field
            component={ReduxPrimaryInput}
            errResp={!!errMsg && !!errMsg.confirm_password ? errMsg.confirm_password : false}
            id="confirm_password"
            name="confirm_password"
            type="password"
            label="Confirm Password"
            handleOnFocus={this.handleOnFocus}
            validate={[required, passwordsMatch]}
          />
          <Field
            component={ReduxPrimaryTextArea}
            errResp={!!errMsg && !!errMsg.address ? errMsg.address : false}
            id="address"
            name="address"
            label="Address"
            handleOnFocus={this.handleOnFocus}
            validate={[required]}
          />
          <Field
            component={ReduxPrimaryInput}
            errResp={!!errMsg && !!errMsg.phone ? errMsg.phone : false}
            id="phone"
            name="phone"
            type="tel"
            label="Phone"
            handleOnFocus={this.handleOnFocus}
            validate={[required, number]}
          />

          <div>
            <label>Gender</label>
            <GenderOptionList>
              <label><Field name="gender" component="input" type="radio" value="male" /> Male</label>
              <label><Field name="gender" component="input" type="radio" value="female" /> Female</label>
            </GenderOptionList>
          </div>

          <CountryHolder>
            <label>Country</label>
            <div>
              <Field name="country" component="select" validate={[required]}>
                <option value="IN">India</option>
                <option value="US">United State</option>
              </Field>
            </div>
          </CountryHolder>

          <Field
            component={ReduxPrimaryInput}
            errResp={!!errMsg && !!errMsg.dob ? errMsg.dob : false}
            id="dob"
            name="dob"
            type="date"
            label="DOB"
            handleOnFocus={this.handleOnFocus}
            validate={[required]}
          />

          <div className="mt-15 mb-15">
            <h3>Photos (Optional)</h3>
            <div className="form-group">
              <Field name="photos[]" component="input" type="file" multiple={true} />
            </div>
          </div>
          <SubmitButton type="submit" onClick={this.handleSubmit}>
            SIGN UP
          </SubmitButton>
          <LinkContainer>
            <Anchor to={'/login'}>Sign In</Anchor>
          </LinkContainer>
        </Form>
      </Container>
    )
  }
}

const SignUpReduxForm = reduxForm({
  form: FORM_NAME
})(SignUp)

const mapStateToProps = (state) => ({
  errMsg: state.auth.errMsg,
  isProcessing: state.auth.isProcessing
})

const mapDispatchToProps = dispatch => ({
  signUp: info => dispatch(signUp(info)),
  resetForm: () => dispatch(reset(FORM_NAME)),
  removeFieldError: fieldName => dispatch(removeFieldError(fieldName))
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SignUpReduxForm));
