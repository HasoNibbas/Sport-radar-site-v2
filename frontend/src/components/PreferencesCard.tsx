// File: src/components/PreferencesCard.tsx
import React from 'react';
import { MapPin, Zap, Target } from 'lucide-react';

interface PreferencesCardProps {
  preferences?: {
    location?: string;
    level?: string;
    objectives?: string[];
  };
}

const PreferencesCard: React.FC<PreferencesCardProps> = ({ preferences = {} }) => (
  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
    <div className="flex items-center bg-gray-100 p-4 rounded-lg">
      <MapPin className="w-6 h-6 text-[#dc5f18] mr-3" />
      <div>
        <p className="text-sm text-gray-600">Localisation</p>
        <p className="font-semibold text-gray-800">
          {preferences.location || 'Non spécifiée'}
        </p>
      </div>
    </div>

    <div className="flex items-center bg-gray-100 p-4 rounded-lg">
      <Zap className="w-6 h-6 text-[#dc5f18] mr-3" />
      <div>
        <p className="text-sm text-gray-600">Niveau</p>
        <p className="font-semibold text-gray-800">
          {preferences.level || 'Non spécifié'}
        </p>
      </div>
    </div>

    <div className="flex items-center bg-gray-100 p-4 rounded-lg">
      <Target className="w-6 h-6 text-[#dc5f18] mr-3" />
      <div>
        <p className="text-sm text-gray-600">Objectifs</p>
        <p className="font-semibold text-gray-800">
          {preferences.objectives?.length
            ? preferences.objectives.join(', ')
            : 'Non définis'}
        </p>
      </div>
    </div>
  </div>
);

export default PreferencesCard;
