import { useState } from 'react';
import WelcomeScreen from './screens/WelcomeScreen';
import OnboardingStep1Screen from './screens/OnboardingStep1Screen';
import OnboardingStep2Screen from './screens/OnboardingStep2Screen'; // 1. Importar a nova tela

// --- Componente Principal da Aplicação ---
export default function App() {
    const [currentScreen, setCurrentScreen] = useState('welcome');

    const handleNavigation = (screen: string) => {
        console.log(`Navegando para a tela: ${screen}`);
        setCurrentScreen(screen);
    };

    const renderScreen = () => {
        switch (currentScreen) {
            case 'welcome':
                return <WelcomeScreen onNavigate={handleNavigation} />;
            case 'onboardingStep1':
              return <OnboardingStep1Screen onNavigate={handleNavigation} />;

            case 'onboardingStep2':
              return <OnboardingStep2Screen onNavigate={handleNavigation} />;
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
