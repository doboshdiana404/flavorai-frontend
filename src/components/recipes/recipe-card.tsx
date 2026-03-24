import Link from "next/link";
import { Recipe } from "@/lib/recipes";

export function RecipeCard({ recipe }: { recipe: Recipe }) {
  return (
    <Link
      href={`/recipes/${recipe.id}`}
      className="block rounded-2xl border p-4 hover:shadow-sm"
    >
      <h3 className="text-lg font-semibold">{recipe.title}</h3>

      {recipe.description && (
        <p className="mt-2 text-sm text-gray-600 line-clamp-2">
          {recipe.description}
        </p>
      )}

      <div className="mt-3 text-xs text-gray-500">by {recipe.author.name}</div>
    </Link>
  );
}
