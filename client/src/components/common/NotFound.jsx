import React from 'react'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'
import Button from '../common/Button'

const Container = styled.div`
  flex-direction: column;
  margin-top: 100px;
`;


const ErrButton = styled(Button)`
color: #FFFFFF;
`;
const NotFound = ({ history, location }) => (
    <Container className="center-flex">
        <span>On no! The page you're looking for couldn't be found</span>
        <ErrButton
            handleOnClick={() => history.push(`/${location.search}`)}
            label='TAKE ME HOME'
        />
    </Container>
)

export default withRouter(NotFound)