function RecipeCard({ recipe }) {
  return (
    <div className="recipe-card">
      <h4>{recipe.title}</h4>
      <div className="recipe-preview">
        <div className="summary">
          <p>
            <span>Cuisine Type: </span>
            <span>{recipe.cuisineType}</span>
          </p>
          <p>
            Takes {Number(recipe.prepTime) + Number(recipe.cookTime)} minutes.
          </p>
          <p>Servings: {recipe.servings}</p>
        </div>

        <div className="tags">
          <p>Tags:</p>
          <ul>
            {recipe.tags.map((tag, index) => {
              return <li key={index}>{tag}</li>;
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
export default RecipeCard;
