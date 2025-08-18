import  { useState } from 'react';
import WelcomeScreen from './screens/WelcomeScreen';
import OnboardingStep1Screen from './screens/OnboardingStep1Screen';
import OnboardingStep2Screen from './screens/OnboardingStep2Screen';
import OnboardingStep3Screen from './screens/OnboardingStep3Screen';
import DashboardScreen from './screens/DashboardScreen';
// 1. Importar o calculador e os tipos
import { calculateNutritionGoals, type UserData, type NutritionGoals } from './utils/nutritionCalculator';

// --- Componente Principal da Aplicação ---
export default function App() {
    const [currentScreen, setCurrentScreen] = useState('welcome');
    // 2. Usar um estado mais estruturado para os dados do usuário
    const [userData, setUserData] = useState<Partial<UserData>>({});
    const [nutritionGoals, setNutritionGoals] = useState<NutritionGoals | null>(null);

    const handleNavigation = (screen: string, data: object = {}) => {
        setUserData(prevData => ({ ...prevData, ...data }));
        setCurrentScreen(screen);
    };
    
    // 3. Função de finalização agora faz o cálculo!
    const handleOnboardingComplete = (finalData: object) => {
        const fullUserData = { ...userData, ...finalData } as UserData;
        setUserData(fullUserData);
        
        // Chamamos nosso calculador com os dados finais
        const goals = calculateNutritionGoals(fullUserData);
        setNutritionGoals(goals);
        console.log('Metas calculadas:', goals);
        
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
              // 4. Passamos os dados e as metas para o Dashboard
              return <DashboardScreen onNavigate={handleNavigation} userData={userData} goals={nutritionGoals} />;
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
