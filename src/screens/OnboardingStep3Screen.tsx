import React, { useState } from 'react';
import ActivityCard from '../components/features/onboarding/ActivityCard';
import Button from '../components/ui/Button';

// --- Tipos ---
type NavigationProps = {
  onNavigate: (screen: string) => void;
};

// --- Componente de Tela ---
const OnboardingStep3Screen: React.FC<NavigationProps> = ({ onNavigate }) => {
  const [selectedActivity, setSelectedActivity] = useState<string | null>(null);

  return (
    <div className="min-h-screen flex flex-col p-8 font-sans w-full max-w-md mx-auto">
      {/* Cabeçalho da Tela */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-[#212121]">Nível de Atividade</h1>
        <p className="text-md text-[#757575]">Passo 3 de 3: Com que frequência você se exercita?</p>
      </div>


      <div className="space-y-4">
        <ActivityCard
          title="Sedentário"
          description="Pouco ou nenhum exercício"
          isSelected={selectedActivity === 'sedentary'}
          onClick={() => setSelectedActivity('sedentary')}
        />
        <ActivityCard
          title="Levemente Ativo"
          description="Exercício leve 1-2 dias/semana"
          isSelected={selectedActivity === 'light'}
          onClick={() => setSelectedActivity('light')}
        />
        <ActivityCard
          title="Moderadamente Ativo"
          description="Exercício moderado 3-4 dias/semana"
          isSelected={selectedActivity === 'moderate'}
          onClick={() => setSelectedActivity('moderate')}
        />
        <ActivityCard
          title="Muito Ativo"
          description="Exercício pesado 5-7 dias/semana"
          isSelected={selectedActivity === 'very'}
          onClick={() => setSelectedActivity('very')}
        />
      </div>
      

      <div className="mt-auto pt-8">
        <Button onClick={() => onNavigate('dashboard')}>
          Concluir Cadastro
        </Button>
      </div>
    </div>
  );
};

export default OnboardingStep3Screen;