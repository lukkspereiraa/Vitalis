import React from 'react';

// --- Tipos ---
type GoalCardProps = {
  icon: string;
  title: string;
  isSelected: boolean;
  onClick: () => void;
};

// --- Componente ---
const GoalCard: React.FC<GoalCardProps> = ({ icon, title, isSelected, onClick }) => {
  // Mudamos o estilo do card se ele estiver selecionado
  const selectedClasses = isSelected
    ? 'border-emerald-500 bg-emerald-50 ring-2 ring-emerald-500'
    : 'border-gray-300 bg-white hover:border-emerald-400';

  return (
    <button
      onClick={onClick}
      className={`w-full p-4 border rounded-lg shadow-sm text-center transition-all duration-200 ${selectedClasses}`}
    >
      <div className="text-4xl mb-2">{icon}</div>
      <p className="font-semibold text-gray-800">{title}</p>
    </button>
  );
};

export default GoalCard;