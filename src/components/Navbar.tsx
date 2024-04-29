import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'



const NavBar = styled.div`
    min-height: 8vh;
    background-color: #2f2626;
    display: flex;
    align-items: center;
`

const Nav = styled.nav`
    display: flex;
    gap: 20px;
    align-items: center;
    justify-content: space-around;
    width: 100%;
`

const Links = styled.div`
    display: flex;
    gap: 20px;
`

const StyledLink = styled(Link)`
    color: #c5aa6a  ;
    text-decoration: none;
    font-weight: bold;

    &:hover{
        color: white;
    }
`

const Logo = styled.h1`
    color: white;
    font-family: cursive;
`

const Navbar = () => {
    return (
        <NavBar>
            <Nav>
                <Logo>Pet Gallery</Logo>
                <Links>
                    <StyledLink to="/">Home</StyledLink>
                    <StyledLink to="/about">About</StyledLink>
                </Links>
            </Nav>
        </NavBar>
    )
}

export default Navbar