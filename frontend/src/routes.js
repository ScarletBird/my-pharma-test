import React from 'react';
import { BrowserRouter, Navigate, Route, Routes, Outlet } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Logout from './pages/Logout';
import ProductCategory from './pages/ProductCategory';


export default function Router() {

    const ProtectedRoute = ({redirectPath='/'}) => {
        const user = localStorage.getItem('user')
        if(!user) {
            return <Navigate to={redirectPath} replace />
        }

        return <Outlet />
    }

    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" exact element={(<Home />)} />
                <Route path="/login" exact element={(<Login />)} />
                <Route path="/logout" exact element={(<Logout />)} />
                <Route path="/register" element={(<Register />)} />
                <Route element = {<ProtectedRoute /> }>
                    <Route path="/product" element={<h1>Hello World</h1>} />
                    <Route path="/brand" element={<h1>Hello World</h1>} />
                    <Route path="/product-category" element={(<ProductCategory />)} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}