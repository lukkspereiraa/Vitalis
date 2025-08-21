import React, { useState } from 'react';
import Button from '../components/ui/Button.tsx';
import Input from '../components/ui/Input.tsx';
import MealDisplayCard from '../components/features/consumer/MealDisplayCard.tsx';
import DaySelector from '../components/ui/DaySelector.tsx';
import Modal from '../components/ui/Modal.tsx';
import type { Meal, WeeklyPlan, DayOfWeek, Food } from '../types/index.ts';

const ChevronLeftIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="m15 18-6-6 6-6"/>
    </svg>
);

const CameraIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/>
        <circle cx="12" cy="13" r="3"/>
    </svg>
);

type MealPlanProps = {
  prescribedPlan: WeeklyPlan | null;
  onNavigate: (screen: string) => void;
  onLogFood: (food: Food, isAdding: boolean) => void;
  checkedFoods: Record<number, boolean>;
};

const DAYS_OF_WEEK: DayOfWeek[] = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'];

const MealPlanScreen: React.FC<MealPlanProps> = ({ prescribedPlan, onNavigate, onLogFood, checkedFoods }) => {
  const [selectedDay, setSelectedDay] = useState<DayOfWeek>('Segunda');
  const [userAddedMeals, setUserAddedMeals] = useState<Meal[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFood, setEditingFood] = useState<Food | null>(null);
  
  const [newMealName, setNewMealName] = useState('');
  const [newFoodName, setNewFoodName] = useState('');
  const [newFoodQuantity, setNewFoodQuantity] = useState('');
  const [protein, setProtein] = useState('');
  const [carbs, setCarbs] = useState('');
  const [fat, setFat] = useState('');
  const [calories, setCalories] = useState('');

  const mealsForSelectedDay = prescribedPlan?.[selectedDay] || [];

  const handleToggleFood = (food: Food) => {
    const isCurrentlyChecked = !!checkedFoods[food.id];
    onLogFood(food, !isCurrentlyChecked);
  };

  const openAddModal = () => {
    setEditingFood(null);
    setNewMealName('');
    setNewFoodName('');
    setNewFoodQuantity('');
    setProtein('');
    setCarbs('');
    setFat('');
    setCalories('');
    setIsModalOpen(true);
  };
  
  const openEditModal = (foodToEdit: Food, mealName: string) => {
    setEditingFood(foodToEdit);
    setNewMealName(mealName);
    setNewFoodName(foodToEdit.name);
    setNewFoodQuantity(foodToEdit.quantity.replace('g', ''));
    setProtein(foodToEdit.protein?.toString() || '');
    setCarbs(foodToEdit.carbs?.toString() || '');
    setFat(foodToEdit.fat?.toString() || '');
    setCalories(foodToEdit.calories?.toString() || '');
    setIsModalOpen(true);
  };

  const handleSaveUserMeal = () => {
    if (!newMealName.trim() || !newFoodName.trim() || !newFoodQuantity.trim()) return;

    const p = parseFloat(protein) || 0;
    const c = parseFloat(carbs) || 0;
    const f = parseFloat(fat) || 0;
    const userCalories = parseFloat(calories) || 0;
    const finalCalories = userCalories > 0 ? userCalories : (p * 4) + (c * 4) + (f * 9);

    if (editingFood) {
      const updatedFood = { 
        ...editingFood,
        name: newFoodName,
        quantity: `${newFoodQuantity}g`,
        protein: p > 0 ? p : undefined,
        carbs: c > 0 ? c : undefined,
        fat: f > 0 ? f : undefined,
        calories: finalCalories > 0 ? Math.round(finalCalories) : undefined,
      };
      
      const updatedMeals = userAddedMeals.map(meal => ({
        ...meal,
        foods: meal.foods.map(food => food.id === editingFood.id ? updatedFood : food)
      }));
      setUserAddedMeals(updatedMeals);

    } else {
      const newFood: Food = {
        id: Date.now(),
        name: newFoodName,
        quantity: `${newFoodQuantity}g`,
        protein: p > 0 ? p : undefined,
        carbs: c > 0 ? c : undefined,
        fat: f > 0 ? f : undefined,
        calories: finalCalories > 0 ? Math.round(finalCalories) : undefined,
      };
      
      const existingMealIndex = userAddedMeals.findIndex(meal => meal.name.toLowerCase() === newMealName.trim().toLowerCase());

      if (existingMealIndex > -1) {
        const updatedMeals = [...userAddedMeals];
        updatedMeals[existingMealIndex].foods.push(newFood);
        setUserAddedMeals(updatedMeals);
      } else {
        const newMeal: Meal = {
          id: Date.now() + 1,
          name: newMealName,
          foods: [newFood],
        };
        setUserAddedMeals([...userAddedMeals, newMeal]);
      }
    }
    
    setIsModalOpen(false);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-[#212121]">Seu Diário Alimentar</h1>
        <p className="text-md text-[#757575]">Marque os alimentos que você consumiu hoje.</p>
      </div>

      <div className="mb-6">
        <DaySelector days={DAYS_OF_WEEK} selectedDay={selectedDay} onSelectDay={setSelectedDay} />
      </div>

      <div className="space-y-6">
        <h2 className="text-xl font-bold text-gray-800 border-b pb-2">Plano do Nutricionista</h2>
        {mealsForSelectedDay.map(meal => <MealDisplayCard key={meal.id} meal={meal} checkedFoods={checkedFoods} onToggleFood={handleToggleFood}/>)}

        <h2 className="text-xl font-bold text-gray-800 border-b pb-2 pt-4">Refeições Adicionadas por Você</h2>
        {userAddedMeals.map(meal => <MealDisplayCard key={meal.id} meal={meal} checkedFoods={checkedFoods} onToggleFood={handleToggleFood} onEditFood={openEditModal} />)}
        
        <Button variant="primary" onClick={openAddModal}>
            + Adicionar Refeição do Dia
        </Button>
      </div>

      <div className="mt-8">
        <Button variant="secondary" onClick={() => onNavigate('dashboard')}>
            <div className="flex items-center justify-center space-x-2"><ChevronLeftIcon /><span>Voltar ao Dashboard</span></div>
        </Button>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingFood ? "Editar Alimento" : "Adicionar Refeição"}>
        <div className="space-y-4">
            <Input label="Nome da Refeição" placeholder="Ex: Lanche da tarde" value={newMealName} onChange={(e) => setNewMealName(e.target.value)} disabled={!!editingFood} />
            <Input label="Alimento Consumido" placeholder="Ex: Maçã" value={newFoodName} onChange={(e) => setNewFoodName(e.target.value)} />
            
            <div className="-mt-2">
                <Button variant="secondary" onClick={() => console.log('Abrir câmera...')} className="!py-2 text-sm w-full">
                    <div className="flex items-center justify-center space-x-2">
                        <CameraIcon />
                        <span>Escanear tabela nutricional</span>
                    </div>
                </Button>
            </div>

            <Input label="Quantidade (g)" placeholder="150" type="number" value={newFoodQuantity} onChange={(e) => setNewFoodQuantity(e.target.value)} />
            
            <p className="text-xs text-gray-500 text-left pt-2">Nutrientes (opcional):</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <Input label="Proteína (g)" type="number" placeholder="-" value={protein} onChange={(e) => setProtein(e.target.value)} />
                <Input label="Carboidrato (g)" type="number" placeholder="-" value={carbs} onChange={(e) => setCarbs(e.target.value)} />
                <Input label="Gordura (g)" type="number" placeholder="-" value={fat} onChange={(e) => setFat(e.target.value)} />
                <Input label="Calorias (kcal)" type="number" placeholder="-" value={calories} onChange={(e) => setCalories(e.target.value)} />
            </div>

            <div className="pt-2">
                <Button onClick={handleSaveUserMeal} className="w-full">
                    {editingFood ? "Salvar Alterações" : "Adicionar"}
                </Button>
            </div>
        </div>
      </Modal>
    </div>
  );
};

export default MealPlanScreen;
