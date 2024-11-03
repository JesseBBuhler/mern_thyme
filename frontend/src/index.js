import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import App from "./App";
import { AuthContextProvider } from "./context/AuthContext";
import { RecipesContextProvider } from "./context/RecipeContext";
import { BlogsContextProvider } from "./context/BlogContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <BlogsContextProvider>
        <RecipesContextProvider>
          <App />
        </RecipesContextProvider>
      </BlogsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
