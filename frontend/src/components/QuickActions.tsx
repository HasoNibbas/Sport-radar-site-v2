// File: src/components/QuickActions.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const QuickActions: React.FC = () => (
  <div className="flex flex-wrap gap-4 mt-8">
    <Link
      to="/activities"
      className="bg-[#dc5f18] text-white px-6 py-3 rounded-lg font-semibold hover:brightness-110 transition"
    >
      Toutes les activités
    </Link>
    <Link
      to="/profile"
      className="bg-[#0a1128] text-white px-6 py-3 rounded-lg font-semibold hover:brightness-110 transition"
    >
      Modifier mes préférences
    </Link>
  </div>
);

export default QuickActions;