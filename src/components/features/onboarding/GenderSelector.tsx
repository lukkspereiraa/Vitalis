import React from 'react';

// --- Tipos ---
type GenderSelectorProps = {
  selectedValue: string | null;
  onSelect: (value: 'male' | 'female') => void;
};


const GenderSelector: React.FC<GenderSelectorProps> = ({ selectedValue, onSelect }) => {
  const baseClasses = 'w-full py-3 px-4 rounded-lg border text-center font-semibold transition-colors duration-200';
  
  const maleClasses = selectedValue === 'male' 
    ? 'bg-emerald-500 text-white border-emerald-500' 
    : 'bg-white text-gray-700 border-gray-300 hover:border-emerald-400';
    
  const femaleClasses = selectedValue === 'female' 
    ? 'bg-emerald-500 text-white border-emerald-500' 
    : 'bg-white text-gray-700 border-gray-300 hover:border-emerald-400';

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 text-left mb-2">
        Sexo
      </label>
      <div className="grid grid-cols-2 gap-4">
        <button onClick={() => onSelect('male')} className={`${baseClasses} ${maleClasses}`}>
          Masculino
        </button>
        <button onClick={() => onSelect('female')} className={`${baseClasses} ${femaleClasses}`}>
          Feminino
        </button>
      </div>
    </div>
  );
};

export default GenderSelector;
