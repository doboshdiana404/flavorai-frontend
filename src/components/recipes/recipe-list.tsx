import { Recipe } from "@/lib/recipes";
import { RecipeCard } from "./recipe-card";

export function RecipeList({ recipes }: { recipes: Recipe[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
}
