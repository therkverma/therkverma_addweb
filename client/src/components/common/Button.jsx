import React from 'react'
import styled from 'styled-components'

const CustomButton = styled.button`
width: ${props => props.width}px;
height: ${props => props.height}px;
text-align: center;
font-size: 18px;
line-height: 23px;
cursor: pointer;
text-transform: uppercase;
`;

const Button = ({
    label = 'Button',
    type = 'button',
    className = '',
    height = 46,
    width = 252,
    handleOnClick
}) => (
        <CustomButton
            width={width}
            height={height}
            className={className}
            type={type}
            onClick={handleOnClick}
        >
            {label}
        </CustomButton>
    )

export default Button