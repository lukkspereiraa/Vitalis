import React from 'react';
import Button from '../components/ui/Button.tsx';
import MealDisplayCard from '../components/features/consumer/MealDisplayCard.tsx';
import type { Meal } from '../types/index.ts';

// --- Ícone ---
const ChevronLeftIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="m15 18-6-6 6-6"/>
    </svg>
);

// --- Tipos ---
type MealPlanProps = {
  mealPlan: Meal[] | null;
  onNavigate: (screen: string) => void;
};

const MealPlanScreen: React.FC<MealPlanProps> = ({ mealPlan, onNavigate }) => {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-[#212121]">Seu Plano Alimentar</h1>
        <p className="text-md text-[#757575]">Este é o plano que o seu nutricionista preparou para si.</p>
      </div>

      <div className="space-y-6">
        {mealPlan && mealPlan.length > 0 ? (
          mealPlan.map(meal => <MealDisplayCard key={meal.id} meal={meal} />)
        ) : (
          <div className="bg-white p-6 rounded-xl shadow-sm text-center">
            <p className="text-gray-600">Ainda não tem um plano alimentar. Peça ao seu nutricionista para criar um para si!</p>
          </div>
        )}
      </div>

      <div className="mt-8">
        <Button variant="secondary" onClick={() => onNavigate('dashboard')}>
            <div className="flex items-center justify-center space-x-2">
                <ChevronLeftIcon />
                <span>Voltar ao Dashboard</span>
            </div>
        </Button>
      </div>
    </div>
  );
};

export default MealPlanScreen;
