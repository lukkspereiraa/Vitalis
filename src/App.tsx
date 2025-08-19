import { useState } from 'react';
// Corrigindo os caminhos de importação para incluir a extensão do arquivo.
import ProfileSelectorScreen from './screens/ProfileSelectorScreen.tsx';
import WelcomeScreen from './screens/WelcomeScreen.tsx';
import OnboardingStep1Screen from './screens/OnboardingStep1Screen.tsx';
import OnboardingStep2Screen from './screens/OnboardingStep2Screen.tsx';
import OnboardingStep3Screen from './screens/OnboardingStep3Screen.tsx';
import DashboardScreen from './screens/DashboardScreen.tsx';
import ProfessionalDashboardScreen from './screens/ProfessionalDashboardScreen.tsx';
import ClientDetailScreen from './screens/ClientDetailScreen.tsx';
import CreateMealPlanScreen from './screens/CreateMealPlanScreen.tsx';
import MealPlanScreen from './screens/MealPlanScreen.tsx';
// Importando tipos e o calculador
import { calculateNutritionGoals, type UserData, type NutritionGoals } from './utils/nutritionCalculator.ts';
import type { Client, WeeklyPlan } from './types/index.ts';

export default function App() {
    // Estado para o perfil selecionado (começa como nulo)
    const [userProfile, setUserProfile] = useState<'consumer' | 'professional' | null>(null);
    // O estado inicial da tela deve ser o seletor de perfil
    const [currentScreen, setCurrentScreen] = useState('profileSelector');
    const [userData, setUserData] = useState<Partial<UserData>>({});
    const [nutritionGoals, setNutritionGoals] = useState<NutritionGoals | null>(null);
    const [selectedClient, setSelectedClient] = useState<Client | null>(null);
    const [mealPlans, setMealPlans] = useState<Record<number, WeeklyPlan>>({});

    const handleSelectProfile = (profile: 'consumer' | 'professional') => {
        setUserProfile(profile);
        if (profile === 'professional') {
            setCurrentScreen('professionalDashboard');
        } else {
            // O fluxo do consumidor começa na tela de boas-vindas
            setCurrentScreen('welcome');
        }
    };

    const handleNavigation = (screen: string, data: { client?: Client } & Partial<UserData> = {}) => {
        if (screen === 'clientDetail' && data.client) {
            setSelectedClient(data.client);
        }
        if (screen === 'professionalDashboard') {
            setSelectedClient(null);
        }
        setUserData(prevData => ({ ...prevData, ...data }));
        setCurrentScreen(screen);
    };
    
    const handleOnboardingComplete = (finalData: object) => {
        const fullUserData = { ...userData, ...finalData } as UserData;
        setUserData(fullUserData);
        const goals = calculateNutritionGoals(fullUserData);
        setNutritionGoals(goals);
        setCurrentScreen('dashboard');
    };

    const handleSavePlan = (clientId: number, plan: WeeklyPlan) => {
        console.log(`Salvando plano para o cliente ${clientId}:`, plan);
        setMealPlans(currentPlans => ({
            ...currentPlans,
            [clientId]: plan,
        }));
    };

    const renderScreen = () => {
        // A primeira coisa que o app faz é perguntar o perfil
        if (!userProfile) {
            return <ProfileSelectorScreen onSelectProfile={handleSelectProfile} />;
        }

        if (userProfile === 'professional') {
            switch (currentScreen) {
                case 'professionalDashboard':
                    return <ProfessionalDashboardScreen onNavigate={handleNavigation} />;
                case 'clientDetail':
                    return <ClientDetailScreen client={selectedClient} onNavigate={handleNavigation} />;
                case 'createMealPlan':
                    return <CreateMealPlanScreen client={selectedClient} onNavigate={handleNavigation} onSavePlan={handleSavePlan} />;
                default:
                    // Se algo der errado, volta para o dashboard do profissional
                    return <ProfessionalDashboardScreen onNavigate={handleNavigation} />;
            }
        }

        if (userProfile === 'consumer') {
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
                case 'mealPlan': {
                    // Assumimos que o consumidor logado tem o id 1 para este exemplo
                    const consumerPlan = mealPlans[1] || null;
                    return <MealPlanScreen prescribedPlan={consumerPlan} onNavigate={handleNavigation} />;
                }
                default:
                    // Se algo der errado, volta para a tela de boas-vindas
                    return <WelcomeScreen onNavigate={handleNavigation} />;
            }
        }
    };

    return (
        <div className="bg-[#F8F7F4]">
            {renderScreen()}
        </div>
    );
}
