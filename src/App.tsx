import { useState } from 'react';
import WelcomeScreen from './screens/WelcomeScreen.tsx';
import OnboardingStep1Screen from './screens/OnboardingStep1Screen.tsx'; 

// --- Componente Principal da Aplicação ---
export default function App() {
    const [currentScreen, setCurrentScreen] = useState('welcome');

    // Agora a função de navegação realmente MUDA a tela!
    const handleNavigation = (screen: string) => {
        console.log(`Navegando para a tela: ${screen}`);
        setCurrentScreen(screen); // Esta linha ativa a mágica
    };

    const renderScreen = () => {
        switch (currentScreen) {
            case 'welcome':
                return <WelcomeScreen onNavigate={handleNavigation} />;
   
            case 'onboardingStep1':
              return <OnboardingStep1Screen onNavigate={handleNavigation} />;
            default:
                return <WelcomeScreen onNavigate={handleNavigation} />;
        }
    };

    return (
        <div className="bg-[#F8F7F4]">
            {renderScreen()}
        </div>
    );
}