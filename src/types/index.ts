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

export interface Food {
    id: number;
    name: string;
    quantity: string;
    protein?: number;
    carbs?: number;
    fat?: number;
    calories?: number;
}

export interface Meal {
    id: number;
    name: string;
    foods: Food[];
}

export type DayOfWeek = 'Segunda' | 'Terça' | 'Quarta' | 'Quinta' | 'Sexta' | 'Sábado' | 'Domingo';

export type WeeklyPlan = {
    [key in DayOfWeek]?: Meal[];
};

export interface DailyLog {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
}
