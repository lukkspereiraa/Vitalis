import React from 'react';
import Button from '../../ui/Button.tsx';
import Input from '../../ui/Input.tsx';

// --- Ícone ---
const TrashIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M10 11v6"/><path d="M14 11v6"/>
    </svg>
);


// --- Tipos ---
type MealBuilderCardProps = {
  mealName: string;
};

// --- Componente ---
const MealBuilderCard: React.FC<MealBuilderCardProps> = ({ mealName }) => {
  // No futuro, os alimentos virão de um estado
  const foods = [
    { id: 1, name: 'Peito de frango', quantity: '150g' },
    { id: 2, name: 'Arroz branco', quantity: '200g' },
  ];

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm">
      <h3 className="text-lg font-bold text-gray-800 mb-3">{mealName}</h3>
      
      {/* Lista de alimentos adicionados */}
      <div className="space-y-2 mb-4">
        {foods.map(food => (
          <div key={food.id} className="flex items-center justify-between bg-gray-50 p-2 rounded-md">
            <div>
              <p className="font-medium text-gray-700">{food.name}</p>
              <p className="text-sm text-gray-500">{food.quantity}</p>
            </div>
            <button className="text-red-500 hover:text-red-700">
                <TrashIcon />
            </button>
          </div>
        ))}
      </div>

      {/* Formulário para adicionar novo alimento */}
      <div className="flex items-end gap-2">
        <div className="flex-grow">
          <Input label="Alimento" placeholder="Ex: Batata doce" />
        </div>
        <div className="w-24">
          <Input label="Qtd (g)" placeholder="100" />
        </div>
        <Button onClick={() => console.log('Adicionar alimento')} className="py-3 h-[46px] w-auto px-4">
          +
        </Button>
      </div>
    </div>
  );
};

export default MealBuilderCard;
