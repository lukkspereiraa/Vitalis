import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import Button from '../../ui/Button';

ChartJS.register(ArcElement, Tooltip, Legend);

// --- Tipos ---
type NavigationProps = {
  onNavigate: (screen: string) => void;
};

// --- Componente ---
const NutritionCard: React.FC<NavigationProps> = ({ onNavigate }) => {
  const data = {
    labels: ['Proteínas', 'Carboidratos', 'Gorduras'],
    datasets: [
      {
        data: [80, 150, 30], 
        backgroundColor: ['#10B981', '#F59E0B', '#EF4444'],
        borderColor: '#F8F7F4',
        borderWidth: 4,
        hoverOffset: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '70%', 
    plugins: {
      legend: {
        display: false, 
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md flex flex-col">
      <h2 className="text-xl font-bold text-[#212121] mb-4">Resumo Nutricional</h2>
      <div className="relative h-48 w-48 mx-auto">
        <Doughnut data={data} options={options} />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-3xl font-bold text-[#212121]">1250</span>
          <span className="text-sm text-[#757575]">/ 2500 kcal</span>
        </div>
      </div>
      <div className="mt-4 flex justify-around text-center">
        <div>
            <p className="font-bold text-emerald-600">80g</p>
            <p className="text-sm text-gray-500">Proteínas</p>
        </div>
        <div>
            <p className="font-bold text-amber-500">150g</p>
            <p className="text-sm text-gray-500">Carbs</p>
        </div>
        <div>
            <p className="font-bold text-red-500">30g</p>
            <p className="text-sm text-gray-500">Gorduras</p>
        </div>
      </div>
      <div className="mt-auto pt-6">
        <Button onClick={() => onNavigate('nutritionDetail')}>
            Ver Diário Completo
        </Button>
      </div>
    </div>
  );
};

export default NutritionCard;