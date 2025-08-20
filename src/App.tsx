import { useState } from 'react';
import ProfileSelectorScreen from './screens/ProfileSelectorScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import OnboardingStep1Screen from './screens/OnboardingStep1Screen';
import OnboardingStep2Screen from './screens/OnboardingStep2Screen';
import OnboardingStep3Screen from './screens/OnboardingStep3Screen';
import DashboardScreen from './screens/DashboardScreen';
import ProfessionalDashboardScreen from './screens/ProfessionalDashboardScreen';
import ClientDetailScreen from './screens/ClientDetailScreen';
import CreateMealPlanScreen from './screens/CreateMealPlanScreen';
import MealPlanScreen from './screens/MealPlanScreen';
import { calculateNutritionGoals, type UserData, type NutritionGoals } from './utils/nutritionCalculator';
import type { Client, WeeklyPlan, Food, DailyLog } from './types';

export default function App() {
    const [userProfile, setUserProfile] = useState<'consumer' | 'professional' | null>(null);
    const [currentScreen, setCurrentScreen] = useState('profileSelector');
    const [userData, setUserData] = useState<Partial<UserData>>({});
    const [nutritionGoals, setNutritionGoals] = useState<NutritionGoals | null>(null);
    const [selectedClient, setSelectedClient] = useState<Client | null>(null);
    const [mealPlans, setMealPlans] = useState<Record<number, WeeklyPlan>>({});
    const [dailyLog, setDailyLog] = useState<DailyLog>({ calories: 0, protein: 0, carbs: 0, fat: 0 });
    const [checkedFoods, setCheckedFoods] = useState<Record<number, boolean>>({});

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

    const handleSavePlan = (clientId: number, plan: WeeklyPlan) => {
        console.log(`Salvando plano para o cliente ${clientId}:`, plan);
        setMealPlans(currentPlans => ({
            ...currentPlans,
            [clientId]: plan,
        }));
    };

    const handleLogFood = (food: Food, isAdding: boolean) => {
        const protein = food.protein || 0;
        const carbs = food.carbs || 0;
        const fat = food.fat || 0;
        const calories = (protein * 4) + (carbs * 4) + (fat * 9);

        const multiplier = isAdding ? 1 : -1;

        setDailyLog(prevLog => ({
            calories: prevLog.calories + (calories * multiplier),
            protein: prevLog.protein + (protein * multiplier),
            carbs: prevLog.carbs + (carbs * multiplier),
            fat: prevLog.fat + (fat * multiplier),
        }));
        
        // Atualiza o estado dos checkboxes
        setCheckedFoods(prev => ({
            ...prev,
            [food.id]: isAdding
        }));
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
                case 'createMealPlan':
                    return <CreateMealPlanScreen client={selectedClient} onNavigate={handleNavigation} onSavePlan={handleSavePlan} />;
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
                  return <DashboardScreen onNavigate={handleNavigation} userData={userData} goals={nutritionGoals} consumed={dailyLog} />;
                case 'mealPlan': {
                    const consumerPlan = mealPlans[1] || null; // Assumimos que o consumidor logado tem o id 1
                    return <MealPlanScreen prescribedPlan={consumerPlan} onNavigate={handleNavigation} onLogFood={handleLogFood} checkedFoods={checkedFoods} />;
                }
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
