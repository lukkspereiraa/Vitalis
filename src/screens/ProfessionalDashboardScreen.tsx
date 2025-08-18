import React from 'react';
import ClientListItem from '../components/features/professional/ClientListItem';
import type { Client } from '../types';

// --- Tipos ---
type NavigationProps = {
  onNavigate: (screen: string, data?: object) => void;
};

// --- Dados de Exemplo (Agora Tipados) ---
const mockClients: Client[] = [
  { id: 1, name: 'Lucas Pereira', age: 28, gender: 'male', height: 175, weight: 78, goal: 'Ganhar Massa', activityLevel: 'Muito Ativo' },
  { id: 2, name: 'Ana Silva', age: 34, gender: 'female', height: 162, weight: 65, goal: 'Perder Peso', activityLevel: 'Levemente Ativo' },
  { id: 3, name: 'Carlos Souza', age: 45, gender: 'male', height: 180, weight: 85, goal: 'Manter Peso', activityLevel: 'Moderadamente Ativo' },
];

// --- Componente de Tela ---
const ProfessionalDashboardScreen: React.FC<NavigationProps> = ({ onNavigate }) => {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-[#212121]">Seus Clientes</h1>
        <p className="text-md text-[#757575]">Selecione um cliente para ver os detalhes.</p>
      </div>

      <div className="space-y-4">
        {mockClients.map(client => (
          <ClientListItem
            key={client.id}
            name={client.name}
            goal={client.goal}
            onClick={() => onNavigate('clientDetail', { client: client })}
          />
        ))}
      </div>
    </div>
  );
};

export default ProfessionalDashboardScreen;
