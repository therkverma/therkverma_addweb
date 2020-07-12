import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { withRouter, Link } from 'react-router-dom'
import { logoutUser } from '../../../action/auth'

const Container = styled.div`
display: flex;
background: antiquewhite;
justify-content: space-evenly;
`;

const MenuLi = styled.li`
display: table-cell;
`;

const menus = [
    { to: '/users', title: 'Users', icon: 'fa fa-user icon_link' }
]

const Header = ({ user, logout, history, location }) => (
    <div>
        <Container>
            <div>Logged in as: {user.email || ''}</div>
            <div><button onClick={() => logout(history)}>Logout</button></div>
        </Container>
        <ul>
            {menus.map((menu, i) => <Menu key={i} menu={menu} location={location} />)}
        </ul>
    </div>
)


const Menu = ({ menu: { to, title, icon }, location }) => (
    <MenuLi className={location.pathname === to ? 'selected' : ''}>
        <Link className={icon} to={to}><span className="text">{title}</span></Link>
    </MenuLi>
)

const mapStateToProps = state => ({
    user: state.auth.user
})

const mapDispatchToProps = dispatch => ({
    logout: history => dispatch(logoutUser(history))
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header))