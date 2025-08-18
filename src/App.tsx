import { useState } from 'react';
import ProfileSelectorScreen from './screens/ProfileSelectorScreen.tsx';
import WelcomeScreen from './screens/WelcomeScreen.tsx';
import OnboardingStep1Screen from './screens/OnboardingStep1Screen.tsx';
import OnboardingStep2Screen from './screens/OnboardingStep2Screen.tsx';
import OnboardingStep3Screen from './screens/OnboardingStep3Screen.tsx';
import DashboardScreen from './screens/DashboardScreen.tsx';
import ProfessionalDashboardScreen from './screens/ProfessionalDashboardScreen.tsx';
import ClientDetailScreen from './screens/ClientDetailScreen.tsx';
import { calculateNutritionGoals, type UserData, type NutritionGoals } from './utils/nutritionCalculator.ts';
import type { Client } from './types/index.ts';

export default function App() {
    const [userProfile, setUserProfile] = useState<'consumer' | 'professional' | null>(null);
    const [currentScreen, setCurrentScreen] = useState('welcome');
    const [userData, setUserData] = useState<Partial<UserData>>({});
    const [nutritionGoals, setNutritionGoals] = useState<NutritionGoals | null>(null);
    const [selectedClient, setSelectedClient] = useState<Client | null>(null);

    const handleSelectProfile = (profile: 'consumer' | 'professional') => {
        setUserProfile(profile);
        if (profile === 'professional') {
            setCurrentScreen('professionalDashboard');
        } else {
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

    const renderScreen = () => {
        if (!userProfile) {
            return <ProfileSelectorScreen onSelectProfile={handleSelectProfile} />;
        }

        if (userProfile === 'professional') {
            switch (currentScreen) {
                case 'professionalDashboard':
                    return <ProfessionalDashboardScreen onNavigate={handleNavigation} />;
                case 'clientDetail':
                    return <ClientDetailScreen client={selectedClient} onNavigate={handleNavigation} />;
                default:
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
                default:
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
