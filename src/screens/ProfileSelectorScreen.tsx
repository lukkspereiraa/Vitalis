import React from 'react';
// Corrigindo o caminho de importação para deixar o sistema resolver a extensão do arquivo.
import Button from '../components/ui/Button';

// --- Ícone ---
const LeafIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M11 20A7 7 0 0 1 4 13H2a10 10 0 0 0 10 10zM2 13h2a7 7 0 0 1 7-7V4a10 10 0 0 0-10 9z"></path>
        <path d="M12 21a9 9 0 0 0 9-9h-2a7 7 0 0 1-7 7z"></path>
    </svg>
);

// --- Tipos ---
type ProfileSelectorProps = {
  onSelectProfile: (profile: 'consumer' | 'professional') => void;
};

// --- Componente de Tela ---
const ProfileSelectorScreen: React.FC<ProfileSelectorProps> = ({ onSelectProfile }) => {
  return (
    <div className="min-h-screen flex flex-col p-8 text-center font-sans">
      <div className="flex-grow flex flex-col items-center justify-center">
        <div className="flex items-center space-x-3 mb-4">
            <LeafIcon className="text-[#10B981]" />
            <h1 className="text-5xl font-bold text-[#212121]">Vitalis</h1>
        </div>
        <p className="text-lg text-[#757575] max-w-md mx-auto mb-12">
            Selecione seu perfil para continuar.
        </p>
        <div className="w-full max-w-sm mx-auto space-y-4">
            <Button variant="primary" onClick={() => onSelectProfile('consumer')}>
                Sou Consumidor
            </Button>
            <Button variant="secondary" onClick={() => onSelectProfile('professional')}>
                Sou Profissional
            </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfileSelectorScreen;
