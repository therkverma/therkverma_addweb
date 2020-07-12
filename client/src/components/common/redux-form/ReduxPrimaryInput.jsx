import React from 'react'
import styled from 'styled-components'
import PrimaryInput from '../PrimaryInput'
import { devices } from '../../../constant/devices'

const ReduxHolder = styled.div`
margin-bottom: 24px;
${props => props.oneline ? `
width: 50%;
&.error_border {
    span {
        @media ${devices.mobile} {
            font-size: 16px;
        }
    }
}
@media ${devices.mobile} {
    margin: 12px 0;
    width: auto;
  }
` : ``}
`;

const ReduxPrimaryInput = ({
    input, id, type, disabled, label, handleOnFocus, handleOnBlur, className,
    meta: { touched, error, active, visited }, errResp, oneline = false }) => (
        <ReduxHolder oneline={oneline}>
            <PrimaryInput
                type={type}
                id={id}
                disabled={disabled}
                className={className}
                active={active}
                errClass={(((!active && (visited || touched)) && error) || !!errResp) ? 'error_border' : ''}
                label={(((!active && (visited || touched)) && error) || !!errResp) ? (error || errResp) : label}
                handleOnChange={param => {
                    const val = param.target.value
                    input.onChange(val)
                }}
                handleOnFocus={e => {
                    input.onFocus(e)
                    !!handleOnFocus && handleOnFocus(e)
                }}
                handleOnBlur={e => {
                    input.onBlur(e)
                    input.onChange((e.target.value).trim())
                    !!handleOnBlur && handleOnBlur(e)
                }}
                {...input}
            />
        </ReduxHolder>
    )

export default ReduxPrimaryInput