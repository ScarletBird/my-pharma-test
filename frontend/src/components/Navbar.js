import React, {useEffect, useState} from "react";
import "./Navbar.css";

import HomeIcon from '@mui/icons-material/Home';

var user = localStorage.getItem('user');

function LoginBar() {
    return (
        <div className="navbar-menu navbar-item-user">
            <a href='/login' className="navbar-item">
                Login
            </a>
            <a href='/register' className="navbar-item">
                Register
            </a>
        </div>
    )
}

function UserBar() {
    return (
        <div className="navbar-menu navbar-item-user">
            <p className="navbar-item">{user}</p>
            <a href='/logout' className="navbar-item">
                Logout
            </a>
        </div>
    )
}

function PrivateArea() {
    return (
        <div className="navbar-menu">
            <a href='/product' className="navbar-item">Produtos</a>
            <a href='/brand' className="navbar-item">Marcas</a>
            <a href='/product-category' className="navbar-item">Categorias</a>
        </div>
    )
}


export default function Navbar() {
    const [user, setUser] = useState('');

    useEffect(()=> {

        setUser(localStorage.getItem('user'));

    }, [user]);

    return (
        <nav>
            <div className="navbar-menu">
                <a href='/' className="navbar-item">
                    <HomeIcon />
                </a>
                {
                    user? (
                        <>
                            <PrivateArea />
                            <UserBar />
                        </>
                    )
                    : (<LoginBar />)
                }
                <div className=""></div>
            </div>
        </nav>
    )
}