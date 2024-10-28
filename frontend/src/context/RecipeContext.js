import { createContext, useReducer } from "react";

export const RecipesContext = createContext();

export const RecipesReducer = (state, action) => {
  switch (action.type) {
    case "SET_RECIPES":
      return {
        recipes: action.payload,
      };
    default:
      return state;
  }
};

export const RecipesContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(RecipesReducer, {
    recipes: null,
  });

  return (
    <RecipesContext.Provider value={{ ...state, dispatch }}>
      {children}
    </RecipesContext.Provider>
  );
};
