import { useState } from "react";
import useAuthContext from "./useAuthContext.js";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const login = async (userName, password) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch("/api/public/user/login", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ userName, password }),
    });

    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    } else {
      //save the user to local storage
      localStorage.setItem("user", JSON.stringify(json));
      // update auth context
      dispatch({ type: "LOGIN", payload: json });
      setIsLoading(false);
    }
  };

  return { login, isLoading, error };
};
