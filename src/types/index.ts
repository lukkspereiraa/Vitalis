// Define a estrutura de um objeto de Cliente
export interface Client {
  id: number;
  name: string;
  age: number;
  gender: 'male' | 'female';
  height: number;
  weight: number;
  goal: string;
  activityLevel: string;
}

// Define a estrutura de um único alimento no plano
export interface Food {
    id: number;
    name: string;
    quantity: string;
    protein?: number; // Opcional
    carbs?: number;   // Opcional
    fat?: number;     // Opcional
}

// Define a estrutura de uma refeição, que contém vários alimentos
export interface Meal {
    id: number;
    name: string;
    foods: Food[];
}
