import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';


export default function Router() {

    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" exact element={(<Home />)} />
                <Route path="/login" exact element={(<Login />)} />
                <Route path="/register" element={(<Register />)} />
            </Routes>
        </BrowserRouter>
    )
}