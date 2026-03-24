"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getRecipeById, rateRecipe, Recipe } from "@/lib/recipes";

function getAverageRating(values: number[]) {
  if (values.length === 0) {
    return null;
  }

  const sum = values.reduce((acc, value) => acc + value, 0);
  return (sum / values.length).toFixed(1);
}

export default function RecipePage() {
  const params = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isRating, setIsRating] = useState(false);

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

  async function handleRate(value: number) {
    if (!recipe) {
      return;
    }

    try {
      setIsRating(true);
      await rateRecipe(recipe.id, value);

      const updatedRecipe = await getRecipeById(recipe.id);
      setRecipe(updatedRecipe);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to rate recipe");
    } finally {
      setIsRating(false);
    }
  }

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

  const averageRating = getAverageRating(recipe.ratings.map((r) => r.value));

  return (
    <main className="mx-auto max-w-3xl p-6">
      <h1 className="text-3xl font-semibold">{recipe.title}</h1>

      <p className="mt-2 text-gray-600">by {recipe.author.name}</p>

      {recipe.description ? (
        <p className="mt-4 text-gray-700">{recipe.description}</p>
      ) : null}

      <div className="mt-6 rounded-2xl border p-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="font-semibold">Rating</h2>
            <p className="mt-1 text-sm text-gray-600">
              {averageRating
                ? `Average rating: ${averageRating}/5`
                : "No ratings yet"}
            </p>
          </div>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((value) => (
              <button
                key={value}
                onClick={() => void handleRate(value)}
                disabled={isRating}
                className="rounded-xl border px-3 py-2 text-sm hover:bg-gray-50 disabled:opacity-50"
              >
                {value}
              </button>
            ))}
          </div>
        </div>
      </div>

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
