"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getRecipeById, Recipe } from "@/lib/recipes";

export default function RecipePage() {
  const params = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadRecipe() {
      try {
        setError("");
        setIsLoading(true);

        const data = await getRecipeById(params.id);

        if (isMounted) {
          setRecipe(data);
        }
      } catch (err) {
        if (isMounted) {
          setError(
            err instanceof Error ? err.message : "Failed to load recipe",
          );
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    if (params.id) {
      void loadRecipe();
    }

    return () => {
      isMounted = false;
    };
  }, [params.id]);

  if (isLoading) {
    return <main className="p-6">Loading...</main>;
  }

  if (error) {
    return (
      <main className="p-6">
        <p className="rounded-xl bg-red-50 px-3 py-2 text-sm text-red-600">
          {error}
        </p>
      </main>
    );
  }

  if (!recipe) {
    return <main className="p-6">Recipe not found.</main>;
  }

  return (
    <main className="mx-auto max-w-3xl p-6">
      <h1 className="text-3xl font-semibold">{recipe.title}</h1>

      <p className="mt-2 text-gray-600">by {recipe.author.name}</p>

      {recipe.description ? (
        <p className="mt-4 text-gray-700">{recipe.description}</p>
      ) : null}

      <div className="mt-6">
        <h2 className="font-semibold">Ingredients</h2>
        <pre className="mt-2 whitespace-pre-wrap">{recipe.ingredients}</pre>
      </div>

      <div className="mt-6">
        <h2 className="font-semibold">Instructions</h2>
        <pre className="mt-2 whitespace-pre-wrap">{recipe.instructions}</pre>
      </div>
    </main>
  );
}
