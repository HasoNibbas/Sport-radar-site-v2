import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => (
  <div className="min-h-screen flex flex-col items-center justify-center text-center p-8">
    <h1 className="text-5xl font-bold text-red-600 mb-4">404</h1>
    <p className="text-xl text-gray-400 mb-6">Page non trouvée</p>
    <Link to="/" className="text-sky-600 underline hover:text-sky-800">Retour à l'accueil</Link>
  </div>
);

export default NotFoundPage;
