import React from 'react';
import NutritionCard from '../components/features/dashboard/NutritionCard';
import WorkoutCard from '../components/features/dashboard/WorkoutCard';

// --- Tipos ---
type NavigationProps = {
  onNavigate: (screen: string) => void;
};

// --- Componente de Tela ---
const DashboardScreen: React.FC<NavigationProps> = ({ onNavigate }) => {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-[#212121]">Seu Dashboard</h1>
        <p className="text-md text-[#757575]">Bem-vindo de volta, Lucas!</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <NutritionCard onNavigate={onNavigate} />
        <WorkoutCard onNavigate={onNavigate} />
      </div>
    </div>
  );
};

export default DashboardScreen;
