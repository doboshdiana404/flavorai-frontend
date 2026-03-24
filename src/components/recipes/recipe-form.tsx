"use client";

import { FormEvent, useState } from "react";
import type { CreateRecipePayload } from "@/lib/recipes";

type RecipeFormProps = {
  onSubmit: (data: CreateRecipePayload) => Promise<void>;
};

export function RecipeForm({ onSubmit }: RecipeFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [cuisineType, setCuisineType] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      setError("");
      setIsSubmitting(true);

      await onSubmit({
        title,
        description: description || undefined,
        ingredients,
        instructions,
        cuisineType: cuisineType || undefined,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create recipe");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="mb-1 block text-sm font-medium">Title</label>
        <input
          placeholder="Creamy Pasta"
          className="w-full rounded-xl border px-4 py-3"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">Description</label>
        <textarea
          placeholder="Quick creamy pasta for dinner"
          className="w-full rounded-xl border px-4 py-3"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">Cuisine type</label>
        <input
          placeholder="Italian"
          className="w-full rounded-xl border px-4 py-3"
          value={cuisineType}
          onChange={(e) => setCuisineType(e.target.value)}
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">Ingredients</label>
        <textarea
          placeholder={"Pasta\nCream\nGarlic\nParmesan"}
          className="w-full rounded-xl border px-4 py-3"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          rows={6}
          required
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">Instructions</label>
        <textarea
          placeholder={"1. Boil pasta\n2. Make sauce\n3. Mix together"}
          className="w-full rounded-xl border px-4 py-3"
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          rows={6}
          required
        />
      </div>

      {error ? (
        <p className="rounded-xl bg-red-50 px-3 py-2 text-sm text-red-600">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className="rounded-xl bg-black px-4 py-3 text-white disabled:opacity-50"
      >
        {isSubmitting ? "Creating..." : "Create Recipe"}
      </button>
    </form>
  );
}
