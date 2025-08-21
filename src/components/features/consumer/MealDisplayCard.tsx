import React from 'react';
import type { Meal, Food } from '../../../types/index.ts';

// --- Ícones ---
const EditIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
);

// --- Tipos ---
type MealDisplayCardProps = {
  meal: Meal;
  checkedFoods?: Record<number, boolean>;
  onToggleFood?: (food: Food) => void;
  onEditFood?: (food: Food, mealName: string) => void; // Prop opcional para edição
};

// --- Componente ---
const MealDisplayCard: React.FC<MealDisplayCardProps> = ({ meal, checkedFoods, onToggleFood, onEditFood }) => {
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
                    {onToggleFood && checkedFoods && (
                        <input 
                            type="checkbox"
                            checked={!!checkedFoods[food.id]}
                            onChange={() => onToggleFood(food)}
                            className="h-5 w-5 rounded text-emerald-600 focus:ring-emerald-500 border-gray-300"
                        />
                    )}
                    <div>
                        <span className={`text-gray-700 ${checkedFoods && checkedFoods[food.id] ? 'line-through text-gray-400' : ''}`}>
                            {food.name}
                        </span>
                        {(food.protein !== undefined || food.carbs !== undefined || food.fat !== undefined) && (
                            <div className="text-xs text-gray-500 mt-1">
                            <span className="font-semibold text-emerald-600">P:</span> {food.protein || 0}g,&nbsp;
                            <span className="font-semibold text-amber-500">C:</span> {food.carbs || 0}g,&nbsp;
                            <span className="font-semibold text-red-500">G:</span> {food.fat || 0}g
                            </div>
                        )}
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <div className="text-right">
                        <span className={`font-medium ${checkedFoods && checkedFoods[food.id] ? 'line-through text-gray-400' : 'text-gray-600'}`}>
                            {food.quantity}
                        </span>
                        {food.calories && (
                            <p className={`text-sm font-bold ${checkedFoods && checkedFoods[food.id] ? 'line-through text-gray-400' : 'text-emerald-600'}`}>
                                {food.calories} kcal
                            </p>
                        )}
                    </div>

                    {onEditFood && (
                        <button onClick={() => onEditFood(food, meal.name)} className="text-gray-400 hover:text-emerald-600">
                            <EditIcon />
                        </button>
                    )}
                </div>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default MealDisplayCard;
