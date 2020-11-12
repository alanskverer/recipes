import React from 'react';
import { Link } from 'react-router-dom'
import logo from './Pictures/logo.png'

function Nav() {
    const navStyle = {
        color: 'white',
    }
    const logoStyle = {
        height: "70px"
    }
    return (
        <nav >
            <img style={logoStyle} src={logo} alt="My logo" />
            <ul className="nav-links">
                <Link style={navStyle} to='/'>
                    <li>Home</li>
                </Link>
                <Link style={navStyle} to='/onlinerecipes'>
                    <li>Online Recipes</li>
                </Link>
                <Link style={navStyle} to='/myrecipes'>
                    <li>My Recipes</li>
                </Link>
            </ul>
        </nav>
    )
}
export default Nav;