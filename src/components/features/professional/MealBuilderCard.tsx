import React, { useState } from 'react';
import Button from '../../ui/Button.tsx';
import Input from '../../ui/Input.tsx';
import type { Food, Meal } from '../../../types/index.ts';

const TrashIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M10 11v6"/><path d="M14 11v6"/>
    </svg>
);

// --- Tipos ---
type MealBuilderCardProps = {
  meal: Meal;
  onAddFood: (mealId: number, foodData: Omit<Food, 'id'>) => void;
  onRemoveFood: (mealId: number, foodId: number) => void;
};

// --- Componente ---
const MealBuilderCard: React.FC<MealBuilderCardProps> = ({ meal, onAddFood, onRemoveFood }) => {
  const [foodName, setFoodName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [protein, setProtein] = useState('');
  const [carbs, setCarbs] = useState('');
  const [fat, setFat] = useState('');

  const handleAddClick = () => {
    if (foodName.trim() && quantity.trim()) {
      const newFoodData: Omit<Food, 'id'> = {
        name: foodName,
        quantity: `${quantity}g`,
        protein: protein ? parseFloat(protein) : undefined,
        carbs: carbs ? parseFloat(carbs) : undefined,
        fat: fat ? parseFloat(fat) : undefined,
      };
      onAddFood(meal.id, newFoodData);
      setFoodName('');
      setQuantity('');
      setProtein('');
      setCarbs('');
      setFat('');
    }
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm">
      <h3 className="text-lg font-bold text-gray-800 mb-3">{meal.name}</h3>
      
      <div className="space-y-2 mb-4 min-h-[40px]">
        {meal.foods.length === 0 ? (
            <p className="text-sm text-gray-400 italic px-2">Nenhum alimento adicionado.</p>
        ) : (
            meal.foods.map(food => (
              <div key={food.id} className="flex items-center justify-between bg-gray-50 p-2 rounded-md">
                <div>
                  <p className="font-medium text-gray-700">{food.name}</p>
                  <p className="text-sm text-gray-500">
                    {food.quantity}
                    {(food.protein !== undefined || food.carbs !== undefined || food.fat !== undefined) && (
                      <span className="ml-2 text-xs text-gray-400">
                        (P: {food.protein || 0}g, C: {food.carbs || 0}g, G: {food.fat || 0}g)
                      </span>
                    )}
                  </p>
                </div>
                <button onClick={() => onRemoveFood(meal.id, food.id)} className="text-red-500 hover:text-red-700">
                    <TrashIcon />
                </button>
              </div>
            ))
        )}
      </div>

      <div className="border-t pt-4 mt-4 space-y-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <Input label="Alimento" placeholder="Ex: Batata doce" value={foodName} onChange={(e) => setFoodName(e.target.value)} />
            <Input label="Qtd (g)" placeholder="100" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
        </div>
        <p className="text-xs text-gray-500 text-left pt-2">Nutrientes (opcional):</p>
        <div className="grid grid-cols-3 gap-2">
            <Input label="Proteína (g)" type="number" placeholder="-" value={protein} onChange={(e) => setProtein(e.target.value)} />
            <Input label="Carboidrato (g)" type="number" placeholder="-" value={carbs} onChange={(e) => setCarbs(e.target.value)} />
            <Input label="Gordura (g)" type="number" placeholder="-" value={fat} onChange={(e) => setFat(e.target.value)} />
        </div>
        <Button onClick={handleAddClick} className="w-full mt-2 !py-2">
          Adicionar Alimento
        </Button>
      </div>
    </div>
  );
};

export default MealBuilderCard;
