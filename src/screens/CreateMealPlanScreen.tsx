import React from 'react';
import Button from '../components/ui/Button.tsx';
import MealBuilderCard from '../components/features/professional/MealBuilderCard.tsx';
import type { Client } from '../types/index.ts';

// --- Ícone ---
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
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-[#212121]">Criar Plano Alimentar</h1>
        <p className="text-md text-[#757575]">Para: {client?.name || 'Cliente sem nome'}</p>
      </div>

      <div className="space-y-6">
        <MealBuilderCard mealName="Pequeno-almoço" />
        <MealBuilderCard mealName="Almoço" />
        <MealBuilderCard mealName="Jantar" />
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4">
        <Button variant="secondary" onClick={() => onNavigate('clientDetail')}>
            <div className="flex items-center justify-center space-x-2">
                <ChevronLeftIcon />
                <span>Cancelar</span>
            </div>
        </Button>
        <Button variant="primary" onClick={() => console.log('Salvar plano')}>
            Salvar Plano
        </Button>
      </div>
    </div>
  );
};

export default CreateMealPlanScreen;
