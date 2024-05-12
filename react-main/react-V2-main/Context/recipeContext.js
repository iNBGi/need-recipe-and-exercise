import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

//context
const RecipeContext = createContext();

const RecipeProvider = ({ children }) => {
  //state
  const [loading, setLoading] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [recipeinformation, setRecipeinformation] = useState([]);
  


  //get posts
  const getAllRecipe = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("https://serverrrr-3kbl.onrender.com/recipes");
      setLoading(false);
      setRecipes(data.recipes);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  

  // inintal  posts
  useEffect(() => {
    getAllRecipe();
  }, []);

  
  return (
    <RecipeContext.Provider value={[recipes, setRecipes, getAllRecipe]}>
      {children}
    </RecipeContext.Provider>
  );
};

export { RecipeContext, RecipeProvider };