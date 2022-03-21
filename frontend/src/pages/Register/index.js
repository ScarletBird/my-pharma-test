import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';

import api from '../../services/api';
import './styles.css';

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    async function handleRegister(e) {
        e.preventDefault();

        const data = {
            name,
            email,
            password
        };

        try{
            const response = await api.post('/register', data);

            alert(`Usuário ${response.data} criado com sucesso!`);

            navigate('/');
        } catch {
            alert('Erro no cadastro! Tente novamente.')
        }
    }

    return (
        <div className="register-container">

            <div className="content">
                <section>

                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro:</p>

                </section>

                <form onSubmit={handleRegister}>
                    <input 
                        placeholder="Nome do usuário"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />

                    <input 
                        type="email"
                        placeholder="E-mail"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />

                    <input 
                        placeholder="Senha"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type="password"
                    />

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>

        </div>
    );
}