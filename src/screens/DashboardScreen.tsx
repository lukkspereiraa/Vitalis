import React from 'react';
import NutritionCard from '../components/features/dashboard/NutritionCard.tsx';
import WorkoutCard from '../components/features/dashboard/WorkoutCard.tsx';
import type { UserData, NutritionGoals} from '../utils/nutritionCalculator.ts';
import type { DailyLog } from '../types/index.ts';

// --- Tipos ---
type DashboardProps = {
  onNavigate: (screen: string) => void;
  userData: Partial<UserData>;
  goals: NutritionGoals | null;
  consumed: DailyLog; 
};

// --- Componente de Ecrã ---
const DashboardScreen: React.FC<DashboardProps> = ({ onNavigate, userData, goals, consumed }) => {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-[#212121]">Seu Dashboard</h1>
        <p className="text-md text-[#757575]">Bem-vindo de volta, {userData.name || 'Usuário'}!</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 2. Passamos os dados de consumo para o NutritionCard */}
        <NutritionCard onNavigate={onNavigate} goals={goals} consumed={consumed} />
        <WorkoutCard onNavigate={onNavigate} />
      </div>
    </div>
  );
};

export default DashboardScreen;
