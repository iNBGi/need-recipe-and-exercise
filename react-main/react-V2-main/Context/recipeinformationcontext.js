import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

const RecipeInformationContext = createContext();

const RecipeInformationProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [recipeInformation, setRecipeInformation] = useState([]);

  const getRecipeInformation = async () => {
    setLoading(true);
    try {
      // Make API call to get recipe information
      const { data } = await axios.get("https://serverrrr-3kbl.onrender.com/nutrition");
      setLoading(false);
      setRecipeInformation(data.nutritions);

      // Log the received recipe information
      console.log("Recipe Informations22:", data.nutritions);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getRecipeInformation();
  }, []); // Fetch recipe information on component mount

  return (
    <RecipeInformationContext.Provider value={[recipeInformation, setRecipeInformation, getRecipeInformation]}>
      {children}
    </RecipeInformationContext.Provider>
  );
};

export { RecipeInformationContext, RecipeInformationProvider };
