import React from 'react';

// --- Tipos ---
type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

// --- Componente ---
const Input: React.FC<InputProps> = ({ label, ...props }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 text-left mb-1">
        {label}
      </label>
      <input
        {...props}
        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
      />
    </div>
  );
};

export default Input;
