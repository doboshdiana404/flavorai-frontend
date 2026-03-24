import Link from "next/link";
import { Recipe } from "@/lib/recipes";

function getAverageRating(values: number[]) {
  if (values.length === 0) {
    return null;
  }

  const sum = values.reduce((acc, value) => acc + value, 0);
  return (sum / values.length).toFixed(1);
}

export function RecipeCard({ recipe }: { recipe: Recipe }) {
  const averageRating = getAverageRating(recipe.ratings.map((r) => r.value));
  return (
    <Link
      href={`/recipes/${recipe.id}`}
      className="block rounded-2xl border p-4 hover:shadow-sm"
    >
      <h3 className="text-lg font-semibold">{recipe.title}</h3>

      {recipe.description ? (
        <p className="mt-2 text-sm text-gray-600 line-clamp-2">
          {recipe.description}
        </p>
      ) : null}

      <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
        <span>by {recipe.author.name}</span>
        <span>{averageRating ? `⭐ ${averageRating}` : "No ratings yet"}</span>
      </div>
    </Link>
  );
}
