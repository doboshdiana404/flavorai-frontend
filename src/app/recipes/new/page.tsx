"use client";

import { useRouter } from "next/navigation";
import { createRecipe, CreateRecipePayload } from "@/lib/recipes";
import { RecipeForm } from "@/components/recipes/recipe-form";

export default function NewRecipePage() {
  const router = useRouter();

  async function handleCreate(data: CreateRecipePayload) {
    await createRecipe(data);
    router.push("/recipes");
  }

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Create Recipe</h1>

      <RecipeForm onSubmit={handleCreate} />
    </main>
  );
}
