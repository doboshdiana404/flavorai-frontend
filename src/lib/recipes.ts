import { apiFetch } from "./api";
import { getToken } from "./auth";

export type Rating = {
  id: string;
  value: number;
  userId: string;
  recipeId: string;
  createdAt: string;
  updatedAt: string;
};

export type Recipe = {
  id: string;
  title: string;
  description?: string;
  ingredients: string;
  instructions: string;
  cuisineType?: string;
  createdAt: string;
  author: {
    id: string;
    name: string;
    email: string;
  };
  ratings: Rating[];
};

export type CreateRecipePayload = {
  title: string;
  description?: string;
  ingredients: string;
  instructions: string;
  cuisineType?: string;
};

export async function getRecipes(search?: string) {
  const query = search ? `?search=${encodeURIComponent(search)}` : "";

  return apiFetch<Recipe[]>(`/recipes${query}`);
}

export async function getMyRecipes() {
  const token = getToken();

  if (!token) throw new Error("No token");

  return apiFetch<Recipe[]>("/recipes/me", {
    token,
  });
}

export async function getRecipeById(id: string) {
  return apiFetch<Recipe>(`/recipes/${id}`);
}

export async function createRecipe(data: CreateRecipePayload) {
  const token = getToken();

  if (!token) throw new Error("No token");

  return apiFetch("/recipes", {
    method: "POST",
    token,
    body: JSON.stringify(data),
  });
}

export async function rateRecipe(recipeId: string, value: number) {
  const token = getToken();

  if (!token) {
    throw new Error("No token");
  }

  return apiFetch(`/recipes/${recipeId}/rating`, {
    method: "POST",
    token,
    body: JSON.stringify({ value }),
  });
}
