"use client";

import { useEffect, useState } from "react";
import { getMyRecipes, Recipe } from "@/lib/recipes";
import { RecipeList } from "@/components/recipes/recipe-list";

export default function MyRecipesPage() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    getMyRecipes().then(setRecipes);
  }, []);

  return (
    <main className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold mb-6">My Recipes</h1>

      <RecipeList recipes={recipes} />
    </main>
  );
}
