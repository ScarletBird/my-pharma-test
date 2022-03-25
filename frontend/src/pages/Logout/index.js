import React from 'react';
import { useNavigate } from 'react-router-dom';

import './styles.css';


export default function Logout() {
    const navigate = useNavigate();

    async function handleCancelation(e) {
        e.preventDefault();

        navigate('/')
    }

    async function handleConfirmation(e) {
        e.preventDefault();
        
        localStorage.clear('user');
        localStorage.clear('token');

        navigate('/');
        window.location.reload(false);

    }
    
    return (
        <div className="main-frame">
            <h1 className="main-title">Deseja realmente fazer o logout?</h1>
            <div className='button-space'>
                <button className='logout-button confirmation-button' onClick={handleConfirmation}>Sim</button>
                <button className='logout-button cancelation-button' onClick={handleCancelation} >Não</button>
            </div>
        </div>
    )
}