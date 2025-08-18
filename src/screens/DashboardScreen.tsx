import React from 'react';
import NutritionCard from '../components/features/dashboard/NutritionCard';
import WorkoutCard from '../components/features/dashboard/WorkoutCard';
import type { UserData, NutritionGoals } from '../utils/nutritionCalculator';

// --- Tipos ---
type DashboardProps = {
  onNavigate: (screen: string) => void;
  userData: Partial<UserData>;
  goals: NutritionGoals | null;
};

// --- Componente de Tela ---
const DashboardScreen: React.FC<DashboardProps> = ({ onNavigate, userData, goals }) => {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-[#212121]">Seu Dashboard</h1>
        {/* Usamos o nome real do usuário! */}
        <p className="text-md text-[#757575]">Bem-vindo de volta, {userData.name || 'Usuário'}!</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Passamos as metas para o card de nutrição */}
        <NutritionCard onNavigate={onNavigate} goals={goals} />
        <WorkoutCard onNavigate={onNavigate} />
      </div>
    </div>
  );
};

export default DashboardScreen;
