import React from 'react';
import type { ReactNode } from 'react';

interface CardProps {
  title: string;
  icon: ReactNode;
  children: ReactNode;
}

const Card: React.FC<CardProps> = ({ title, icon, children }) => (
  <div className="bg-white p-4 rounded-lg shadow flex items-center">
    <div className="p-2 bg-[#dc5f18] text-white rounded-full mr-4">
      {icon}
    </div>
    <div>
      <p className="text-sm text-gray-600">{title}</p>
      <div>{children}</div>
    </div>
  </div>
);

export default Card;
