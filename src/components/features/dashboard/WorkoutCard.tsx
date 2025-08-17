import React from 'react';
import Button from '../../ui/Button';

// --- Tipos ---
type NavigationProps = {
  onNavigate: (screen: string) => void;
};

// --- Componente ---
const WorkoutCard: React.FC<NavigationProps> = ({ onNavigate }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md flex flex-col">
      <h2 className="text-xl font-bold text-[#212121] mb-4">Seu Treino de Hoje</h2>
      
      <div className="bg-gray-100 p-4 rounded-lg mb-4">
        <h3 className="font-semibold text-emerald-700">Treino A: Peito e Tríceps</h3>
        <p className="text-sm text-gray-600">5 exercícios planejados</p>
      </div>

      <div>
        <h3 className="font-semibold text-gray-800">Progresso da Semana</h3>
        <div className="w-full bg-gray-200 rounded-full h-2.5 my-2">
            <div className="bg-emerald-600 h-2.5 rounded-full" style={{ width: '60%' }}></div>
        </div>
        <p className="text-sm text-gray-600">3 de 5 treinos concluídos</p>
      </div>

      <div className="mt-auto pt-6">
        <Button variant="secondary" onClick={() => onNavigate('workoutDetail')}>
            Iniciar Treino
        </Button>
      </div>
    </div>
  );
};

export default WorkoutCard;