import React, { useState } from 'react';
import Button from '../components/ui/Button';
import MealBuilderCard from '../components/features/professional/MealBuilderCard';
import type { Client, Meal, Food } from '../types';

const ChevronLeftIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="m15 18-6-6 6-6"/>
    </svg>
);

// --- Tipos ---
type CreateMealPlanProps = {
  client: Client | null;
  onNavigate: (screen: string) => void;
};

const CreateMealPlanScreen: React.FC<CreateMealPlanProps> = ({ client, onNavigate }) => {
  const [mealPlan, setMealPlan] = useState<Meal[]>([
    { id: 1, name: 'Pequeno-almoço', foods: [] },
    { id: 2, name: 'Almoço', foods: [] },
    { id: 3, name: 'Jantar', foods: [] },
  ]);

  // Função para adicionar um alimento a uma refeição
  const handleAddFood = (mealId: number, foodName: string, quantity: string) => {
    setMealPlan(currentPlan => 
      currentPlan.map(meal => {
        if (meal.id === mealId) {
          const newFood: Food = {
            id: Date.now(), 
            name: foodName,
            quantity: `${quantity}g`,
          };
          return { ...meal, foods: [...meal.foods, newFood] };
        }
        return meal;
      })
    );
  };

  // Função para remover um alimento de uma refeição
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
  
  // Função para "salvar" o plano
  const handleSavePlan = () => {
    console.log("Plano Alimentar Salvo:", mealPlan);
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
          <MealBuilderCard 
            key={meal.id} 
            meal={meal}
            onAddFood={handleAddFood}
            onRemoveFood={handleRemoveFood}
          />
        ))}
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