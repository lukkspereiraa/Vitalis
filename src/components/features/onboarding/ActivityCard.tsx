import React from 'react';

// --- Tipos ---
type ActivityCardProps = {
  title: string;
  description: string;
  isSelected: boolean;
  onClick: () => void;
};

// --- Componente ---
const ActivityCard: React.FC<ActivityCardProps> = ({ title, description, isSelected, onClick }) => {
  const selectedClasses = isSelected
    ? 'border-emerald-500 bg-emerald-50 ring-2 ring-emerald-500'
    : 'border-gray-300 bg-white hover:border-emerald-400';

  return (
    <button
      onClick={onClick}
      className={`w-full p-4 border rounded-lg shadow-sm text-left transition-all duration-200 ${selectedClasses}`}
    >
      <p className="font-semibold text-gray-800">{title}</p>
      <p className="text-sm text-gray-600">{description}</p>
    </button>
  );
};

export default ActivityCard;
