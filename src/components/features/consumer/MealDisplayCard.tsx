import React from 'react';
import type { Meal, Food } from '../../../types/index.ts';

// --- Tipos ---
type MealDisplayCardProps = {
  meal: Meal;
  checkedFoods: Record<number, boolean>; 
  onToggleFood: (food: Food) => void; 
};

// --- Componente ---
const MealDisplayCard: React.FC<MealDisplayCardProps> = ({ meal, checkedFoods, onToggleFood }) => {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm">
      <h3 className="text-lg font-bold text-gray-800 mb-3">{meal.name}</h3>
      
      <ul className="space-y-3">
        {meal.foods.length === 0 ? (
          <p className="text-sm text-gray-400 italic">Nenhum alimento nesta refeição.</p>
        ) : (
          meal.foods.map(food => (
            <li key={food.id} className="border-b border-gray-100 pb-2 last:border-b-0">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-3">
                    <input 
                        type="checkbox"
                        checked={!!checkedFoods[food.id]}
                        onChange={() => onToggleFood(food)}
                        className="h-5 w-5 rounded text-emerald-600 focus:ring-emerald-500 border-gray-300"
                    />
                    <span className={`text-gray-700 ${checkedFoods[food.id] ? 'line-through text-gray-400' : ''}`}>
                        {food.name}
                    </span>
                </div>
                <span className={`font-medium ${checkedFoods[food.id] ? 'line-through text-gray-400' : 'text-gray-600'}`}>
                    {food.quantity}
                </span>
              </div>
              {(food.protein !== undefined || food.carbs !== undefined || food.fat !== undefined) && (
                <div className="text-xs text-gray-500 mt-1 pl-8">
                  <span className="font-semibold text-emerald-600">P:</span> {food.protein || 0}g,&nbsp;
                  <span className="font-semibold text-amber-500">C:</span> {food.carbs || 0}g,&nbsp;
                  <span className="font-semibold text-red-500">G:</span> {food.fat || 0}g
                </div>
              )}
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default MealDisplayCard;
