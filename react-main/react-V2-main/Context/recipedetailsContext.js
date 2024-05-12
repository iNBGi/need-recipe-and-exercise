import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

// Context
const RecipedetailsContext = createContext();

const RecipedetailsProvider = ({ children }) => {
  // State
  const [loading, setLoading] = useState(false);
  const [recipesdetails, setRecipesdetails] = useState([]);

  // Get posts
  const getAllRecipedetails = async () => {
    console.log("Fetching recipe details..."); // Add this line
    setLoading(true);
    try {
      const { data } = await axios.get("https://serverrrr-3kbl.onrender.com/recipesinformation");
      setLoading(false);
      setRecipesdetails(data.recipeinformations);
     // Add this line
    } catch (error) {
      console.log("Error fetching recipe details:", error); // Add this line
      setLoading(false);
    }
  };

  // Initial posts
  useEffect(() => {
    getAllRecipedetails();
  }, []);

  return (
    <RecipedetailsContext.Provider value={[recipesdetails, setRecipesdetails, getAllRecipedetails]}>
      {children}
    </RecipedetailsContext.Provider>
  );
};

export { RecipedetailsContext, RecipedetailsProvider };
