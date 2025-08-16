import React from 'react';
import AppIdentity from '../components/features/welcome/AppIdentity';
import ActionButtons from '../components/features/welcome/ActionButtons';

// --- Tipos ---
type NavigationProps = {
  onNavigate: (screen: string) => void;
};

// --- Componente de Tela ---
const WelcomeScreen: React.FC<NavigationProps> = ({ onNavigate }) => {
    return (
        <div className="min-h-screen flex flex-col p-8 text-center font-sans">
            <AppIdentity />
            <ActionButtons onNavigate={onNavigate} />
        </div>
    );
};

export default WelcomeScreen;
