import React from 'react';
import type { Meal } from '../../../types';

// --- Tipos ---
type MealDisplayCardProps = {
  meal: Meal;
};

// --- Componente ---
const MealDisplayCard: React.FC<MealDisplayCardProps> = ({ meal }) => {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm">
      <h3 className="text-lg font-bold text-gray-800 mb-3">{meal.name}</h3>
      
      <ul className="space-y-2">
        {meal.foods.length === 0 ? (
          <p className="text-sm text-gray-400 italic">Nenhum alimento nesta refeição.</p>
        ) : (
          meal.foods.map(food => (
            <li key={food.id} className="flex justify-between items-center border-b border-gray-100 py-2">
              <span className="text-gray-700">{food.name}</span>
              <span className="font-medium text-gray-600">{food.quantity}</span>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default MealDisplayCard;