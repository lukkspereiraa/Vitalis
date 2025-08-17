import  { useState } from 'react';
import WelcomeScreen from './screens/WelcomeScreen.tsx';
import OnboardingStep1Screen from './screens/OnboardingStep1Screen.tsx';
import OnboardingStep2Screen from './screens/OnboardingStep2Screen.tsx';
import OnboardingStep3Screen from './screens/OnboardingStep3Screen.tsx';

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
            case 'onboardingStep3':
              return <OnboardingStep3Screen onNavigate={handleNavigation} />;
            case 'dashboard':

                return <div className="min-h-screen flex items-center justify-center"><h1 className="text-4xl font-bold">Dashboard em Construção!</h1></div>;
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
