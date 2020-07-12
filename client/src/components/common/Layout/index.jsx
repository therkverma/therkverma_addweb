import React from 'react'
import styled from 'styled-components'
import Header from '../Header'

const Main = styled.div`
width: 80%;
margin: 0 auto;
text-align: center;
`;

const Layout = ({ loggedIn, children }) => (
    <Main>
        {!!loggedIn && <Header />}
        {children}
    </Main>
)

export default Layout