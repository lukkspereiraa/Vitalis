import { useState } from 'react';
import WelcomeScreen from './screens/WelcomeScreen.tsx';
import OnboardingStep1Screen from './screens/OnboardingStep1Screen.tsx';
import OnboardingStep2Screen from './screens/OnboardingStep2Screen.tsx';
import OnboardingStep3Screen from './screens/OnboardingStep3Screen.tsx';
import DashboardScreen from './screens/DashboardScreen.tsx';
import { calculateNutritionGoals, type UserData, type NutritionGoals } from './utils/nutritionCalculator.ts';

export default function App() {
    const [currentScreen, setCurrentScreen] = useState('welcome');
    // Estado para guardar os dados do usuário durante o cadastro
    const [userData, setUserData] = useState<Partial<UserData>>({});
    // Estado para guardar as metas calculadas
    const [nutritionGoals, setNutritionGoals] = useState<NutritionGoals | null>(null);

    // Função para navegar entre as telas e juntar os dados do cadastro
    const handleNavigation = (screen: string, data: object = {}) => {
        setUserData(prevData => ({ ...prevData, ...data }));
        setCurrentScreen(screen);
    };
    
    // Função chamada no final do cadastro para calcular as metas
    const handleOnboardingComplete = (finalData: object) => {
        const fullUserData = { ...userData, ...finalData } as UserData;
        setUserData(fullUserData);
        
        // Usamos calculador com os dados finais
        const goals = calculateNutritionGoals(fullUserData);
        setNutritionGoals(goals);
        console.log('Metas calculadas:', goals);
        
        setCurrentScreen('dashboard');
    };

    // Função que decide qual tela renderizar
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
