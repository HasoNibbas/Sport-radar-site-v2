// src/pages/AcceptInvitationPage.tsx
import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { acceptInvite } from '../api/companyService';

const AcceptInvitationPage: React.FC = () => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token') || '';
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await acceptInvite({ token, username, password });
        navigate('/login');
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white rounded">
            <h2>Rejoindre l’entreprise</h2>
            <input placeholder="Nom d’utilisateur" value={username}
                onChange={e => setUsername(e.target.value)} required />
            <input placeholder="Mot de passe" type="password" value={password}
                onChange={e => setPassword(e.target.value)} required />
            <button type="submit">Valider</button>
        </form>
    );
};

export default AcceptInvitationPage;
