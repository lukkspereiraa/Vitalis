import React, { useState } from 'react';
import Input from '../components/ui/Input';
import GoalCard from '../components/features/onboarding/GoalCard';
import Button from '../components/ui/Button';
import GenderSelector from '../components/features/onboarding/GenderSelector';
import Alert from '../components/ui/Alert';

const ChevronLeftIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="m15 18-6-6 6-6"/>
    </svg>
);

// --- Tipos ---
type NavigationProps = {
  onNavigate: (screen: string) => void;
};

// --- Componente de Tela ---
const OnboardingStep1Screen: React.FC<NavigationProps> = ({ onNavigate }) => {
  const [name, setName] = useState('');
  const [gender, setGender] = useState<'male' | 'female' | null>(null);
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleNext = () => {
    if (!name.trim()) {
      setErrorMessage('Por favor, preencha o seu nome.');
      return;
    }
    if (!gender) {
      setErrorMessage('Por favor, selecione o seu sexo.');
      return;
    }
    if (!selectedGoal) {
      setErrorMessage('Por favor, escolha o seu objetivo principal.');
      return;
    }
    
    setErrorMessage('');
    onNavigate('onboardingStep2');
  };

  return (
    <div className="min-h-screen flex flex-col p-8 font-sans w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-[#212121]">Vamos começar</h1>
        <p className="text-md text-[#757575]">Passo 1 de 3: Conte-nos sobre você.</p>
      </div>

      <div className="space-y-6">
        <Input 
          label="Seu nome" 
          type="text" 
          placeholder="Digite seu nome" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
        />
        
        <GenderSelector selectedValue={gender} onSelect={setGender} />
        
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
        </div>
      </div>
      
      <div className="mt-auto pt-8 space-y-2">
        <Alert message={errorMessage} />
        <Button onClick={handleNext}>
          Avançar
        </Button> 
        <Button variant="secondary" onClick={() => onNavigate('welcome')}>
          <div className="flex items-center justify-center space-x-2">
            <ChevronLeftIcon />
            <span>Voltar</span>
          </div>
        </Button>
      </div>
    </div>
  );
};

export default OnboardingStep1Screen;