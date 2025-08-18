import React from 'react';
import ClientListItem from '../components/features/professional/ClientListItem';

// --- Tipos ---
type NavigationProps = {
  onNavigate: (screen: string, data?: object) => void;
};

// --- Dados de Exemplo (Mock Data) ---
const mockClients = [
  { id: 1, name: 'Lucas Pereira', goal: 'Ganhar Massa' },
  { id: 2, name: 'Ana Silva', goal: 'Perder Peso' },
  { id: 3, name: 'Carlos Souza', goal: 'Manter Peso' },
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
            onClick={() => onNavigate('clientDetail', { clientId: client.id })}
          />
        ))}
      </div>
    </div>
  );
};

export default ProfessionalDashboardScreen;
