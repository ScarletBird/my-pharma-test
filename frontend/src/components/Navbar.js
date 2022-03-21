import React from "react";
import "./Navbar.css";

import HomeIcon from '@mui/icons-material/Home';

export default function Navbar() {
    return (
        <nav>
            <div className="navbar-menu">
                <a href='/' className="navbar-item">
                    <HomeIcon />
                </a>
                <div className="navbar-item-user">
                    <a href='/login' className="navbar-item">
                        Login
                    </a>
                    <a href='/register' className="navbar-item">
                        Register
                    </a>
                </div>
            </div>
        </nav>
    )
}