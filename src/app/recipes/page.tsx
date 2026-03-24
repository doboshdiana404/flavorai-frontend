"use client";

import { useEffect, useState } from "react";
import { getRecipes, Recipe } from "@/lib/recipes";
import { RecipeList } from "@/components/recipes/recipe-list";

export default function RecipesPage() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function fetchRecipes() {
      try {
        setError("");
        setIsLoading(true);

        const data = await getRecipes();
        if (isMounted) {
          setRecipes(data);
        }
      } catch (err) {
        if (isMounted) {
          setError(
            err instanceof Error ? err.message : "Failed to load recipes",
          );
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    void fetchRecipes();

    return () => {
      isMounted = false;
    };
  }, []);

  async function handleSearch() {
    try {
      setError("");
      setIsLoading(true);

      const data = await getRecipes(search);
      setRecipes(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load recipes");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="mx-auto max-w-4xl p-6">
      <div className="mb-6 flex items-end gap-3">
        <div className="flex-1">
          <label className="mb-2 block text-sm font-medium">
            Search recipes
          </label>
          <input
            type="text"
            placeholder="Search by title..."
            className="w-full rounded-xl border px-4 py-3"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                void handleSearch();
              }
            }}
          />
        </div>

        <button
          onClick={() => void handleSearch()}
          className="rounded-xl bg-black px-4 py-3 text-white"
        >
          Search
        </button>
      </div>

      {isLoading ? <p>Loading recipes...</p> : null}

      {error ? (
        <p className="mb-4 rounded-xl bg-red-50 px-3 py-2 text-sm text-red-600">
          {error}
        </p>
      ) : null}

      {!isLoading && !error ? <RecipeList recipes={recipes} /> : null}
    </main>
  );
}
