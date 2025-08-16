import React from 'react';
// Corrigindo os caminhos de importação para serem mais explícitos
import Input from '../components/ui/Input.tsx';
import Button from '../components/ui/Button.tsx';

// --- Tipos ---
type NavigationProps = {
  onNavigate: (screen: string) => void;
};

// --- Componente de Tela ---
const OnboardingStep2Screen: React.FC<NavigationProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen flex flex-col p-8 font-sans w-full max-w-md mx-auto">
      {/* Cabeçalho da Tela */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-[#212121]">As suas medidas</h1>
        <p className="text-md text-[#757575]">Passo 2 de 3: Estes dados ajudam-nos a calcular as suas necessidades.</p>
      </div>

      {/* Formulário com os Inputs */}
      <div className="space-y-6">
        <Input label="Altura (cm)" type="number" placeholder="Ex: 175" />
        <Input label="Peso (kg)" type="number" placeholder="Ex: 70.5" />
        <Input label="Percentual de Gordura (%)" type="number" placeholder="Opcional" />
      </div>
      
      {/* Botão de Navegação */}
      <div className="mt-auto pt-8">
        <Button onClick={() => onNavigate('onboardingStep3')}>
          Avançar
        </Button>
      </div>
    </div>
  );
};

export default OnboardingStep2Screen;