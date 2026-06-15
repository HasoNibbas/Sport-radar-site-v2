import React, { useState } from 'react';
import { inviteEmployee } from '../api/companyService';

const InviteEmployee: React.FC = () => {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('');
    const handleInvite = async () => {
        await inviteEmployee(email);
        setStatus('Invitation envoyée');
    };
    return (
        <div className="p-4 bg-white rounded max-w-md">
            <h3>Inviter un collaborateur</h3>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email employé" />
            <button onClick={handleInvite}>Envoyer invitation</button>
            {status && <p>{status}</p>}
        </div>
    );
};
export default InviteEmployee;