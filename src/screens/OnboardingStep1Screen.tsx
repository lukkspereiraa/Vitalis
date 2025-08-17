import React, { useState } from 'react';
import Input from '../components/ui/Input';
import GoalCard from '../components/features/onboarding/GoalCard';
import Button from '../components/ui/Button';
import GenderSelector from '../components/features/onboarding/GenderSelector';

// --- Tipos ---
type NavigationProps = {
  onNavigate: (screen: string) => void;
};

// --- Componente de Tela ---
const OnboardingStep1Screen: React.FC<NavigationProps> = ({ onNavigate }) => {
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);
  const [gender, setGender] = useState<'male' | 'female' | null>(null);

  return (
    <div className="min-h-screen flex flex-col p-8 font-sans w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-[#212121]">Vamos começar</h1>
        <p className="text-md text-[#757575]">Passo 1 de 3: Conte-nos sobre você.</p>
      </div>

      <div className="space-y-6">
        <Input label="Seu nome" type="text" placeholder="Digite seu nome" />
        
        <div>
          <label className="block text-sm font-medium text-gray-700 text-left mb-2">
            Qual seu objetivo principal?
          </label>
          <div className="grid grid-cols-3 gap-4">
            <GoalCard 
              icon="📉" 
              title="Perder Peso" 
              isSelected={selectedGoal === 'lose'}
              onClick={() => setSelectedGoal('lose')}
            />
            <GoalCard 
              icon="⚖️" 
              title="Manter" 
              isSelected={selectedGoal === 'maintain'}
              onClick={() => setSelectedGoal('maintain')}
            />
            <GoalCard 
              icon="💪" 
              title="Ganhar Massa" 
              isSelected={selectedGoal === 'gain'}
              onClick={() => setSelectedGoal('gain')}
            />
          </div>

          <GenderSelector selectedValue={gender} onSelect={setGender} />
  
        
        </div>
      </div>
      
      <div className="mt-auto pt-8">
        <Button onClick={() => onNavigate('onboardingStep2')}>
          Avançar
        </Button>
      </div>
    </div>
  );
};

export default OnboardingStep1Screen;