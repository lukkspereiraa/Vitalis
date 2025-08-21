import React, { useState } from 'react';
import Button from '../../ui/Button.tsx';
import Input from '../../ui/Input.tsx';
import type { Food, Meal } from '../../../types/index.ts';

// --- Ícones ---
const TrashIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M10 11v6"/><path d="M14 11v6"/>
    </svg>
);
const EditIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
);
const CameraIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/>
    </svg>
);

// --- Tipos ---
type MealBuilderCardProps = {
  meal: Meal;
  onAddFood: (mealId: number, foodData: Omit<Food, 'id'>) => void;
  onRemoveFood: (mealId: number, foodId: number) => void;
  onUpdateFood: (mealId: number, updatedFood: Food) => void;
};

// --- Componente ---
const MealBuilderCard: React.FC<MealBuilderCardProps> = ({ meal, onAddFood, onRemoveFood, onUpdateFood }) => {
  const [foodName, setFoodName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [protein, setProtein] = useState('');
  const [carbs, setCarbs] = useState('');
  const [fat, setFat] = useState('');
  const [calories, setCalories] = useState('');
  const [editingFood, setEditingFood] = useState<Food | null>(null);

  const resetForm = () => {
    setFoodName('');
    setQuantity('');
    setProtein('');
    setCarbs('');
    setFat('');
    setCalories('');
    setEditingFood(null);
  };

  const handleEditClick = (food: Food) => {
    setEditingFood(food);
    setFoodName(food.name);
    setQuantity(food.quantity.replace('g', ''));
    setProtein(food.protein?.toString() || '');
    setCarbs(food.carbs?.toString() || '');
    setFat(food.fat?.toString() || '');
    setCalories(food.calories?.toString() || '');
  };

  const handleSaveClick = () => {
    if (!foodName.trim() || !quantity.trim()) return;

    const p = parseFloat(protein) || 0;
    const c = parseFloat(carbs) || 0;
    const f = parseFloat(fat) || 0;
    const userCalories = parseFloat(calories) || 0;
    const finalCalories = userCalories > 0 ? userCalories : (p * 4) + (c * 4) + (f * 9);

    if (editingFood) {
      // Modo de Edição
      const updatedFood: Food = {
        ...editingFood,
        name: foodName,
        quantity: `${quantity}g`,
        protein: p > 0 ? p : undefined,
        carbs: c > 0 ? c : undefined,
        fat: f > 0 ? f : undefined,
        calories: finalCalories > 0 ? Math.round(finalCalories) : undefined,
      };
      onUpdateFood(meal.id, updatedFood);
    } else {
      // Modo de Adição
      const newFoodData: Omit<Food, 'id'> = {
        name: foodName,
        quantity: `${quantity}g`,
        protein: p > 0 ? p : undefined,
        carbs: c > 0 ? c : undefined,
        fat: f > 0 ? f : undefined,
        calories: finalCalories > 0 ? Math.round(finalCalories) : undefined,
      };
      onAddFood(meal.id, newFoodData);
    }
    resetForm();
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm">
      <h3 className="text-lg font-bold text-gray-800 mb-3">{meal.name}</h3>
      
      <div className="space-y-2 mb-4 min-h-[40px]">
        {meal.foods.map(food => (
          <div key={food.id} className="flex items-center justify-between bg-gray-50 p-2 rounded-md">
            <div>
              <p className="font-medium text-gray-700">{food.name}</p>
              <p className="text-sm text-gray-500">
                {food.quantity} {food.calories && <span className="font-semibold">({food.calories} kcal)</span>}
              </p>
              {(food.protein !== undefined || food.carbs !== undefined || food.fat !== undefined) && (
                <p className="text-xs text-gray-400 mt-1">
                  P: {food.protein || 0}g, C: {food.carbs || 0}g, G: {food.fat || 0}g
                </p>
              )}
            </div>
            <div className="flex items-center gap-3">
                <button onClick={() => handleEditClick(food)} className="text-gray-400 hover:text-emerald-600"><EditIcon /></button>
                <button onClick={() => onRemoveFood(meal.id, food.id)} className="text-red-500 hover:text-red-700"><TrashIcon /></button>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t pt-4 mt-4 space-y-4">
        <h4 className="font-semibold text-left">{editingFood ? `Editando: ${editingFood.name}` : 'Adicionar Novo Alimento'}</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <Input label="Alimento" placeholder="Ex: Batata doce" value={foodName} onChange={(e) => setFoodName(e.target.value)} />
            <Input label="Qtd (g)" placeholder="100" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
        </div>
        <div className="-mt-2">
            <Button variant="secondary" onClick={() => console.log('Abrir câmera...')} className="!py-2 text-sm w-full">
                <div className="flex items-center justify-center space-x-2"><CameraIcon /><span>Escanear tabela nutricional</span></div>
            </Button>
        </div>
        <p className="text-xs text-gray-500 text-left pt-2">Nutrientes (opcional):</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <Input label="Proteína (g)" type="number" placeholder="-" value={protein} onChange={(e) => setProtein(e.target.value)} />
            <Input label="Carboidrato (g)" type="number" placeholder="-" value={carbs} onChange={(e) => setCarbs(e.target.value)} />
            <Input label="Gordura (g)" type="number" placeholder="-" value={fat} onChange={(e) => setFat(e.target.value)} />
            <Input label="Calorias (kcal)" type="number" placeholder="-" value={calories} onChange={(e) => setCalories(e.target.value)} />
        </div>
        <Button onClick={handleSaveClick} className="w-full mt-2 !py-2">
          {editingFood ? 'Salvar Alterações' : 'Adicionar Alimento'}
        </Button>
        {editingFood && (
            <Button variant="tertiary" onClick={resetForm} className="w-full !py-1 text-sm">
                Cancelar Edição
            </Button>
        )}
      </div>
    </div>
  );
};

export default MealBuilderCard;
