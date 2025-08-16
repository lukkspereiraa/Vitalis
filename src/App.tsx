import { useState } from 'react';
import WelcomeScreen from './screens/WelcomeScreen'; // Importando a tela que criamos!

// --- Componente Principal da Aplicação ---
export default function App() {
    const [currentScreen] = useState('welcome');

    const handleNavigation = (screen: string) => {
        console.log(`Navegando para a tela: ${screen}`);
        // No próximo passo, vamos ativar esta linha:
        // setCurrentScreen(screen);
    };

    const renderScreen = () => {
        switch (currentScreen) {
            case 'welcome':
                return <WelcomeScreen onNavigate={handleNavigation} />;
            // Adicionaremos outras telas aqui.
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