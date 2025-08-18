import React from 'react';

// --- Ícone ---
const ChevronRightIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="m9 18 6-6-6-6"/>
    </svg>
);

// --- Tipos ---
type ClientListItemProps = {
  name: string;
  goal: string;
  onClick: () => void;
};

// --- Componente ---
const ClientListItem: React.FC<ClientListItemProps> = ({ name, goal, onClick }) => {
  return (
    <button 
      onClick={onClick} 
      className="w-full flex items-center justify-between p-4 bg-white rounded-lg shadow-sm hover:bg-gray-50 transition-colors"
    >
      <div>
        <p className="font-semibold text-gray-800 text-left">{name}</p>
        <p className="text-sm text-gray-500 text-left">Objetivo: {goal}</p>
      </div>
      <ChevronRightIcon className="text-gray-400" />
    </button>
  );
};

export default ClientListItem;
