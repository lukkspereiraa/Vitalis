import React from 'react';
import Button from '../../ui/Button';

// --- Tipos ---
type NavigationProps = {
  onNavigate: (screen: string) => void;
};

// --- Componente ---
const ActionButtons: React.FC<NavigationProps> = ({ onNavigate }) => (
    <div className="flex-shrink-0 space-y-4 w-full max-w-sm mx-auto">
        <Button variant="primary" onClick={() => onNavigate('onboardingStep1')}>
            Criar Conta
        </Button>
        <Button variant="secondary" onClick={() => onNavigate('login')}>
            Já tenho conta
        </Button>
    </div>
);

export default ActionButtons;
