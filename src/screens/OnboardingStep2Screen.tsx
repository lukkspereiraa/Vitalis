import React, { useState } from 'react';
import Input from '../components/ui/Input.tsx';
import Button from '../components/ui/Button.tsx';
import Alert from '../components/ui/Alert.tsx';

const ChevronLeftIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="m15 18-6-6 6-6"/>
    </svg>
);

// --- Tipos ---
type OnboardingStep2Props = {
  onNavigate: (screen: string, data?: object) => void;
  userData: object; // Dados coletados até agora
};

// --- Componente de Tela ---
const OnboardingStep2Screen: React.FC<OnboardingStep2Props> = ({ onNavigate, userData }) => {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [fatPercentage, setFatPercentage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleNext = () => {
    if (!height.trim() || Number(height) <= 0) {
      setErrorMessage('Por favor, insira uma altura válida.');
      return;
    }
    if (!weight.trim() || Number(weight) <= 0) {
      setErrorMessage('Por favor, insira um peso válido.');
      return;
    }
    
    setErrorMessage('');
    const newData = { ...userData, height: Number(height), weight: Number(weight), fatPercentage: Number(fatPercentage) || null };
    onNavigate('onboardingStep3', newData);
  };

  return (
    <div className="min-h-screen flex flex-col p-8 font-sans w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-[#212121]">As suas medidas</h1>
        <p className="text-md text-[#757575]">Passo 2 de 3: Estes dados ajudam-nos a calcular as suas necessidades.</p>
      </div>

      <div className="space-y-6">
        <Input 
          label="Altura (cm)" 
          type="number" 
          placeholder="Ex: 175"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
        />
        <Input 
          label="Peso (kg)" 
          type="number" 
          placeholder="Ex: 70.5"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />
        <Input 
          label="Percentual de Gordura (%)" 
          type="number" 
          placeholder="Opcional"
          value={fatPercentage}
          onChange={(e) => setFatPercentage(e.target.value)}
        />
      </div>
      
      <div className="mt-auto pt-8 space-y-2">
        <Alert message={errorMessage} />
        <Button onClick={handleNext}>
          Avançar
        </Button>
        <Button variant="secondary" onClick={() => onNavigate('onboardingStep1')}>
          <div className="flex items-center justify-center space-x-2">
            <ChevronLeftIcon />
            <span>Voltar</span>
          </div>
        </Button>
      </div>
    </div>
  );
};

export default OnboardingStep2Screen;