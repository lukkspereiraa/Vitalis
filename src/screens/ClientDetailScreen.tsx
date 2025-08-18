import React from 'react';
import Button from '../components/ui/Button';
import DataPill from '../components/ui/DataPill';
import type { Client } from '../types/index';

const ChevronLeftIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="m15 18-6-6 6-6"/>
    </svg>
);

// --- Tipos ---
type ClientDetailProps = {
  client: Client | null; // Usar o tipo Client em vez de 'any'
  onNavigate: (screen: string) => void;
};

// --- Componente de Tela ---
const ClientDetailScreen: React.FC<ClientDetailProps> = ({ client, onNavigate }) => {
  if (!client) {
    return (
        <div className="p-8 text-center">
            <p>Cliente não encontrado.</p>
            <Button variant="secondary" onClick={() => onNavigate('professionalDashboard')}>Voltar</Button>
        </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-[#212121]">{client.name}</h1>
        <p className="text-md text-[#757575]">Detalhes e progresso do cliente.</p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Dados do Cadastro</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <DataPill label="Idade" value={`${client.age} anos`} />
            <DataPill label="Sexo" value={client.gender === 'male' ? 'Masculino' : 'Feminino'} />
            <DataPill label="Altura" value={`${client.height} cm`} />
            <DataPill label="Peso" value={`${client.weight} kg`} />
            <DataPill label="Objetivo" value={client.goal} />
            <DataPill label="Nível de Atividade" value={client.activityLevel} />
        </div>
      </div>
      
      <div className="mt-8">
        <Button variant="secondary" onClick={() => onNavigate('professionalDashboard')}>
            <div className="flex items-center justify-center space-x-2">
                <ChevronLeftIcon />
                <span>Voltar para a Lista</span>
            </div>
        </Button>
      </div>
    </div>
  );
};

export default ClientDetailScreen;
