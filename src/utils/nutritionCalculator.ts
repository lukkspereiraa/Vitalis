// --- Tipos ---
// Define a estrutura completa dos dados que o calculador precisa
export interface UserData {
  name: string;
  gender: 'male' | 'female';
  weight: number; // em kg
  height: number; // em cm
  age: number; // Idade agora é uma propriedade obrigatória
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'very';
  goal: 'lose' | 'maintain' | 'gain';
}

// Define a estrutura do resultado que o calculador retorna
export interface NutritionGoals {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}


// Fatores de atividade para multiplicar pela TMB
const activityMultipliers = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  very: 1.725,
};

// Fatores de objetivo para ajustar as calorias
const goalMultipliers = {
  lose: 0.85, // Déficit de 15%
  maintain: 1.0,
  gain: 1.15, // Superávit de 15%
};

/**
 * Calcula as metas nutricionais de um usuário.
 * @param data - Os dados do usuário.
 * @returns Um objeto com as metas de calorias e macronutrientes.
 */
export const calculateNutritionGoals = (data: UserData): NutritionGoals => {
  // Passo 1: Calcular a Taxa Metabólica Basal (TMB) usando a fórmula Mifflin-St Jeor
  let bmr: number;
  if (data.gender === 'male') {
    bmr = 10 * data.weight + 6.25 * data.height - 5 * data.age + 5;
  } else {
    bmr = 10 * data.weight + 6.25 * data.height - 5 * data.age - 161;
  }

  // Passo 2: Calcular o Gasto Calórico Diário Total (TDEE)
  const tdee = bmr * activityMultipliers[data.activityLevel];

  // Passo 3: Ajustar calorias com base no objetivo
  const finalCalories = tdee * goalMultipliers[data.goal];

  // Passo 4: Calcular Macronutrientes (ex: 40% Carbs, 30% Proteína, 30% Gordura)
  const proteinGrams = (finalCalories * 0.30) / 4;
  const carbsGrams = (finalCalories * 0.40) / 4;
  const fatGrams = (finalCalories * 0.30) / 9;

  return {
    calories: Math.round(finalCalories),
    protein: Math.round(proteinGrams),
    carbs: Math.round(carbsGrams),
    fat: Math.round(fatGrams),
  };
};
