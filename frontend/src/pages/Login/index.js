import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LoginIcon from '@mui/icons-material/Login';

import api from '../../services/api';

import './styles.css';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    async function handleLogin(e) {
        e.preventDefault();

        try {
            const response = await api.post('/login', {email, password});
            
            localStorage.setItem('token', response.data);
            localStorage.setItem('user', email);
            console.log(localStorage)

            navigate('/');
            window.location.reload(false);

        } catch (err) {
            alert('Falha no login, tente novamente.');
        }
    }
    
    return (
        <div className="login-container">
            <section className="form">
                <form onSubmit={handleLogin}>
                    <h1>Faça seu login</h1>

                    <input 
                        placeholder="Seu e-mail"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <input 
                        placeholder="Sua senha"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type="password"
                    />
                    <button className="button" type="submit">Entrar</button>

                    <Link to="/register" className="back-link">
                        <LoginIcon size={16} />
                        Não tenho cadastro
                    </Link>
                </form>
            </section>
        </div>
    );
}