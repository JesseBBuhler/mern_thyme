function RecipeCard({ recipe }) {
  return (
    <div className="recipe-card">
      <h4>{recipe.title}</h4>
      <div className="recipe-preview">
        <p>{recipe.cuisineType}</p>
        <p>{recipe.prepTime}</p>
        <p>{recipe.cookTime}</p>
        <p>{recipe.servings}</p>
        <p>{recipe.tags}</p>
      </div>
    </div>
  );
}
export default RecipeCard;
