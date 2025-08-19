import React, { useState } from 'react';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import MealBuilderCard from '../components/features/professional/MealBuilderCard';
import type { Client, Meal, Food } from '../types';

const ChevronLeftIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="m15 18-6-6 6-6"/>
    </svg>
);
const TrashIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M10 11v6"/><path d="M14 11v6"/>
    </svg>
);

// --- Tipos ---
type CreateMealPlanProps = {
  client: Client | null;
  onNavigate: (screen: string) => void;
  onSavePlan: (clientId: number, plan: Meal[]) => void;
};

// --- Componente de Ecrã ---
const CreateMealPlanScreen: React.FC<CreateMealPlanProps> = ({ client, onNavigate, onSavePlan }) => {
  const [mealPlan, setMealPlan] = useState<Meal[]>([
    { id: 1, name: 'Pequeno-almoço', foods: [] },
    { id: 2, name: 'Almoço', foods: [] },
  ]);
  const [newMealName, setNewMealName] = useState('');

  const handleAddFood = (mealId: number, foodData: Omit<Food, 'id'>) => {
    setMealPlan(currentPlan => 
      currentPlan.map(meal => {
        if (meal.id === mealId) {
          const newFood: Food = { ...foodData, id: Date.now() };
          return { ...meal, foods: [...meal.foods, newFood] };
        }
        return meal;
      })
    );
  };

  const handleRemoveFood = (mealId: number, foodId: number) => {
    setMealPlan(currentPlan =>
      currentPlan.map(meal => {
        if (meal.id === mealId) {
          return { ...meal, foods: meal.foods.filter(food => food.id !== foodId) };
        }
        return meal;
      })
    );
  };

  const handleAddMeal = () => {
    if (newMealName.trim()) {
      const newMeal: Meal = {
        id: Date.now(),
        name: newMealName,
        foods: [],
      };
      setMealPlan([...mealPlan, newMeal]);
      setNewMealName('');
    }
  };

  const handleRemoveMeal = (mealIdToRemove: number) => {
    setMealPlan(currentPlan => currentPlan.filter(meal => meal.id !== mealIdToRemove));
  };
  
  const handleSavePlan = () => {
    if (!client) return;
    onSavePlan(client.id, mealPlan);
    onNavigate('clientDetail');
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-[#212121]">Criar Plano Alimentar</h1>
        <p className="text-md text-[#757575]">Para: {client?.name || 'Cliente sem nome'}</p>
      </div>

      <div className="space-y-6">
        {mealPlan.map(meal => (
          <div key={meal.id} className="relative group">
            <MealBuilderCard 
              meal={meal}
              onAddFood={handleAddFood}
              onRemoveFood={handleRemoveFood}
            />
            <button 
              onClick={() => handleRemoveMeal(meal.id)} 
              className="absolute top-3 right-3 text-gray-400 hover:text-red-600 p-1 rounded-full bg-white/50 hover:bg-red-100 transition-all opacity-0 group-hover:opacity-100"
              title="Remover Refeição"
            >
              <TrashIcon />
            </button>
          </div>
        ))}
      </div>

      <div className="mt-6 bg-white p-4 rounded-xl shadow-sm border-2 border-dashed">
        <h3 className="font-bold text-lg mb-2">Adicionar Nova Refeição</h3>
        <div className="flex items-end gap-2">
            <div className="flex-grow">
                <Input label="Nome da Refeição" placeholder="Ex: Lanche da Tarde" value={newMealName} onChange={(e) => setNewMealName(e.target.value)} />
            </div>
            <Button onClick={handleAddMeal} className="py-3 h-[46px] w-auto px-4">
                Adicionar
            </Button>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4">
        <Button variant="secondary" onClick={() => onNavigate('clientDetail')}>
            <div className="flex items-center justify-center space-x-2">
                <ChevronLeftIcon />
                <span>Cancelar</span>
            </div>
        </Button>
        <Button variant="primary" onClick={handleSavePlan}>
            Salvar Plano
        </Button>
      </div>
    </div>
  );
};

export default CreateMealPlanScreen;
