import React from 'react';
import type { DayOfWeek } from '../../types';

// --- Tipos ---
type DaySelectorProps = {
  days: DayOfWeek[];
  selectedDay: DayOfWeek;
  onSelectDay: (day: DayOfWeek) => void;
};

// --- Componente ---
const DaySelector: React.FC<DaySelectorProps> = ({ days, selectedDay, onSelectDay }) => {
  return (
    <div className="flex space-x-2 overflow-x-auto pb-2">
      {days.map(day => {
        const isSelected = day === selectedDay;
        const classes = isSelected
          ? 'bg-emerald-600 text-white'
          : 'bg-white text-gray-700 hover:bg-gray-100';
        
        return (
          <button
            key={day}
            onClick={() => onSelectDay(day)}
            className={`px-4 py-2 rounded-full font-semibold text-sm shadow-sm transition-colors duration-200 flex-shrink-0 ${classes}`}
          >
            {day}
          </button>
        );
      })}
    </div>
  );
};

export default DaySelector;
