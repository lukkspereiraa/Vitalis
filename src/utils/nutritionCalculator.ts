// --- Tipos ---
export interface UserData {
  name: string;
  gender: 'male' | 'female';
  weight: number; // em kg
  height: number; // em cm
  age: number; // Idade agora é uma propriedade obrigatória
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'very';
  goal: 'lose' | 'maintain' | 'gain';
}

export interface NutritionGoals {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

// --- Lógica de Cálculo ---
const activityMultipliers = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  very: 1.725,
};

const goalMultipliers = {
  lose: 0.85,
  maintain: 1.0,
  gain: 1.15,
};

export const calculateNutritionGoals = (data: UserData): NutritionGoals => {
  let bmr: number;
  if (data.gender === 'male') {
    bmr = 10 * data.weight + 6.25 * data.height - 5 * data.age + 5;
  } else {
    bmr = 10 * data.weight + 6.25 * data.height - 5 * data.age - 161;
  }

  const tdee = bmr * activityMultipliers[data.activityLevel];
  const finalCalories = tdee * goalMultipliers[data.goal];

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
