import React from 'react'
import styled from 'styled-components'
import { devices } from '../../constant/devices'

const { mobile } = devices

const Label = styled.label`
  display: flex;
  position: relative;
  border: 1px solid gray;
  border-radius: 3px;
  outline: 0px;
  height: 75px;
  padding-left: 24px;
  &.error {
    display: flex;
    align-items: center;
    height: 67px;
    border: 1px solid red;
    background: red;
    color: white;
  }
  @media ${mobile} {
    height: 60px;
    padding-left: 16px;
    padding-right: 16px;
  }

  span.floating_label {
    position: absolute;
    top: 0;
    z-index: 1;
    color: #989898;
    transform-origin: 0px 0px 0px;
    transform: translateY(-1.5rem) scale(0.9);
    padding: 2.25rem 0px 0px 0px;
    transition: transform 0.3s ease-out 0s;
  }
  span.label {
    position: absolute;
    z-index: 1;
    color: #989898;
    transform-origin: 0px 0px 0px;
    padding: 1.25rem 0px;
    transition: transform 0.3s ease-out 0s;
  }
`;

const Input = styled.input`
  color: gray;
  display: flex;
  align-self: center;
  width: 100%;
  box-shadow: white 0px 0px 0px 1.25rem inset;
  padding-top: 1rem;
  padding-right: 10px;
  outline: 0px;
  border: none;
`;

const PrimaryInput = ({
  id,
  name,
  value,
  active,
  disabled,
  errClass,
  className = '',
  label = 'Label',
  type = 'text',
  handleOnChange,
  handleOnFocus,
  handleOnBlur
}) => (
    <Label
      id={id}
      className={errClass}>
      <span className={`${(!!active || !!value) ? 'floating_label' : 'label'}`}>{label}</span>
      <Input
        name={name}
        className={`body1_regular ${className}`}
        onChange={handleOnChange}
        type={type}
        value={value}
        disabled={disabled}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
      />
    </Label>
  )

export default PrimaryInput