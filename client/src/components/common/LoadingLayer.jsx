import * as React from 'react'
import styled, { keyframes } from 'styled-components'

const Container = styled.div`
background-color: rgba(255,255,255,0.4);
position: fixed;
height: 100%;
width: 100%;
margin: 0 auto;
z-index: 9999;
top: 0;
left: 0;
right: 0;
bottom: 0;
`;

const spinnerFrame = keyframes`
to {
    transform: rotate(360deg);
}
`;

const Spinner = styled.div`
content: '';
box-sizing: border-box;
width: 20px;
height: 20px;
margin-top: -10px;
margin-left: -10px;
border-radius: 50%;
border: 2px solid #ccc;
border-top-color: #000;
animation: ${spinnerFrame} .6s linear infinite;
`;

const LoadingLayer = () => (
    <Container className="center-flex">
        <Spinner />
    </Container>
)

export default LoadingLayer