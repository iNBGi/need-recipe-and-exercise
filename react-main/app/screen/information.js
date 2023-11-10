import { View, Text } from "react-native";
import React, { useContext } from "react";
import { AuthContext } from "../../Context/authContext";
import { RecipeContext } from "../../Context/recipeContext";

export const Informationscreen = ({ navigation }) => {
  // Global state
  const [recipes] = useContext(RecipeContext);
  const [recipeinformation] = useContext(RecipeContext)

  // Check if recipes is an array and contains at least one item
  if (Array.isArray(recipes) && recipes.length > 0) {
    // Access the first recipe object in the array (you can choose a specific one)
    const recipes = recipes[0];

    return (
      <View>
        <Text>Home</Text>
        <Text>{JSON.stringify(recipes, null, 4)}</Text>
        <Text>Recipe Name: {recipes.recipename}</Text>
      </View>
    );
  } else {
    return (
      <View>
        <Text>Home</Text>
        <Text>No recipes found.</Text>
      </View>
    );
  }
};
