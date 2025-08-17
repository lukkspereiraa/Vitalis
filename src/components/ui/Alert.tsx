import React from 'react';

// --- Tipos ---
type AlertProps = {
  message: string;
};

// --- Componente ---
const Alert: React.FC<AlertProps> = ({ message }) => {
  if (!message) return null; 

  return (
    <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-100" role="alert">
      <span className="font-medium">Atenção!</span> {message}
    </div>
  );
};

export default Alert;
