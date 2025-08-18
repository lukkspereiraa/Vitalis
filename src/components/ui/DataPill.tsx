import React from 'react';

// --- Tipos ---
type DataPillProps = {
  label: string;
  value: string | number;
};

// --- Componente ---
const DataPill: React.FC<DataPillProps> = ({ label, value }) => {
  return (
    <div className="bg-gray-100 p-3 rounded-lg">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-semibold text-gray-800">{value}</p>
    </div>
  );
};

export default DataPill;
