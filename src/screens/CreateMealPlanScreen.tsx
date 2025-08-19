import React, { useState } from 'react';
import Button from '../components/ui/Button.tsx';
import Input from '../components/ui/Input.tsx';
import MealBuilderCard from '../components/features/professional/MealBuilderCard.tsx';
import DaySelector from '../components/ui/DaySelector.tsx';
import type { Client, Meal, Food, WeeklyPlan, DayOfWeek } from '../types/index.ts';

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

type CreateMealPlanProps = {
  client: Client | null;
  onNavigate: (screen: string) => void;
  onSavePlan: (clientId: number, plan: WeeklyPlan) => void;
};

const DAYS_OF_WEEK: DayOfWeek[] = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'];

const CreateMealPlanScreen: React.FC<CreateMealPlanProps> = ({ client, onNavigate, onSavePlan }) => {
  const [weeklyPlan, setWeeklyPlan] = useState<WeeklyPlan>({});
  const [selectedDay, setSelectedDay] = useState<DayOfWeek>('Segunda');
  const [newMealName, setNewMealName] = useState('');

  const mealsForSelectedDay = weeklyPlan[selectedDay] || [];

  const handleAddFood = (mealId: number, foodData: Omit<Food, 'id'>) => {
    const updatedMeals = mealsForSelectedDay.map(meal => {
        if (meal.id === mealId) {
            const newFood: Food = { ...foodData, id: Date.now() };
            return { ...meal, foods: [...meal.foods, newFood] };
        }
        return meal;
    });
    setWeeklyPlan(currentPlan => ({ ...currentPlan, [selectedDay]: updatedMeals }));
  };

  const handleRemoveFood = (mealId: number, foodId: number) => {
    const updatedMeals = mealsForSelectedDay.map(meal => {
        if (meal.id === mealId) {
            return { ...meal, foods: meal.foods.filter(food => food.id !== foodId) };
        }
        return meal;
    });
    setWeeklyPlan(currentPlan => ({ ...currentPlan, [selectedDay]: updatedMeals }));
  };

  const handleAddMeal = () => {
    if (newMealName.trim()) {
      const newMeal: Meal = { id: Date.now(), name: newMealName, foods: [] };
      const updatedMeals = [...mealsForSelectedDay, newMeal];
      setWeeklyPlan(currentPlan => ({ ...currentPlan, [selectedDay]: updatedMeals }));
      setNewMealName('');
    }
  };

  const handleRemoveMeal = (mealIdToRemove: number) => {
    const updatedMeals = mealsForSelectedDay.filter(meal => meal.id !== mealIdToRemove);
    setWeeklyPlan(currentPlan => ({ ...currentPlan, [selectedDay]: updatedMeals }));
  };
  
  const handleSavePlan = () => {
    if (!client) return;
    onSavePlan(client.id, weeklyPlan);
    onNavigate('clientDetail');
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-[#212121]">Criar Plano Semanal</h1>
        <p className="text-md text-[#757575]">Para: {client?.name || 'Cliente sem nome'}</p>
      </div>

      <div className="mb-6">
        <DaySelector days={DAYS_OF_WEEK} selectedDay={selectedDay} onSelectDay={setSelectedDay} />
      </div>

      <div className="space-y-6">
        {mealsForSelectedDay.map(meal => (
          <div key={meal.id} className="relative group">
            <MealBuilderCard meal={meal} onAddFood={handleAddFood} onRemoveFood={handleRemoveFood} />
            <button onClick={() => handleRemoveMeal(meal.id)} className="absolute top-3 right-3 text-gray-400 hover:text-red-600 p-1 rounded-full bg-white/50 hover:bg-red-100 transition-all opacity-0 group-hover:opacity-100" title="Remover Refeição">
              <TrashIcon />
            </button>
          </div>
        ))}
         {mealsForSelectedDay.length === 0 && (
            <div className="text-center py-10 bg-white rounded-xl shadow-sm">
                <p className="text-gray-500">Nenhuma refeição para {selectedDay}.</p>
            </div>
        )}
      </div>

      <div className="mt-6 bg-white p-4 rounded-xl shadow-sm border-2 border-dashed">
        <h3 className="font-bold text-lg mb-2">Adicionar Refeição para {selectedDay}</h3>
        <div className="flex items-end gap-2">
            <div className="flex-grow">
                <Input label="Nome da Refeição" placeholder="Ex: Lanche da Tarde" value={newMealName} onChange={(e) => setNewMealName(e.target.value)} />
            </div>
            <Button onClick={handleAddMeal} className="py-3 h-[46px] w-auto px-4">Adicionar</Button>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4">
        <Button variant="secondary" onClick={() => onNavigate('clientDetail')}>
            <div className="flex items-center justify-center space-x-2"><ChevronLeftIcon /><span>Cancelar</span></div>
        </Button>
        <Button variant="primary" onClick={handleSavePlan}>Salvar Plano</Button>
      </div>
    </div>
  );
};

export default CreateMealPlanScreen;
