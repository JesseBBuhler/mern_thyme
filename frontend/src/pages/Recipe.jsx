import React from "react";
import { useEffect } from "react";
import { useRecipesContext } from "../hooks/useRecipeContext";

//components
import RecipeCard from "../components/RecipeCard";

function Recipe() {
  const { recipes, dispatch } = useRecipesContext();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch("/api/public/recipe");
        if (response.ok) {
          const json = await response.json();
          dispatch({ type: "SET_RECIPES", payload: json });
        } else {
          console.error("Request failed");
        }
      } catch (error) {
        console.error("Fetch error", error);
      }
    };
    fetchRecipes();
  }, [dispatch]);

  return (
    <section className="recipe-results">
      <div className="recipe-list">
        {recipes &&
          recipes.map((recipe) => (
            <RecipeCard key={recipe._id} recipe={recipe}></RecipeCard>
          ))}
      </div>
    </section>
  );
}

export default Recipe;
