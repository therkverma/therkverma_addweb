import React from 'react'
import styled from 'styled-components'
import { devices } from '../../constant/devices'

const Container = styled.div`
 position: relative;
`;

const MsgHolder = styled.span`
  display: flex;
  position: relative;
  border: 1px solid #D3D3D3;
  border-radius: 3px;
  outline: 0px;
  font-size: 16px;
  padding-left: 24px;
  margin-bottom: 24px;
  align-items: center;
  height: 67px;
  border: 1px solid #FF9494;
  background: #FF9494;
  color: #FFFFFF;
  @media ${devices.mobile} {
    height: 60px;
    padding-left: 16px;
    padding-right: 16px;
  }
}
`;

const Notch = styled.div`
width: 22.6px;
height: 22.6px;
background: #FF9494;
transform: rotate(45deg);
position: absolute;
bottom: -10px;
left: 40px;
`;

const ErrorContainer = ({ notch = true, errors }) => (
  <Container>
    <MsgHolder>
      {typeof errors === 'string' ? errors :
        !!errors && errors.length > 0 && errors.map((error, index) => <p key={index}>{error}</p>)}
    </MsgHolder>
    {!!notch && <Notch />}
  </Container>
)

export default ErrorContainer