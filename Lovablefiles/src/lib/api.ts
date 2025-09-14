import { useToast } from "@/hooks/use-toast";

export const AuthService = {
  isAuthenticated: () => {
    // Check if the token exists in localStorage
    const token = localStorage.getItem("token");
    return !!token; // Returns true if token exists, false otherwise
  },
  getToken: () => {
    return localStorage.getItem("token");
  },
  setToken: (token: string) => {
    localStorage.setItem("token", token);
  },
  clearToken: () => {
    localStorage.removeItem("token");
  },
};

export interface MealPlan {
  id: number;
  title: string;
  description?: string;
  start_date: string;
  duration: number;
  goal: string;
  diet: string; // Changed from diet_preference to diet
  diet_preference?: string; // Keep for backward compatibility
  user_id: number;
  meals: DailyMeals[];
  allergies?: string;
  health_conditions?: string;
  lifestyle?: string;
}

export interface DailyMeals {
  day: number;
  date: string;
  breakfast: Meal;
  lunch: Meal;
  dinner: Meal;
  snacks: Meal;
}

export interface Meal {
  name: string;
  ingredients: string | string[]; // Allow both string and array formats
  instructions: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber?: number;
}

export interface CreatePlanData {
  title: string;
  duration: number;
  goal: string;
  diet_preference: string;
  allergies?: string;
  health_conditions?: string;
  lifestyle?: string;
  gender?: string;
  age?: number;
  height?: number;
  weight?: number;
  activity_level?: string;
  start_date: string;
}

export interface CreatePlanResponse {
  message: string;
  plan_id: number;
}

const API_BASE_URL = `https://${window.location.hostname}:8000`;

export const getUserPlans = async (): Promise<MealPlan[]> => {
  const response = await fetch(`${API_BASE_URL}/plans/?user_id=1`);
  if (!response.ok) {
    throw new Error('Failed to fetch meal plans');
  }
  return response.json();
};

export const getPlanDetails = async (planId: string): Promise<MealPlan> => {
  console.log("API - Fetching plan details for ID:", planId);
  const response = await fetch(`${API_BASE_URL}/plans/${planId}`);
  console.log("API - Response status:", response.status);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch plan details: ${response.status}`);
  }
  
  const data = await response.json();
  console.log("API - Raw response data:", data);
  
  // Log the structure of meals to debug the ingredients issue
  if (data.meals && Array.isArray(data.meals)) {
    data.meals.forEach((dayMeal: any, dayIndex: number) => {
      console.log(`Day ${dayIndex + 1} meal structure:`, dayMeal);
      if (dayMeal.breakfast) {
        console.log(`Day ${dayIndex + 1} breakfast ingredients:`, dayMeal.breakfast.ingredients);
      }
      if (dayMeal.lunch) {
        console.log(`Day ${dayIndex + 1} lunch ingredients:`, dayMeal.lunch.ingredients);
      }
      if (dayMeal.dinner) {
        console.log(`Day ${dayIndex + 1} dinner ingredients:`, dayMeal.dinner.ingredients);
      }
      if (dayMeal.snacks) {
        console.log(`Day ${dayIndex + 1} snacks ingredients:`, dayMeal.snacks.ingredients);
      }
    });
  }
  
  return data;
};

interface CreateMealPlanParams {
    title: string;
    description: string;
    start_date: string;
    duration: number;
    goal: string;
    diet_preference: string;
    user_id: number;
}

export const createMealPlan = async (mealPlanData: CreateMealPlanParams): Promise<MealPlan> => {
    const response = await fetch(`${API_BASE_URL}/plans/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(mealPlanData),
    });

    if (!response.ok) {
        throw new Error('Failed to create meal plan');
    }

    return response.json();
};

// Updated createMealPlan function to use the correct endpoint and format
export const createMealPlanNew = async (planData: CreatePlanData): Promise<CreatePlanResponse> => {
  const requestBody = {
    title: planData.title,
    start_date: planData.start_date,
    duration: planData.duration,
    goal: planData.goal,
    diet: planData.diet_preference,
    allergies: planData.allergies || "",
    health_conditions: planData.health_conditions || "",
    lifestyle: planData.lifestyle || "",
    user_id: 1,
    gender: planData.gender || "",
    age: planData.age || 0,
    height: planData.height || 0,
    weight: planData.weight || 0,
    activity_level: planData.activity_level || "moderate"
  };

  const response = await fetch(`${API_BASE_URL}/plans/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    throw new Error(`Failed to create meal plan: ${response.status}`);
  }

  return response.json();
};

// New ApiService object for compatibility
export const ApiService = {
  getUserPlans,
  createMealPlan: createMealPlanNew,
};
