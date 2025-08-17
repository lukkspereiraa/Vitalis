import  { useState } from 'react';
import WelcomeScreen from './screens/WelcomeScreen';
import OnboardingStep1Screen from './screens/OnboardingStep1Screen';
import OnboardingStep2Screen from './screens/OnboardingStep2Screen';
import OnboardingStep3Screen from './screens/OnboardingStep3Screen';
import DashboardScreen from './screens/DashboardScreen';

// --- Componente Principal da Aplicação ---
export default function App() {
    const [currentScreen, setCurrentScreen] = useState('welcome');
    const [userData, setUserData] = useState({});

    const handleNavigation = (screen: string, data: object = {}) => {
        console.log(`Navegando para ${screen} com dados:`, data);
        setUserData(prevData => ({ ...prevData, ...data }));
        setCurrentScreen(screen);
    };
    
    const handleOnboardingComplete = (finalData: object) => {
        console.log('Cadastro concluído! Dados finais:', finalData);
        setUserData(finalData);
        setCurrentScreen('dashboard');
    };


    const renderScreen = () => {
        switch (currentScreen) {
            case 'welcome':
                return <WelcomeScreen onNavigate={handleNavigation} />;
            case 'onboardingStep1':
              return <OnboardingStep1Screen onNavigate={handleNavigation} />;
  
            case 'onboardingStep2':
              return <OnboardingStep2Screen onNavigate={handleNavigation} userData={userData} />;
            case 'onboardingStep3':
              return <OnboardingStep3Screen onComplete={handleOnboardingComplete} onNavigate={handleNavigation} userData={userData} />;
            case 'dashboard':

              return <DashboardScreen onNavigate={handleNavigation} />;
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